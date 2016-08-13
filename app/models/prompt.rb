class Prompt < ApplicationRecord
  has_many :entries

  # validates :question, presence: true

end
