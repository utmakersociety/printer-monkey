source 'https://rubygems.org'

gem 'json'
gem 'rake'
gem 'rack_csrf'
gem 'roda'
gem 'sequel'
gem 'erubis'
gem 'tilt'
gem 'eventmachine'
gem 'bcrypt'
gem 'puma'

group :production do
end

group :documentation do
  gem 'yard', '~> 0.9.11', :require => false
end

group :testing, :development do
  gem 'better_errors', '~> 2.1.1'
  gem 'binding_of_caller', '~> 0.7.2'
  gem 'rack-test', '~> 0.6.3', :require => 'rack/test'
  gem 'rspec', '~> 3.4.0'
  gem 'sass', '~> 3.4.20'
  gem 'sqlite3', '~> 1.3.11'
  gem 'shotgun'
end

group :testing do
  gem 'coderay', '~> 1.1.0'
end
