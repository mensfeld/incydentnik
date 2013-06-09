require "app_responder"

class ApplicationController < ActionController::Base
  protect_from_forgery

  layout 'application'

  self.responder = AppResponder
  respond_to :html

  private

  def after_sign_in_path_for(resource)
    main_path
  end

  def after_sign_up_path_for(resource)
    main_path
  end

  def after_sign_out_path_for(resource)
    main_path
  end

  # If helps building an element if there is and ID of it (will try to
  # find it based on that ID)
  # If there is no params[:id] it will create a new instance of given class
  # @param [ActiveRecord::Base] ActiveRecord class type
  # @param [Symbol] from which params[attr] it should take attributes to
  #   build a new instance
  # @param [Symbol] what method it should use to find an element
  # @return [ActiveRecord::Base] your activerecord class instance
  # @example
  #   @element = build_resource(Menu, :menu, :find_by_name!)
  def build_resource(klass, attr = :attr, find_method = :find)
    if params[:id]
      klass.send(find_method, params[:id])
    else
      klass.new(params[attr])
    end
  end

end
