class Prompt < ApplicationRecord
  has_many :entries

  validates :question, presence: true, length: { maximum: 300 }

end
