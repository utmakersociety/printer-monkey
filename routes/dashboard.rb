PrinterMonkey.route('dashboard') do |r|
  r.is do
    r.get do
      view 'dashboard/home', layout: 'dashboard/layout', layout_opts:{ locals: { title: "Home" }}
    end
  end
end
