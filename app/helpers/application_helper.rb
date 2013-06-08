# coding: utf-8

module ApplicationHelper

  # Decides whether or not menu element is active (we are in this menu)
  #
  # @param Array[<ControllerClass>] args list of controllers that we should be
  #   in, to make menu element active, and action names (as string or sym) if
  #   only given action from given controllers will determine that element
  #   is active
  def menu_active?(*args)
    actions = []
    controllers = []

    args.each do |arg|
      if arg.is_a?(String) || arg.is_a?(Symbol)
        actions << arg
      else
        controllers << arg
      end
    end

    is_action = actions.empty? || actions.any?{|action| action.to_s == params[:action].to_s }
    is_controller = controllers.any?{|klass| controller.is_a?(klass)}
    # Check if controller is an instance of a given class
    return is_action && is_controller ? 'active' : 'not-active'
  end

  def icon(name, color = nil)
    css_class = ["icon-#{name}"]
    css_class << 'icon-white' if color
    content_tag(:i, '', :class => css_class)
  end

  def link_to_edit(path, translation = nil, css_class = nil)
    options = {
      :class => css_class ||= 'btn'
    }
    content = "#{icon(:edit)} #{translation || I18n.t('attributes.edit')}"
    link_to content.html_safe, path, options
  end

  def link_to_destroy(path, translation = nil, css_class = nil, options = {})
    options.merge!({
      :class => css_class ||= 'btn btn-danger',
      :method => :delete,
      :confirm => I18n.t('attributes.confirm')
    })
    content = "#{icon(:trash)} #{translation || I18n.t('attributes.destroy')}"
    link_to content.html_safe, path, options
  end

  def link_to_back(path, text = I18n.t('attributes.back'), css_class = nil)
    params = {:class => css_class || 'btn'}
    link_to text, path, params
  end

  def named_roles
    names = { 
      :owner       => 'Właściciel miejsca' ,
      :organizer   => 'Organizator wydarzenia',
      :participant => 'Uczestnik'
    }
    User::ROLES.collect {|r| [names[r.to_sym] ,r] }
  end

end
