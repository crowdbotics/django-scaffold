variable "app_name" {
  description = "Unique name of the app"
  type = "string"
  default = "{{cookiecutter.project_generated_name}}"
}

variable "custom_domain" {
  description = "Custom domain name (optional)"
  type = "string"
  default = "{{cookiecutter.custom_domain}}"
}

variable "dyno_size" {
  description = "Size of Heroku dynos"
  type = "string"
  default = "{{cookiecutter.heroku_dyno_size}}"
}

variable "repo_url" {
    description = "URL to the git repo"
    type = "string"
    default = "{{cookiecutter.repo_url}}/archive/master.tar.gz"
}

variable "heroku_team" {
  description = "Heroku team / organization name"
  type = "string"
  default = "{{cookiecutter.heroku_team}}"
}
