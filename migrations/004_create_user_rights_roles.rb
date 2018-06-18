Sequel.migration do
  up do
    create_table(:roles_user_rights) do
      primary_key :id
      foreign_key :role_id
      foreign_key :user_right_id
    end
  end

  down do
    drop_table(:user_rights_roles)
  end
end
