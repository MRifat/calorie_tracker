class CreateConnectedApps < ActiveRecord::Migration
  def change
    create_table :connected_apps do |t|
      t.integer :user_id, null: false
      t.text :key, null: false

      t.timestamps null: false
    end
  end
end
