PrinterMonkey.route('jobs') do |r|
  r.is do
    r.get do
      response['Content-Type'] = "application/json"
      Job.order(Sequel.asc(:id))
        .limit(20)
        .to_json(:include => :prints_data,
                  only: [:id, :name, :email, :completed, :updated_at])
    end
  end

  r.is 'order-print' do
    r.get do
      view 'jobs/order-print', layout: 'jobs/layout', layout_opts: {locals: {title: "Submit 3D Print"}}
    end
        
    r.post do
      prints = r.params
      if prints["job_id"].empty?
        job = Job.create(name: prints["full_name"], email: prints["email"])
        i = 0
        files = prints["files"]
        while i < prints["files"].length
          print = Print[files["#{i}"]["id"]]
          print.update(filament: prints["filament_type"])
          job.add_print(print)
          i+=1
        end
        {status: 200, msg: "Job successfully created."}.to_json
      else
        job = Job[prints["job_id"].to_i]
      end
    end
  end
end