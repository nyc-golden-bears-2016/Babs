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

  # is message in a bottle?
  def send_message_in_a_bottle
    if !self.is_private
      self.find_random_user
    end
  end

  def stream_length_check
      if self.body.length > 80
        self.user = nil
      end
  end

  # find a random user to receiver message
  def find_random_user
    total_users = User.last.id
    begin
      bottle_receiver = User.find(rand(1..total_users))
      if bottle_receiver.id == self.user_id
        bottle_receiver = nil
      end
    end until !bottle_receiver.nil?
    self.viewer_id = bottle_receiver.id
    self.save
  end

  def unlock_bottle
    if self.body.length > 4
      return full_bottle = Entry.all.where(viewer_id: self.user_id)[-1]
    else
      # save entry, but flash alert that bottle was not unlocked. Keep teaser.
      flash[:alert] = "Your post was not long enough to unlock your bottle."
    end
  end

end
