class MealsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_form_data

  def index
    @data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      form: @form_data
    }
  end

  def show
    @meal = current_user.meals.where("id = ?", params[:id]).first

    # TODO: Handle Meal does not exist
  end

  def edit
    @meal = current_user.meals.where("id = ?", params[:id]).first

    # TODO: Handle Meal does not exist
  end

  def update
    meal = current_user.meals.where("id = ?", params[:id]).first
    meal.update(meal_params)
    response = {success: false}
    if meal.save
    data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      form: @form_data
    }
      response = {success: true, data: data}
    end
    render json: response
  end

  def new
    @meal = current_user.meals.new
  end

  def create
    meal = current_user.meals.new(meal_params.merge(consumed_at: meal_params[:consumed_at].to_datetime))
    response = {success: false}
    if meal.save
    data = {
      meals: current_user.meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories]),
      form: @form_data
    }
      response = {success: true, data: data}
    end
    render json: response
  end

  def destroy
    meal = current_user.meals.where("id = ?", params[:id]).first
    if meal.destroy
      flash[:notice] = 'Successfuly Deleted'
    else
      flash[:alert] = "Couldn't delete Meal"
    end
    redirect_to meals_path and return
  end

  private
  # Below this line thar be Dragons
  #
  def meal_params
    params.require(:meal).permit(:id, :name, :notes, :consumed_at, :amount_of_calories)
  end

  def set_form_data
    @form_data = { action: meals_path,
                   method: 'POST',
                   csrf_param: request_forgery_protection_token,
                   csrf_token: form_authenticity_token
                 }
  end
end
