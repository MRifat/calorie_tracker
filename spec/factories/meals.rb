FactoryGirl.define do

  # Meal (:id, :name, :notes, :consumed_at, :amount_of_calories)
  factory :meal do
    user
    name 'Batata'
    notes 'Batata for the win!'
    consumed_at DateTime.now
    amount_of_calories 2000
  end
end
