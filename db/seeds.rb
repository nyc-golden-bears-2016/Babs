user = User.create(username: "Dummy", password: "test12")

entries = Entry.create(user_id: user.id,
                       body: "You are amoral, corrupt, and depraved. You are cruel, hearltess, mean-spirited barbarous. You are trecharous, despicable, and vilely contemptible. You are a low-down seducer.")


# prompts
"When was the last time you asked for help?"
""
