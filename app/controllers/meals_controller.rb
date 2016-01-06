class MealsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_extra_data

  def index
    @data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      goal: {
        current_calories: current_user.meals.where(consumed_at: (Date.today.beginning_of_day..Date.today.end_of_day)).map(&:amount_of_calories).inject(:+),
        goal: current_user.daily_calorie_goal
      }
    }.merge(@extra_data)
  end

  def update
    meal = current_user.meals.where("id = ?", params[:id]).first
    meal.update(meal_params)
    response = {success: false}
    if meal.save
    data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      goal: {
        current_calories: current_user.meals.where(consumed_at: (Date.today.beginning_of_day..Date.today.end_of_day)).map(&:amount_of_calories).inject(:+),
        goal: current_user.daily_calorie_goal
      }
    }.merge(@extra_data)
      response = {success: true, data: data}
    end
    render json: response
  end

  def create
    meal = current_user.meals.new(meal_params.merge(consumed_at: meal_params[:consumed_at].to_datetime))
    response = {success: false}
    if meal.save
    data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      goal: {
        current_calories: current_user.meals.where(consumed_at: (Date.today.beginning_of_day..Date.today.end_of_day)).map(&:amount_of_calories).inject(:+),
        goal: current_user.daily_calorie_goal
      }
    }.merge(@extra_data)
      response = {success: true, data: data}
    end
    render json: response
  end

  def destroy
    meal = current_user.meals.where("id = ?", params[:id]).first
    response = {success: false}
    if meal.destroy
    data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      goal: {
        current_calories: current_user.meals.where(consumed_at: (Date.today.beginning_of_day..Date.today.end_of_day)).map(&:amount_of_calories).inject(:+),
        goal: current_user.daily_calorie_goal
      }
    }.merge(@extra_data)
    response = {success: true, data: data}
    end
    render json: response
  end

  private
  # Below this line thar be Dragons
  #
  def meal_params
    params.require(:meal).permit(:id, :name, :notes, :consumed_at, :amount_of_calories)
  end

  def set_extra_data
    @extra_data = {
      form: {
        action: meals_path,
        method: 'POST',
        csrf_param: request_forgery_protection_token,
        csrf_token: form_authenticity_token
      },
      user_form: {
        action: '/users',
        method: 'PATCH',
        csrf_param: request_forgery_protection_token,
        csrf_token: form_authenticity_token
      }
    }
  end
end
