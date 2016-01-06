class API::MealsController < API::APIController

  def index
    render json: @user.meals.as_json
  end

  def create
    meal = @user.meals.new(meal_params)
    if meal.save
      render json: {meal: meal.as_json}, status: 201
    else
      render json: {errors: meal.errors.messages.as_json}, status: 400
    end
  end

  def update
    meal = @user.meals.where("id = ?", params[:id]).first
    if meal.present?
      if meal.update(meal_params)
        render json: {meal: meal.as_json}, status: 200
      else
        render json: {errors: meal.errors.messages.as_json}, status: 400
      end
    else
      render json: {errors: {record: "Resource not found"}}, status: 404
    end
  end

  def destroy
    meal = @user.meals.where("id = ?", params[:id]).first
    if meal.present?
      if meal.destroy
        render json: {}, status: 204
      else
        render json: {errors: {error: "Something went wrong"}}, status: 400
      end
    else
      render json: {errors: {record: "Resource not found"}}, status: 404
    end
  end

  private
  # Below this line thar be Dragons
  #
  def meal_params
    params.require(:meal).permit(:id, :name, :notes, :amount_of_calories, :consumed_at)
  end
end
