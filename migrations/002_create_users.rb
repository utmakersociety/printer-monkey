Sequel.migration do
  up do
    create_table(:users) do
      primary_key :id
      String :username, :null => false
      String :name, :null => false
      String :email, :null => false
      String :password, :null => false
      DateTime :created_at
      DateTime :updated_at
      foreign_key :role_id
    end
  end

  down do
    drop_table(:users)
  end
end
