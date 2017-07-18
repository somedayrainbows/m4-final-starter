class Api::V1::LinksController < ApplicationController

  def index
    render json: Link.all
  end

  def show
    render json: Link.find(params[:id])
  end

  def create
    link = Link.new(link_params)
    if link.save
      render json: link
    else
      render json: link.errors.full_messages, status: 500
    end
  end

  def update
    @link = Link.find(params[:id])
    if @link.update_attributes(link_params_read)
      render json: @link
    else
      render json: @link.errors.full_messages, status: 500
    end
  end

  private

  def link_params_read
    params.permit(:read)
  end

  def link_params
    params.permit(:url, :title, :id).merge(user_id: current_user.id)
  end
end
