class User < Sequel::Model(:users)
  many_to_one :role
end
