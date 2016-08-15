class EntriesController < ApplicationController

  def create
    @entry = Entry.new(permit_params)
    @entry.user_id = current_user.id
    binding.pry
    if request.xhr?
      # set the viewer for a new entry
      # @entry.send_message_in_a_bottle
      # @viewer = User.find(@entry.viewer_id)
      # @entry.send_message_in_a_bottle
      # @entry.message_in_a_bottle
      if @entry.save
        # NotificationMailer.awaiting_response(@viewer, @entry).deliver_later *** this is the logic for emailing
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
    # @entries = Entry.all.where(user_id: current_user.id).reverse

    # this is the correct association, but .enrties isn't working. There's something wrong with the associations in the model.
    @entries = current_user.entries.reverse
    @responses = Response.all.where(user_id: current_user.id)
    @teaser = get_bottle_teaser
    render json: {entries: @entries,
                  responses: @responses,
                  teaser: @teaser}
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render json: entry.to_json
  end

  private

  def permit_params
    params.require(:entry).permit(:body, :is_private, :can_respond)
  end

  # get entry object if user_id is stored as a viewer_id in a different user's entry, i.e. if a user has a MIB.
  def get_message_in_a_bottle
    bottle = Entry.find_by(viewer_id: current_user.id)
    if bottle
      return bottle
    else
      return false
    end
  end

  # take bottle object and truncate the body to return a teaser sentence for the user
  def get_bottle_teaser
    entry = get_message_in_a_bottle
    if entry
      teaser = entry.body[0..100]
    else
      "Waiting for a new bottle..."
    end
  end



end
