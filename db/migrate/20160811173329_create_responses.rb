class CreateResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :responses do |t|
      t.string :body
      t.belongs_to :entry_id
      t.boolean :is_read
      t.boolean :can_respond

      t.timestamps
    end
  end
end
