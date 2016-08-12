class Response < ApplicationRecord
  belongs_to :user
  belongs_to :entry

  validates :body, presence: true
  validates :is_read, inclusion: {in: [true,false]}
  validates :is_read, exclusion: { in: [nil] }
  validates :entry_id, presence: true
  validates :can_respond, inclusion: {in: [true,false]}

end
