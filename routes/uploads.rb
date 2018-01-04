PrinterMonkey.route('uploads') do |r|
	r.on 'chunk' do		
		r.get do
			res_id = r.params["resumableIdentifier"]
			res_chunk_num = r.params["resumableChunkNumber"].to_i
			res_filename = r.params["resumableFilename"]
			res_chunk_size = r.params["resumableChunkSize"].to_i
			res_total_size = r.params["resumableTotalSize"].to_i
      #chunk folder path based on the parameters
      dir = "/tmp/#{res_id}"
      #chunk path based on the parameters
      chunk = "#{dir}/#{res_filename}.part#{res_chunk_num}"
      if File.exists?(chunk)
        #Let resumable.js know this chunk already exists
				response.status = 200
			else
				response.status = 404
        #Let resumable.js know this chunk doesnt exists and needs to be uploaded 
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
	
      #chunk folder path based on the parameters
	    dir = "/tmp/#{res_id}"
	    #chunk path based on the parameters
	    chunk = "#{dir}/#{res_filename}.part#{res_chunk_num}"
	
	    #Create chunks directory when not present on system
	    if !File.directory?(dir)
	      FileUtils.mkdir(dir, :mode => 0700)
			elsif	res_chunk_num.to_i == 1
				FileUtils.rm_rf Dir.glob("#{dir}/*")
      end
      
	    #Move the uploaded chunk to the directory
	    FileUtils.mv(temp_file, chunk)
	
	    #Concatenate all the partial files into the original file
	    current_size = res_chunk_num * res_chunk_size
	    filesize = res_total_size
	
	    #When all chunks are uploaded
	    if (current_size + res_chunk_size) >= filesize
	      #Create a target file
	      File.open("#{dir}/#{res_filename}","a") do |target|
	        #Loop trough the chunks
	        for i in 1..res_chunk_num
	          #Select the chunk
	          chunk = File.open("#{dir}/#{res_filename}.part#{i}", 'r').read
	          
	          #Write chunk into target file
	          chunk.each_line do |line|
	            target << line
	          end
	          
	          #Deleting chunk
	          FileUtils.rm("#{dir}/#{res_filename}.part#{i}", :force => true)
	        end
	      end
        #You can use the file now
        puts "File saved to #{dir}/#{res_filename}"
			end
			response.status = 200
			""
    end
	end
end