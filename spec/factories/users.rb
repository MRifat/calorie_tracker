FactoryGirl.define do

  # User (:id, :first_name, :last_name, :email, :password, :daily_calorie_goal)
  factory :user do
    first_name 'href'
    last_name 'Murakami'
    email 'murakami.href@calorietracker.com'
    password 'let_me_in'
    daily_calorie_goal 4200

    trait :with_meals do
      after(:create) do |user|
        create(:meal, {user_id: user.id})
      end
    end
  end
end
