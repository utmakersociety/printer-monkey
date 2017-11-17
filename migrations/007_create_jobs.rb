Sequel.migration do
  up do
    create_table(:jobs) do
      primary_key :id
      String :name, :null => false
      String :email, :null => false
      FalseClass :completed, :default => false
      DateTime :created_at
      DateTime :updated_at
    end
  end

  down do
    drop_table(:jobs)
  end
end
