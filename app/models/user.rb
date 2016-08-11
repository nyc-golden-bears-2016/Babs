class User < ApplicationRecord
  has_many :entries
  has_many :responses
  has_secure_password

end
