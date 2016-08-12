class EntriesController < ApplicationController

  def create
    @entry = Entry.new(permit_params)
    @entry.user_id = current_user.id
    if request.xhr?
      if @entry.save
        render json: @entry
      else
        flash[:error] = "Your entry was not succussfully created"
      end
    else
      flash[:error] = "Your entry was not succussfully created"
      redirect_to '/static/index'
    end
  end

  def show
    @entries = current_user.entries
    render json: @entries
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render json: entry.to_json
  end

  private

  def permit_params
    params.require(:entry).permit(:body)
  end

end
