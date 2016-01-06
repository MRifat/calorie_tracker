class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_devise_params, if: proc { params[:controller] == 'devise/registrations' && params[:action] == 'create' }

  protected

  def configure_devise_params
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :daily_calorie_goal,
               :email, :password, :password_confirmation)
    end
  end

  private
  # Below this line thar be Dragons
  #

  def after_sign_in_path_for(resource)
    meals_path
  end
end
