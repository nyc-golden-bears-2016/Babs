class UsersController < ApplicationController

  def index
  end

  def show
    render json: current_user
  end



end
