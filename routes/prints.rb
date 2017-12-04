PrinterMonkey.route('prints') do |r|
  r.is 'submit' do
    r.get do
      view 'prints/submit-print', layout: 'prints/layout', layout_opts: {locals: {title: "Submit 3D Print"}}
    end
        
    r.post do
      prints = r.params
      if prints["job_id"].empty?
        job = Job.create do |j|
          j.name = prints["full_name"]
          j.email = prints["email"]
        end
        file = Uploader::Upload.file(prints["file"])
        if file[:uploaded]
          new_print = Print.new do |p|
            p.filename = file[:filename]
            p.path = file[:path_name]
            p.filetype = file[:type]
            p.filesize = file[:size]
            p.filament = prints["filament_type"]
          end
          job.add_print(new_print)
          response["Content-Type"] = "application/json"
          response.status = 200
          {:response => "ok",
          :msg => "File uploaded successfully"}.to_json
        else        
        end
      else
        job = Job[prints["job_id"]]
        file = Uploader::Upload.file(prints["file"])
        if file[:uploaded]
          new_print = Print.new do |p|
            p.filename = file[:filename]
            p.path = file[:path_name]
            p.filetype = file[:type]
            p.filesize = file[:size]
            p.filament = prints["filament_type"]
          end
          job.add_print(new_print)
          response["Content-Type"] = "application/json"
          response.status = 200
          {:response => "ok",
          :msg => "File uploaded successfully"}.to_json
        end
      end
    end
  end

  r.is do
    r.get do
      response['Content-Type'] = "application/json"
      Print.all.to_json
    end

    r.post do
    end
  end
end