class Job < Sequel::Model(:jobs)
  plugin :json_serializer
  plugin :association_dependencies

  many_to_one :user
  one_to_many :prints

  add_association_dependencies prints: :destroy
  
  # map associated print object to use
  # certain columns in the database
  def prints_data
    prints = []
    self.prints.each do |p|
      print = {
        id: p.id,
        filename: p.filename,
        path: p.path,
        relative_path: p.relative_path,
        filesize: p.filesize,
        filament: p.filament,
        approved: p.completed,
        created_at: p.created_at,
        status: p.status
      }
      prints.push(print)
    end
    prints
  end
 
end
