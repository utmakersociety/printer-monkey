module Uploader
  class Upload
    class << self
      def file(file)
        now = Date.today
        # generate a random filename and strip whitespace
        new_filename =  SecureRandom.urlsafe_base64(nil, false).strip
        path = "public/uploads/#{now.year}/#{now.month}/#{now.mday}"
        FileUtils.mkdir_p(path)
        # create a path if it doesn't exist and write tmp file
        tmpfile = file[:tempfile]
        target = "#{path}/#{new_filename}.stl"
        File.open(target, 'wb') {|f| f.write tmpfile.read }
        uploaded = File.file?(target)
        if uploaded
          {
            filename: file[:filename],
            type: file[:type],
            size: File.size(tmpfile),
            path_name: target,
            uploaded: uploaded
          }
        else

        end
      end
    end
  end
end