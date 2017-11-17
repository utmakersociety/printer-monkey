class Print < Sequel::Model(:prints)
    many_to_one :job
end