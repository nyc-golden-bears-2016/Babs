Rails.application.routes.draw do

  get '/static/index' => 'static#index'
  get '/' => 'users#index'
  get '/users/show' => 'users#show'

  resources :entries, only: [:new, :create, :update, :destroy, :show]


  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
