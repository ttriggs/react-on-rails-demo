class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :author, null: false
      t.text :body, null: false
      t.integer :votes, default: 0
    end
  end
end
