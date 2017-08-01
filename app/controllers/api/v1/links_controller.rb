class Api::V1::LinksController < Api::V1::BaseController

  def index
    @links = current_user.links
    respond_with @links
  end

  def create
    link = Link.new(link_params)
    if link.save
      respond_with :api, :v1, link
    else
      render :json => { :errors => link.errors.full_messages }, :status => 422

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

  def link_params
    params.require(:link).permit(:title, :url, :read).merge(user_id: current_user.id)
  end
end
