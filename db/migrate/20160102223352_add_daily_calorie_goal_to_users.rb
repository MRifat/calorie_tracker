class AddDailyCalorieGoalToUsers < ActiveRecord::Migration
  def change
    add_column :users, :daily_calorie_goal, :integer
  end
end
