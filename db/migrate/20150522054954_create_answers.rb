class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :author, null: false
      t.text :text, null: false
      t.integer :votes, default: 0

      t.timestamps
    end
  end
end
