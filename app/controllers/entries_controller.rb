class EntriesController < ApplicationController


  def viewed
    @bottle = get_bottles[-1]
    @bottle.is_read = true
    #######
    @bottle.can_respond = true
    #####
    if @bottle.save
      render json: {respondable: @bottle.can_respond}
    else
      render json: {respondable: 'something went wrong'}
    end
  end

  def create
    @entry = Entry.new(permit_params)
    @entry.user_id = current_user.id
    @bottle = @entry.unlock_bottle
    @entry.send_message_in_a_bottle
    if @entry.stream == true
      @entry.stream_length_check
    end
    if @entry.save
      # NotificationMailer.awaiting_response(find_viewer, @entry).deliver_later *** this is the logic for emailing
      render json: {entry: @entry,
                    bottle: @bottle}
    else
      render json: {error: "Your entry was not succussfully created"}
    end
  end

  def show
    Rufus::Scheduler.singleton.every '24h' do
      @prompt = prompt_find
    end
    if @prompt == nil
      @prompt = prompt_find
    end
    @entries = current_user.entries.reverse
    @responses = current_user.responses.reverse
    @all_prompts = @entries.map do |entry|
      Prompt.find(entry.prompt_id)
    end
    @bottles = get_bottles
    @teaser = get_bottle_teaser
    render json: {entries: @entries,
                  responses: @responses,
                  teaser: @teaser,
                  inspo: @prompt,
                  all_prompts: @all_prompts,
                  bottles: @bottles}
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render json: entry.to_json
  end

  private

  def permit_params
    params.require(:entry).permit(:body, :is_private, :can_respond, :prompt_id)
  end

  # get entry object if user_id is stored as a viewer_id in a different user's entry, i.e. if a user has a MIB.
  def get_bottles
    bottle = Entry.all.where(viewer_id: current_user.id)
    if bottle
      return bottle
    else
      return false
    end
  end

  # find the viewer of a message in a bottle to send them a teaser email
  def find_viewer
    @viewer = User.find(@entry.viewer_id)
  end

  # take bottle object and truncate the body to return a teaser sentence for the user
  def get_bottle_teaser
    entries = get_bottles
    if !entries.empty?
      teaser = entries[-1].body[0..10]
    else
      "Waiting for a new bottle..."
    end
  end

  def used_prompts
    current_user.entries.map do |entry|
      entry.prompt_id
    end
  end

  def prompt_find
    Prompt.all.each do |prompt|
        unless used_prompts.include?(prompt.id)
          return prompt
        end
     end
  end
end
