PrinterMonkey.route('print-queue') do |r|
  r.is do
    r.get do
      PrinterQueue..to_json
    end
  end

  r.is 'add' do
    r.post do
    end
  end
end
