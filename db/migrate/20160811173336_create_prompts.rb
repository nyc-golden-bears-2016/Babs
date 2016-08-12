class CreatePrompts < ActiveRecord::Migration[5.0]
  def change
    create_table :prompts do |t|
      t.string :question, null:false

      t.timestamps
    end
  end
end
