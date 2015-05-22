class Answer < ActiveRecord::Base
  belongs_to :question

  validates :author, presence: true
  validates :body, presence: true
end
