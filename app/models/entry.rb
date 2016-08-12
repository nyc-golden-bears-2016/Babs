class Entry < ApplicationRecord
  belongs_to :user
  has_many :responses
  belongs_to :prompt

  validates :user_id, presence: true
  validates :user_id, uniqueness: true
  validates :body, presence: true
  validates :is_private, inclusion: {in: [true,false]}
  validates :is_private, exclusion: {in: [nil]}
  validates :is_read, inclusion: {in: [true,false]}
  validates :is_read, exclusion: {in: [nil]}
  validates :can_respond, inclusion: {in: [true,false]}
  validates :can_respond, exclusion: {in: [nil]}


end
