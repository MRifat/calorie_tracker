Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: :registrations}
  root 'home#index'

  namespace :api do
    get '/users/edit', to: 'users#edit'
    resources :meals, except: [:edit, :new, :show]
  end

  resources :meals, except: [:edit, :new, :show]
end
