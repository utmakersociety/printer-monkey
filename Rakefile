require 'sequel'
require 'logger'

namespace :sqlite do
  task :new do
    file = File.new 'db/test.sqlite', 'w+'
    file.close
  end

  desc 'runs database migrations'
  task :migrate do
    system('mkdir -p db')
    DB = Sequel.sqlite('db/test.sqlite')
    DB.loggers << Logger.new($stdout)
    Sequel.extension :migration
    Sequel::Migrator.apply(DB, 'migrations')
  end


  desc 'resets all the sqlite file and then checks integrity'
  task :reset do
    DB = Sequel.sqlite('db/test.sqlite')
    DB.loggers << Logger.new($stdout)
    DB.run "PRAGMA writable_schema = 1;
    delete from sqlite_master where type in ('table', 'index', 'trigger');
    PRAGMA writable_schema = 0;"
    DB.run "VACUUM;"
    DB.run "PRAGMA INTEGRITY_CHECK;"
  end

  desc 'deletes the database'
  task :delete do
    system('rm -rf db')
  end
end
