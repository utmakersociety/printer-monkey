PrinterMonkey.route('jobs') do |r|
    r.is do
      r.get do
        response['Content-Type'] = "application/json"
        Job.order(Sequel.desc(:id))
          .limit(20)
          .to_json(:include => :prints_data,
                    only: [:id, :name, :email, :completed, :updated_at])
      end
    end
end