class Print < Sequel::Model(:prints)
  plugin :json_serializer
    
  many_to_one :job

end