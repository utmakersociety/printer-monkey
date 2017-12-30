class Job < Sequel::Model(:jobs)
  plugin :json_serializer
  
  many_to_one :user
  one_to_many :prints
  
  def prints_data
    prints = []
    self.prints.each do |p|
      print = {
        id: p.id,
        filename: p.filename,
        path: p.path,
        filesize: p.filesize,
        filament: p.filament,
        approved: p.completed,
        created_at: p.created_at
      }
      prints.push(print)
    end
    prints
  end
 
end
