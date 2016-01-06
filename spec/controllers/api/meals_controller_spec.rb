require 'spec_helper'

describe API::MealsController, type: :controller do
  before(:each) do
    @user = FactoryGirl.create(:user, :with_meals, :with_connected_apps)
    api_key = @user.connected_apps.first.key
    request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Token.encode_credentials(api_key)
  end

  describe "GET index" do
    it "Should return all meals as JSON with a status of 200" do
      get :index, nil, { 'Accept' => Mime::JSON }

      expect(response.status).to eql(200)
      expect(response.content_type).to eql('application/json')
    end
  end

  describe "POST create" do
    it "Should create a new meal, and respond with a 201 status code" do
      post :create,  {meal: {name: "Pizza and Beer", consumed_at: DateTime.now.strftime('%d/%m/%Y %I:%M %p'), amount_of_calories: 1500}.to_json}, { 'Accept' => Mime::JSON }

      expect(response.status).to eql(201)
      expect(response.content_type).to eql('application/json')

      data = JSON.parse(response.body).deep_symbolize_keys
      expect(data[:meal][:id]).to eql(@user.meals.last.id)
    end
  end

  describe "POST update" do
    it "Should update an existing meal, and respond with a 200 status code" do
      post :update,  {id: @user.meals.last.id, meal: {name: "Pizza and Beeeeeeeeeeeeer"}.to_json}, { 'Accept' => Mime::JSON }

      expect(response.status).to eql(200)
      expect(response.content_type).to eql('application/json')

      data = JSON.parse(response.body).deep_symbolize_keys
      expect(data[:meal][:name]).to eql("Pizza and Beeeeeeeeeeeeer")
    end
  end
end
