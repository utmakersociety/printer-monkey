Sequel.migration do
  up do
    create_table(:prints) do
      primary_key :id
      String :file_preview, null: true
      String :filename, :null => false
      String :path, null: false
      String :relative_path, null: false
      String :filetype, null: false
      Fixnum :filesize
      String :filament
      Fixnum :status, default: 0
      FalseClass :completed, default: false
      DateTime :created_at
      DateTime :updated_at
      foreign_key :job_id
      foreign_key :queue_id
    end
  end

  down do
    drop_table(:prints)
  end
end
