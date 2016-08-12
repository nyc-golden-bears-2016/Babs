class Entry < ApplicationRecord
  # belongs_to :prompt
  belongs_to :user
  has_many :responses

end
