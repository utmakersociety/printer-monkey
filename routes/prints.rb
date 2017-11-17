PrinterMonkey.route('prints') do |r|
    r.is do
        r.get do
        
        end

        r.post do
        end
    end

    r.on 'submit' do
        r.get do
            view 'prints/submit-print', layout: 'prints/layout', layout_opts: {locals: {title: "Submit 3D Print"}}
        end
        
        r.post do
        end
    end
end