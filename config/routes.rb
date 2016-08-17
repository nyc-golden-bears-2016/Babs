Rails.application.routes.draw do

  get '/static/index' => 'static#index'
  get '/users/show' => 'users#show'
  devise_scope :user do
    root to: "static#index"
  end
  # unauthenticated do
  #   root 'devise/registrations#new', as: unauthenticated_root
  # end

  get '/entries/viewed' => 'entries#viewed'
  get '/entries/stream' => 'entries#stream'

  resources :entries, only: [:new, :create, :update, :destroy, :show]

  resources :responses, only: [:new, :create, :update, :destroy, :show]

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
