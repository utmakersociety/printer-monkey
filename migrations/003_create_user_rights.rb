Sequel.migration do
  up do
    create_table(:user_rights) do
      primary_key :id
      String :right
    end
  end

  down do
    drop_table(:user_rights)
  end
end
