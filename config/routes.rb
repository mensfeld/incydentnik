Incydentnik::Application.routes.draw do
  root to: "main#index"

  resources :incidents, only: [:create, :index]
end
