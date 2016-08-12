class UsersController < ApplicationController

  def index
  end

  def show
    binding.pry
    render json: current_user
  end



end
