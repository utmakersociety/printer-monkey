Sequel.migration do
  up do
    create_table(:roles) do
      primary_key :id
      String :name, :null => false
      foreign_key :user_id
    end
  end

  down do
    drop_table(:roles)
  end
end
