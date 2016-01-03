class MealsController < ApplicationController
  before_action :authenticate_user!

  def index
    @meals = current_user.meals
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

    # TODO: Handle Exceptions
  end

  def new
    @meal = current_user.meals.new
  end

  def create
    @meal = current_user.meals.create(meal_params)

    # TODO: Handle create/exceptions
  end

  def destroy
    meal = current_user.meals.where("id = ?", params[:id]).first
    if meal.destroy
      # Do something
    else
      # Do something else
    end
  end

  private
  # Below this line thar be Dragons
  #
  def meal_params
    param.require(:meal).premit(:id, :name, :notes, :consumed_at, :amounts_of_calories)
  end
end
