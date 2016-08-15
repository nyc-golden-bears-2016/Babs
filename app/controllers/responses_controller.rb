class ResponsesController < ApplicationController

  def show
    @responses = Response.all.where(entry_id: params[:id])
    if request.xhr?
      render json: @responses
    else
      flash[:error] = "Soemthing went wrong."
    end
  end


  def create
    @response = Response.new(permit_params)
    @response.user_id = current_user.id
    if request.xhr?
      if @response.save
        render json: @response
      else
        flash[:error] = 'Something went wrong'
      end
    else
      flash[:error] = "Something went wrong"
      redirect_to '/static/index'
    end
  end

  private

  def permit_params
    params.require(:response).permit(:body, :entry_id, :user_id, :can_respond)
  end
end
