class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.string :body
      t.belongs_to :user
      t.belongs_to :prompt
      t.boolean :is_private
      t.boolean :is_read
      t.boolean :can_respond

      t.timestamps
    end
  end
end
