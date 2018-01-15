PrinterMonkey.route('prints') do |r|
  r.is do
    response['Content-Type'] = "application/json"
    print = Print.order(Sequel.asc(:id))
    print = print.to_hash
  end

  r.is 'submit' do
    r.get do
      view 'prints/submit-print', layout: 'prints/layout', layout_opts: {locals: {title: "Submit 3D Print"}}
    end
        
    r.post do
      prints = r.params
      if prints["job_id"].empty?
        #job = Job.create(name: prints["full_name"], email: prints["email"])
        pp prints
      else
        job = Job[prints["job_id"].to_i]
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