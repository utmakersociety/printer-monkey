Sequel.migration do
  up do
    create_table(:prints) do
      primary_key :id
      String :file_preview, :null => false
      String :filename, :null => false
      String :path, :null => false
      Fixnum :filesize
      FalseClass :approved, :default => false
      DateTime :created_at
      DateTIme :updated_at
      foreign_key :job_id
      foreign_key :filament_type_id
    end
  end

  down do
    drop_table(:prints)
  end
end
