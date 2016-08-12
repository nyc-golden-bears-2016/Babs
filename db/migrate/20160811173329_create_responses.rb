class CreateResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :responses do |t|
      t.string :body, null: false
      t.belongs_to :entry, null: false
      t.belongs_to :user, null: false
      t.boolean :is_read, null: false
      t.boolean :can_respond, null: false

      t.timestamps null: false
    end
  end
end
