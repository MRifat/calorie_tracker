class MealsController < ApplicationController
  before_action :authenticate_user!

  def index
    @meals = current_user.meals
    respond_to do |format|
      format.html
      format.json {render meals: @meals.as_json(only: [:id, :name, :notes, :consumed_at, :amount_of_calories])}
    end
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

    redirect_to meals_path and return
    # TODO: Handle Exceptions
  end

  def new
    @meal = current_user.meals.new
  end

  def create
    @meal = current_user.meals.create(meal_params.merge(consumed_at: meal_params[:consumed_at].to_datetime))
    if @meal.present?
      flash[:notice] = 'Created Successfuly'
    else
      flash[:alert] = 'Failed'
    end
    redirect_to meals_path and return
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
end
