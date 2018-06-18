class PrintQueue < Sequel::Model(:queue)
  one_to_one :print
end