class Question < ActiveRecord::Base
  has_many :answers

  validates :author, presence: true
  validates :text, presence: true
end
