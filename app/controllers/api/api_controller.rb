class API::APIController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  skip_before_filter  :verify_authenticity_token
  before_action :authenticate
  before_action :parse_params, if: proc { params[:meal].present? }

  private
  # Below this line thar be Dragons
  #
  def authenticate
    authenticate_or_request_with_http_token do |token, option|
      app = ConnectedApp.where(key: token).first
      @user = app.try(:user)
    end
  end

  def parse_params
    params.merge!(meal: JSON.parse(params[:meal]).deep_symbolize_keys)
  end
end
