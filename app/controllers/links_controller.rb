class LinksController < ApplicationController
  before_action :authorize

  def index
    @links = Link.where(user_id: current_user.id)
  end

  # def create
  #   link = Link.create(link_params)
  #   if link.save
  #     flash[:success] = "Link saved successfully!"
  #     render partial: 'link'
  #   else
  #     flash[:danger] = "URL is not a valid URL."
  #     redirect_to root_path
  #   end
  # end

  # private
  #
  # def link_params
  #   params.require(:link).permit(:url, :title).merge(user_id: current_user.id)
  # end
end
