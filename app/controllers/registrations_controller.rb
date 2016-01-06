class RegistrationsController < Devise::RegistrationsController

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, registration_params)
    yield resource if block_given?
    goal = {
      current_calories: resource.meals.where(consumed_at: (Date.today.beginning_of_day..Date.today.end_of_day)).map(&:amount_of_calories).inject(:+)
    }
    if resource_updated
      if is_flashing_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, bypass: true
      render json: {success: true, user: resource.as_json(only: [:id, :first_name, :last_name, :email, :daily_calorie_goal]), goal: goal.merge(goal: resource.daily_calorie_goal)}
    else
      clean_up_passwords resource
      render json: {success: true, user: resource.as_json(only: [:id, :first_name, :last_name, :email, :daily_calorie_goal]), goal: goal.merge(goal: resource.daily_calorie_goal)}
    end
  end

  private
  # Below this line thar be Dragons
  #

  def registration_params
      params.require(:user).permit(:first_name, :last_name, :daily_calorie_goal,
               :email, :password, :password_confirmation, :current_password)
  end
end
