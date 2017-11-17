Sequel.migration do
  up do
    create_table(:filament_types) do
      primary_key :id
      String :type
      String :color
      String :brand
      Fixnum :amount
      Fixnum :num_of_roles
      DateTime :created_at
      DateTime :updated_at
    end
  end

  down do
    drop_table(:filament_types)
  end
end
