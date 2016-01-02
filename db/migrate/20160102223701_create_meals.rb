class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.string :name
      t.text :notes
      t.datetime :consumed_at
      t.integer :amount_of_calories

      t.timestamps null: false
    end
  end
end
