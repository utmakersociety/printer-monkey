Sequel.migration do
  up do
    create_table(:queue) do
      primary_key :id
      Integer :position
      DateTime :started_at
      DateTime :finished_at
      DateTime :updated_at
      DateTime :created_at
    end
  end

  down do
    drop_table(:queue)
  end
end
