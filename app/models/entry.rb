class Entry < ApplicationRecord
  # belongs_to :user
  # belongs_to :prompt
  belongs_to :author, class_name: 'User'
  # belongs_to :viewer, class_name: 'User'
  has_many :responses

  # validates :author_id, presence: true
  # validates :body, presence: true
  # validates :is_private, inclusion: {in: [true,false]}
  # validates :is_private, exclusion: {in: [nil]}
  # validates :is_read, inclusion: {in: [true,false]}
  # validates :is_read, exclusion: {in: [nil]}
  # validates :can_respond, inclusion: {in: [true,false]}
  # validates :can_respond, exclusion: {in: [nil]}

end
