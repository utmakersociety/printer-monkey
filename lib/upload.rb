module Uploader
  class Upload
    class << self
      def file(file)
        now = Date.today
        # generate a random filename and strip whitespace
        new_filename =  SecureRandom.urlsafe_base64(nil, false).strip
        month = format("%02i", now.month)
        path = "public/uploads/#{now.year}/#{month}/#{now.mday}"
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
            path_name: "uploads/#{now.year}/#{month}/#{now.mday}",
            uploaded: uploaded
          }
        else

        end
      end

      def upload_chunk
      end

      def sort_chunks
      end

      def merge_chunks
      end
    end
  end
end