class Role < Sequel::Model(:roles)
 one_to_many :users 
end
