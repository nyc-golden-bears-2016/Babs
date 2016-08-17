class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :prompt
  belongs_to :viewer, class_name: 'User'
  has_many :responses, dependent: :destroy

  # validates :author_id, presence: true
  # validates :body, presence: true
  # validates :is_private, inclusion: {in: [true,false]}
  # validates :is_private, exclusion: {in: [nil]}
  # validates :is_read, inclusion: {in: [true,false]}
  # validates :is_read, exclusion: {in: [nil]}
  # validates :can_respond, inclusion: {in: [true,false]}
  # validates :can_respond, exclusion: {in: [nil]}

  def stream_length_check
      if self.body.length > 80
        self.user = nil
      end
  end

  # find a random user to receiver message
  def find_random_user
    total_users = User.last.id
    count = 0
    begin
      bottle_receiver = User.find(rand(1..total_users))
      if bottle_receiver.id == self.user_id
        bottle_receiver = nil
      end
      count += 1
    end until !bottle_receiver.nil? || count > total_users
    self.viewer_id = bottle_receiver.id
    self.save
  end

  def unlock_bottle
    if !self.is_private
      self.find_random_user
      if self.body.length > 4
        full_bottle = Entry.all.where(viewer_id: self.user_id)[-1]
        if full_bottle
          return full_bottle
        else
          {body: "Waiting for a new bottle...",
          id: self.id}
        end
      else
        {body: "Your post was not long enough to unlock your bottle.",
          id: self.id}
      end
    else
      # viewer_id can't be null. If a message is private, the viewer_id is set to the user_id
      self.viewer_id = self.user_id
      {body: 'Send a message in a bottle to unlock one.',
        id: self.id}
    end
  end


end
