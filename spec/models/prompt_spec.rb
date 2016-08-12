require 'rails_helper'

  describe Prompt do
    let(:prompt) { Prompt.new }

  describe "#question" do
    describe "validations" do
     it "is valid when it's present" do
      prompt.question = "hey the body exists, it's cool, keep on rocking in the free world and doot doota doot do doot do"
      prompt.valid?
      expect(prompt.errors[:question]).to be_empty
    end

    it "is not valid when it's not present" do
      prompt.valid?
      expect(prompt.errors[:question]).to_not be_empty
    end

    it "is valid when it's less than 300 charachters" do
      prompt.question = "less than 300"
      prompt.valid?
      expect(prompt.errors[:question]).to be_empty
    end

    it "is not valid when it's greater than 300 charachters" do
      prompt.question = "greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300er than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300er than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300greater than  than 300"
      prompt.valid?
      expect(prompt.errors[:question]).to_not be_empty
    end

  end
end




 describe 'associations' do
  before(:each) do

    @user = User.create!(username: "ben", email: "Ben@ben.com", password_digest: "jams")

    @user_1 = User.create!(username: "alex", email: "Alex@ben.com", password_digest: "jams1000")

    @prompt = Prompt.create!(question: "what would you do for a scammer?")

    @entry = Entry.create!(body: "yes", user_id: @user.id, prompt_id: @prompt.id, is_private: false, is_read: true, can_respond: true)

    @entry_2 = Entry.create!(body: "no", user_id: @user_1.id, prompt_id: @prompt.id, is_private: false, is_read: true, can_respond: true)

  end

    it 'returns the entries that were written for it' do
      expect(@prompt.entries).to match_array [@entry, @entry_2]
    end

  end

end
