require 'spec_helper'

describe Meal do
  it "Should return the meal user" do
    meal = FactoryGirl.create(:meal)
    expect(meal.user).to be_present
  end
end
