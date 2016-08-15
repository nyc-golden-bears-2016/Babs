class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.string :body, null:false
      t.belongs_to :user, null:false
      t.belongs_to :viewer, as: :user_id
      t.integer :prompt_id
      t.boolean :is_private, default: false, null:false
      t.boolean :is_read, default: false, null:false
      t.boolean :can_respond, default: false, null:false

      t.timestamps null: false
    end
  end
end
