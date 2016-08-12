class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.string :body
      t.belongs_to :user
      t.belongs_to :prompt
      t.boolean :is_private, default: false
      t.boolean :is_read, default: false
      t.boolean :can_respond, default: false

      t.timestamps, null: false
    end
  end
end
