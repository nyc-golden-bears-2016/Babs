class Entry < ApplicationRecord
  belongs_to :user
  has_many :responses
  belongs_to :prompt
end
