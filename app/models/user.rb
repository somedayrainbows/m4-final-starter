class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true, presence: true
  validates :password_confirmation, presence: true
end
