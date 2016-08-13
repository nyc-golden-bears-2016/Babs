require 'rails_helper'

  describe Response do
    let(:response) { Response.new }

    describe "#body" do
      describe "validations" do
       it "is valid when it's present" do
        response.body = "hey the body exists, it's cool, keep on rocking in the free world and doot doota doot do doot do"
        response.valid?
        expect(response.errors[:body]).to be_empty
      end

      it "is not valid when it's not present" do
        response.valid?
        expect(response.errors[:body]).to_not be_empty
      end
    end
  end

     describe "#is_read" do
      describe "validations" do
        it "is valid when it is true" do
          response.is_read = true
          expect(response.errors[:is_read]).to be_empty
        end

        it "is valid when it is false" do
          response.is_read = false
          expect(response.errors[:is_read]).to be_empty
        end

    end
  end

     describe "#can_respond" do
       describe "validations" do
        it "is valid when it is true" do
          response.can_respond = true
          expect(response.errors[:can_respond]).to be_empty
        end

        it "is valid when it is false" do
          response.can_respond = false
          expect(response.errors[:can_respond]).to be_empty
        end
    end
  end




 describe 'associations' do
  before(:each) do

    @user = User.create!(username: "ben", email: "Ben@ben.com", password_digest: "jams")

    @prompt = Prompt.create!(question: "what would you do for a scammer?")

    @entry = Entry.create!(body: "yes", author_id: @user.id, prompt_id: @prompt.id, is_private: false, is_read: true, can_respond: true)

    @response = Response.create!(body: "no thanks", entry_id: @entry.id, author_id: @user.id, is_read: true, can_respond: true)

  end

    it 'returns the entry it was written for' do
      expect(@response.entry).to eq @entry
    end

    it 'returns the user who wrote it' do
      expect(@response.user).to eq @user
    end

  end

end
