PrinterMonkey.route('prints') do |r|
	r.on 'chunk' do		
		r.get do
			res_id = r.params["resumableIdentifier"]
			res_chunk_num = r.params["resumableChunkNumber"].to_i
			res_filename = r.params["resumableFilename"]
			res_chunk_size = r.params["resumableChunkSize"].to_i
			res_total_size = r.params["resumableTotalSize"].to_i
      # chunk folder path based on the parameters
      dir = "/tmp/#{res_id}"
      # chunk path based on the parameters
      chunk = "#{dir}/#{res_filename}.part#{res_chunk_num}"
      if File.exists?(chunk)
        # Let resumable.js know this chunk already exists
				response.status = 200
			else
				response.status = 404
        # Let resumable.js know this chunk doesnt exists and needs to be uploaded 
			end
			""
    end

		r.post do
			res = r.params
			res_id = r.params["resumableIdentifier"]
			res_chunk_num = r.params["resumableChunkNumber"].to_i
			res_filename = r.params["resumableFilename"]
			res_chunk_size = r.params["resumableChunkSize"].to_i
			res_total_size = r.params["resumableTotalSize"].to_i
			temp_file = r.params["file"][:tempfile]
	
			# chunk folder path based on the parameters
			dir = "/tmp/#{res_id}"
	    
	    # chunk path based on the parameters
	    chunk = "#{dir}/#{res_filename}.part#{res_chunk_num}"
	
	    # Create chunks directory when not present on system
	    if !File.directory?(dir)
	      FileUtils.mkdir(dir, :mode => 0700)
			elsif	res_chunk_num.to_i == 1
				FileUtils.rm_rf Dir.glob("#{dir}/*")
      end
      
			# Move the uploaded chunk to the directory
	    FileUtils.mv(temp_file, chunk)
	
	    # Concatenate all the partial files into the original file
	    current_size = res_chunk_num * res_chunk_size
	    filesize = res_total_size
	
	    # When all chunks are uploaded
	    if (current_size + res_chunk_size) >= filesize
				# Create a target file
				file = "#{dir}/#{res_filename}"
	      File.open(file, "a") do |target|
	        # Loop trough the chunks
	        for i in 1..res_chunk_num
	          # Select the chunk
	          chunk = File.open("#{file}.part#{i}", 'r').read
	          
	          # Write chunk into target file
	          chunk.each_line do |line|
	            target << line
	          end
	          
	          # Deleting chunk
	          FileUtils.rm("#{file}.part#{i}", force: true)
	        end
	      end
        # You can use the file now
				puts "File saved to #{file}"
				file_ext = File.extname(file)
				if file_ext == ".stl" || file_ext == ".STL" && File.file?(file)
					file_info = Uploader::Upload.process(file)
					unless file_info.nil?
						print = Print.create do |p|
							p.filename = file_info[:filename]
							p.path = file_info[:path_name]
							p.filesize = file_info[:size]
							p.filetype = file_info[:type]
						end
						print.save
						response.status = 200
						print.to_json
					end
				else
					FileUtils.rm(file, force: true)
					response.status = 500
					{status: 500, msg: "File uploaded was not an stl model"}.to_json
				end
			else
				response.status = 200
				""
			end

    end
	end
end