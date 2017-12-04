class Job < Sequel::Model(:jobs)
  plugin :json_serializer
  
  many_to_one :user
  one_to_many :prints
  
  def prints_data
    prints = []
    self.prints.each do |p|
      print = {
        file_preview: p.file_preview,
        filename: p.filename,
        path: p.path,
        filetype: p.filetype,
        filesize: p.filesize,
        approved: p.approved,
        created_at: p.created_at
      }
      prints.push(print)
    end
    prints
  end
 
end
