require 'rails_helper'

  describe Entry do
    let(:entry) { Entry.new }

  describe "#body" do
    describe "validations" do
     it "is valid when it's present" do
      entry.body = "hey the body exists, it's cool, keep on rocking in the free world and doot doota doot do doot do"
      entry.valid?
      expect(entry.errors[:body]).to be_empty
    end

    it "is not valid when it's not present" do
      entry.valid?
      expect(entry.errors[:body]).to_not be_empty
    end

   end
 end

  describe "#user_id" do
    describe "validations" do
     it "is has a user" do
      entry.user_id = 1
      entry.valid?
      expect(entry.errors[:user_id]).to be_empty
    end

    it "is throws an errors when there is no user" do
      entry.valid?
      expect(entry.errors[:user_id]).to_not be_empty
    end

    it "is not valid when it is not unique" do
      user = User.new(id: 1)
      entry_1 = Entry.create(id: 1, user_id: 1)
      entry.user_id = 1
      entry.id = 2
      entry.valid?
      expect(entry.errors[:user]).to_not be_empty
    end

   end
 end

  describe "#is_private" do
    describe "validations" do
     it "is valid when it's true" do
      entry.is_private = true
      entry.valid?
      expect(entry.errors[:is_private]).to be_empty
    end

     it "is valid when it's false" do
      entry.is_private = false
      entry.valid?
      expect(entry.errors[:is_private]).to be_empty
    end

    it "is not valid when it's not present" do
      entry.valid?
      expect(entry.errors[:is_private]).to_not be_empty
    end


   end
 end

  describe "#is_read" do
    describe "validations" do
     it "is valid when it's true" do
      entry.is_read = true
      entry.valid?
      expect(entry.errors[:is_read]).to be_empty
    end

     it "is valid when it's false" do
      entry.is_read = false
      entry.valid?
      expect(entry.errors[:is_read]).to be_empty
    end

    it "is not valid when it's not present" do
      entry.valid?
      expect(entry.errors[:is_read]).to_not be_empty
    end


   end
 end


  describe "#can_respond" do
    describe "validations" do
     it "is valid when it's true" do
      entry.can_respond = true
      entry.valid?
      expect(entry.errors[:can_respond]).to be_empty
    end

     it "is valid when it's false" do
      entry.can_respond = false
      entry.valid?
      expect(entry.errors[:can_respond]).to be_empty
    end

    it "is not valid when it's not present" do
      entry.valid?
      expect(entry.errors[:can_respond]).to_not be_empty
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

    @response_1 = Response.create!(body: "yes please", entry_id: @entry.id, user_id: @user.id, is_read: true, can_respond: true)


    @response_2 = Response.create!(body: "no thanks", entry_id: @entry.id, user_id: @user.id, is_read: true, can_respond: true)

  end

    it 'returns the user who wrote it' do
      expect(@entry.user).to eq @user
    end

    it 'returns the responses written for it' do
      expect(@entry.responses).to match_array [@response_1, @response_2]
    end

    it 'returns the prompts written for it' do
      expect(@entry.prompt).to eq @prompt
    end

  end

end
