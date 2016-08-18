class EntriesController < ApplicationController


  def viewed
    @bottle = get_bottles[-1]
    @bottle.is_read = true
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
    if @entry.stream == true
      @entry.stream_length_check
    end
    if @entry.save
      # mail(@entry)
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
    @responses = get_responses(@entries)
    @all_prompts = @entries.map do |entry|
      Prompt.find(entry.prompt_id)
    end
    @bottles = get_your_bottles
    @teaser = get_bottle_teaser
    @faker  = generate_faker
    render json: {entries: @entries,
                  responses: @responses,
                  teaser: @teaser,
                  inspo: @prompt,
                  all_prompts: @all_prompts,
                  bottles: @bottles,
                  faker: @faker}
  end

  def stream
    streams = Entry.where(stream: true).last(10)
    if streams != nil
      streams_body = streams.map do |stream|
        stream.body
      end
      render json: {streams: streams_body}
    end
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy
    render json: entry.to_json
  end

  private

  def permit_params
    params.require(:entry).permit(:body, :is_private, :can_respond, :prompt_id, :stream)
  end

  # get entry object if user_id is stored as a viewer_id in a different user's entry, i.e. if a user has a MIB.
  def get_bottles
    bottles = Entry.all.where(viewer_id: current_user.id)
    if bottles
      return bottles
    else
      return false
    end
  end

  # returns an array of the bottles you have unlocked through creating a new entry
  def get_your_bottles
    bottles = get_bottles
    your_bottles = bottles.map do |bottle|
      # if user_id == viewer_id, the entry is private and should not be displayed alongside bottles
      if bottle.is_read && bottle.user_id != bottle.viewer_id
        bottle
      end
    end
    return your_bottles.compact
  end

  # returns an array of non_user responses
  def get_responses(entries)
    responses = entries.map do |entry|
      entry.responses
    end
    responses.flatten.compact
  end


  # find the viewer of a message in a bottle to send them a teaser email
  def find_viewer
    @viewer = User.find(@entry.viewer_id)
  end

  # take bottle object and truncate the body to return a teaser sentence for the user
  def get_bottle_teaser
    entries = get_bottles
    anon_bottles = entries.map do |bottle|
      if bottle.viewer_id != current_user.id
        bottle
      end
    end
    anon_bottles.compact!
    if !anon_bottles.empty?
      teaser = entries[-1].body[0..40]
    else
      "Waiting for a new bottle..."
    end
  end

  def generate_faker
    entries = get_bottles
    if !entries.empty?
      length = entries[-1].body.length - 40
      faker = ""
      length.times do
        faker << Faker::Lorem.word + " "
      end
      return faker
    end
  end

  def used_prompts
    current_user.entries.map do |entry|
      entry.prompt_id
    end
  end

  def prompt_find
    prompts = Prompt.all
    new_prompts = prompts.select do |prompt|
        unless used_prompts.include?(prompt.id)
          return prompt
        end
     end
    if new_prompts.empty?
      return prompts.sample
    else
      return new_prompts.sample
    end
  end

  def mail(post)
    if post.viewer_id != current_user.id
      NotificationMailer.awaiting_response(find_viewer, @entry).deliver_later
    end
  end

end



