class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.string :type
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
