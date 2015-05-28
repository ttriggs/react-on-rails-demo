class Answer < ActiveRecord::Base
  belongs_to :question

  validates :author, presence: true
  validates :text, presence: true
end
