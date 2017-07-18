class Link < ActiveRecord::Base
  belongs_to :user
  validates :url, :url => true
  validates :title, presence: true

  def all_for_current_user
    Link.where(user_id: current_user.id)
  end

end
