class IncidentsController < ApplicationController

  respond_to :js

  def index
  end

  def create
    Incident.create(params[:incident])
    head 200
  end

end
