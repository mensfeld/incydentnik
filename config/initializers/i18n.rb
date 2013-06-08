# Load all nested translation files - so we can create nested hierarchy
I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml')]
