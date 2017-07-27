class Api::V1::LinksController < Api::V1::BaseController
  responders :flash

  def index
    respond_with Link.all
  end

  def create
    # require 'pry'; binding.pry
    link = Link.new(link_params)
    if link.save
      respond_with :api, :v1, link
    else
      flash[:notice] = "Not a valid link. Don't forget http:// or https://"
    end
  end

  def destroy
    respond_with Link.destroy(params[:id])
  end

  def update
    link = Link.find(params[:id])
    link.update_attributes(link_params)
    respond_with link, json: link
  end

  private

  def link_params_read
    params.permit(:read)
  end

  def link_params
    params.require(:link).permit(:url, :title).merge(user_id: current_user.id)
  end
end
