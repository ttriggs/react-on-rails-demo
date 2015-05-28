var Question = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="question">
        <h2 className="questionAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var QuestionBox = React.createClass({
  loadQuestionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleQuestionSubmit: function(question) {
    var questions = this.state.data;
    questions.push(question);
    this.setState({data: questions}, function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: {question: question},
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadQuestionsFromServer();
    setInterval(this.loadQuestionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="questionBox">
        <h4>Have a question?</h4>
        <QuestionList data={this.state.data} />
        <QuestionForm onQuestionSubmit={this.handleQuestionSubmit} />
      </div>
    );
  }
});

var QuestionList = React.createClass({
  render: function() {
    var questionNodes = this.props.data.map(function(question, index) {
      return (
        <Question author={question.author} key={index}>
          {question.text}
        </Question>
      );
    });
    return (
      <div className="questionList">
        {questionNodes}
      </div>
    );
  }
});

var QuestionForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onQuestionSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <form className="questionForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Have a question?" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <QuestionBox url="questions.json" pollInterval={2000} />,
  document.getElementById('content')
);
