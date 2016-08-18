# user = User.create(username: "Dummy", password: "test12")

# entries = Entry.create(author_id: user.id,
#                        body: "You are amoral, corrupt, and depraved. You are cruel, hearltess, mean-spirited barbarous. You are trecharous, despicable, and vilely contemptible. You are a low-down seducer.")


# # prompts
# "When was the last time you asked for help?"
# ""
#""

Prompt.create(question: "When was the last time you asked for help?" )
Prompt.create(question: "Which parent do you feel you are more like?")
Prompt.create(question: "Loved heart, what can I say? When I was a lark, I sang; When I was a worm, I devoured. The self says I am; The heart says, I am less; The spirit says you are nothing. --Theodore Roethke")
Prompt.create(question: "What friend do you think about the most who you haven't spoken to in a long time?")
Prompt.create(question: "What is the farthest away from your home you have ever been?")
Prompt.create(question: "What period of your life did you feel most different from other people?")
Prompt.create(question: "What period of your life did you feel most like other people?")
Prompt.create(question: "I have nothing to say and I'm saying it --John Cage")
Prompt.create(question: "What is a skill you have developed in the last year?")
Prompt.create(question: "Do you bring change into your life or do you allow change to happen to you?")
Prompt.create(question: "so much depends upon a red wheel barrow glazed with rain water beside the white chickens --William Carlos Williams")
Prompt.create(question: "How long does it usually take you to fall asleep?")
Prompt.create(question: "When was the last time you...?")
Prompt.create(question: "What is a secret you would tell a stranger but not a family member?")
Prompt.create(question: "A small silence came between us, as precise as a picture hanging on the wall. --Jean Stafford")
Prompt.create(question: "To have that sense of one's intrinsic worth which constitutes self-respect is potentially to have everything: the ability to discriminate, to love and to remain indifferent. To lack it is to be locked within oneself, paradoxically incapable of either love or indifference. --Joan Diddion")
Prompt.create(question: "When was the last time you betrayed someone?")
Prompt.create(question: "How old were you the first time you questioned something important?")
Prompt.create(question: "When was the first time you were afraid of your parents?")
Prompt.create(question: "How did you deal with your last mistake?")
Prompt.create(question: "What is something that can sometimes scare you and sometimes excite you?")
Prompt.create(question: "How do you deal with change?")
Prompt.create(question: "In entertaining your guests, bring out your laundry of the day and explain to them about each item. How and when it became dirty and why, etc. 1963 --Yoko Ono")
Prompt.create(question: "The Big Realization: Turn of all water, gas, and electricity for one week. I wish you a good time --Willem De Ridder, 1964")
Prompt.create(question: "Let's Piece I: 500 Noses are more beautiful tahan one nose. Even a telephone no. is more beautiful if 200 people think of the same number at the same time. 1960 Spring --Yoko Ono")
Prompt.create(question: "Let 500 people think of the same telephone number at once for a minute at a set time, 1960 Spring --Yoko Ono")
Prompt.create(question: "Let everybody in the city think of the word 'yes' at the same time  for 30 seconds. Do it often. 1960 Spring --Yoko Ono")
Prompt.create(question: "Make it the whole world thinking all the time, 1960 Spring --Yoko Ono")


User.create(username: "Alex", email: "alex@alex.com", password: "password")
User.create(username: "Joe", email: "joe@alex.com", password: "easyman")

Entry.create(body: "walking to wal-mart", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "I'm also at wal-mart", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "this wal-mart smells weird", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "Home Depot FTW", user_id: 1, viewer_id: 1, stream: true)
Entry.create(body: "I am what I am and no more, well, maybe",user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "If Wal-Mart doesn't have the DVDs I desire I will not be okay.", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "All right, leaving Wal-Mart", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "Lowes FTW!", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "Wal-Mart Is Now Closing", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "stream test", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "stream test2", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "stream test3", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false,  stream: true)
Entry.create(body: "stream test4", user_id: 1, viewer_id: 1, is_private: false, is_read: false, can_respond: false, stream: true)

