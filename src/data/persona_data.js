export default [
  {
    pId: 0, 
    name: "Jessica",
    stages: [
      {id: 0, videoUrl: "Jessica1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Jessica2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Jessica3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Jessica4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Jessica5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Jessica6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "How well is the door for the pushchair space indicated?",
      options: "", comment: true, likert: "poor", findingName: "multi_door_inside_jessica",},
      {id: 1, text: "Which pole is best for Jessica?", 
      options: "pole", comment: true, likert: false},
      {id: 2, text: "How well does the new train help Jessica keep Holly safe?", 
      options: "", comment: false, likert: "verywell", findingName: "safety_jessica",},
      {id: 3, text: "How clear is the passenger information screen?", 
      options: "", comment: true, likert: "unclear", findingName: "info_screens_jessica",},
      {id: 4, text: "How clear are the door light and sound indications?", 
      options: "", comment: true, likert: "unclear", findingName: "door_indicators_jessica",},
      // Final questions must always be present
      {id: 5, text: "Thinking about Jessica's journey, how well do the new trains suit the needs of someone like Jessica?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_jessica",},
    ],
    transcript: [ 
      {text: "It’s Friday afternoon and me and the kids are at Haymarket waiting to catch a Metro back to Gateshead. We’ve been to the Great North Museum but we’re at the station later than I wanted and the platform is packed with commuters. I couldn’t get Holly out of the soft-play room! It’s been a hot day, and the kids are tired, hungry, and cross. At last, a train’s coming in. But where’s the thing on the doors that shows where the pushchair space is? I’m trying to spot it and stop Holly getting too near the platform edge."},
      {text: "I get the right door but it’s so busy I end up getting on last and the pushchair space is already full. The train gets going and I need to grab hold of the middle pole and hold Holly’s hand while wedging the pushchair with my foot!"},
      {text: "At Monument a load of people get off and I’m able to use the pushchair space. But Holly is getting restless and I’m concerned about her going too close to the train doors as people get on and off."},
      {text: "Jake starts getting cranky and I’m listening out for announcements about the next station. Gary said he’d collect us from Gateshead Stadium rather than us needing to walk home. But with all Jake’s noise I can’t work out if the next station is Stadium or the Interchange. Maybe the information screens will help…"},
      {text: "Gateshead Stadium is the next station, but by the time I’ve got Holly and the pushchair ready the train’s already stopped so I need to be quick pressing the button."},
      {text: "The doors open and Garys upstairs waiting for us."},
    ],
  },
  {
    pId: 1, 
    name: "Sanjeev",
    stages: [
      {id: 0, videoUrl: "Sanjeev1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Sanjeev2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Sanjeev3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Sanjeev4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Sanjeev5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Sanjeev6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "How well is the door for the bicycle space indicated?", 
      options: "", comment: true, likert: "poor", findingName: "multi_door_outside_sanjeev",},
      {id: 1, text: "Which pole is best for Sanjeev?", 
      options: "pole", comment: true, likert: false,
      comments: [
        "Given the design of the seating and the decreased number of seats, there is a distinct lack of grab poles for commuters standing.",
        "Have less grab poles by seats and more ones suspended from the middle of the roof. Try and prevent people from standing near people sitting where possible. Grab poles are an obstruction and having them between every other seat just gets in the way.",
        "These are good for people a bit wobbly on their feet, or when the train is packed to hold on so you dont fall over each other.",
      ]},
      {id: 2, text: "Which sort of bike stand is best for Sanjeev?", 
      options: "bike", comment: true, likert: false, 
      comments: [
        "Strap would potentially cause less damage to bikes if they are knocked.  Clamps can bend the wheels if the bike is moved unintentionally.",
        "Good to see that bicycles are being allowed onto the trains this time. Although there should be some restrictions I.e. not when the train is busy or peak times.",
        "A clamp isn't great as bike tyre width varies, a hook is more practical but I think a strap is best."
      ]},
      {id: 3, text: "How useful would Sanjeev find uninterrupted Internet access on the train?", 
      options: "", comment: true, likert: "useful", findingName: "internet_sanjeev",},
      {id: 4, text: "How well is the multipurpose area indicated?", 
      options: "", comment: true, likert: "poor", findingName: "multi_window_inside_sanjeev",},
      // Final questions must always be present
      {id: 5, text: "Thinking about Sanjeev's journey, how well do the new trains suit the needs of someone like Sanjeev?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_sanjeev",},
    ],
    transcript: [ 
      {text: "A long shift at the hospital today but starting early means I’m at the Metro station by four o’clock in the afternoon. Drew and I are having a bit of a house-warming party tonight so, I’ve got bags of nibbles from the supermarket as well as my bike and the usual work stuff. I know where to stand on the platform to get on at the right doors for the bike spaces on the train."},
      {text: "Fortunately there are not many people getting on the train but I still need to manoeuvre my bike and bags around the pole they have in the middle of the entrance areas. Not easy when you’re washed out after an early start and a hectic day..."},
      {text: "Next challenge is to secure my bike in the bike area whilst juggling shopping bags, helmet, and phone (my tickets is stored on the Pop app)."},
      {text: "I get settled into a seat where I can see my bike. It’s an hour to Callerton and I usually like to chill out with a book. But today I prefer to listen to some music on my phone, relax and watch the world go by. But I sometimes lose signal in parts of my journey."},
      {text: "I zone out until we cross the Tyne, a view I love. When we stop at Central station, a woman with a pushchair gets on looking stressed. My bike is in one of the cycle spaces and a group of teenagers are in the other. I politely ask them to move..."},
      {text: "The teens are pretty good about moving and even help the woman with her pushchair when she gets off. Before I know it, I’m on my bike speeding home!"},
    ],
  },
  {
    pId: 2, 
    name: "Desmond",
    stages: [
      {id: 0, videoUrl: "Desmond1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Desmond2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Desmond3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Desmond4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Desmond5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Desmond6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "Which combination of pole and door colours, and floor markings are best for Desmond?", 
      options: "colours", comment: true, likert: false},
      {id: 1, text: "Which style of seating is best for Desmond?", 
      options: "seats", comment: true, likert: false},
      {id: 2, text: "Should priority seats be indicated with different colours for Desmond and Jim?", 
      options: "priority", comment: true, likert: false},
      {id: 3, text: "How clear is the passenger information screen for Desmond?", 
      options: "", comment: true, likert: "unclear", findingName: "info_screens_desmond",},
      {id: 4, text: "Which side wall panel colour is best for Desmond?", 
      options: "sidewall", comment: true, likert: false},
      // Final questions must always be present
      {id: 5, text: "Thinking about Desmond's journey, how well do the new trains suit the needs of someone like Desmond?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_desmond",},
    ],
    transcript: [ 
      {text: "It’s Saturday evening and I’m dressed in style. Me and the boys are having an evening of culture at the Sage. I’m meeting them at Gateshead Interchange and we’ll walk there together. The Metro train arrives at Tyne Dock station. As I’m getting on, I need to watch out for the pole in the middle of the entrance area – I’ve bashed into it in the past."},
      {text: "There’re already a few folk on the train but seems to be plenty of seats. I want to find a proper seat, not one you lean up against."},
      {text: "I get myself a seat - close to the doors where I like it. It’s amazing how people move if you appear blind. My mate Jim sometimes gets on at Jarrow. He’s not as steady on his feet as he was and one of those priority seats would be helpful."},
      {text: "Jim doesn’t get on at Jarrow – I bet he’s late getting dressed up. But a group of girls on a night out do. It’s good to see them having a great time singing and dancing but they’re loud and I can’t hear the audio announcements. I can read well enough if I get close and the text is bright so, I look for the information screen."},
      {text: "The girls see me looking at the screen and promise to let me know when we’re approaching Gateshead Interchange. I go to sit back down but there’s a couple with what could be luggage next to them. It can be hard working out what’s floor and what’s bags!"},
      {text: "Not long, and we’re at Gateshead Interchange where the girls help me off the train. Jim’s already there. Looks like it’s me who spent too long getting dressed up!"},
    ],
  },
  {
    pId: 3, 
    name: "Polly",
    stages: [
      {id: 0, videoUrl: "Polly1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Polly2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Polly3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Polly4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Polly5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Polly6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "How well is the multipurpose space indicated?", 
      options: "", comment: true, likert: "unclear", findingName: "multi_window_polly",},
      {id: 1, text: "Which bike stand is best for where Polly likes to stand? ", 
      options: "bike", comment: true, likert: false},
      {id: 2, text: "How clear is the passenger information screen?", 
      options: "", comment: true, likert: "unclear", findingName: "info_screens_polly",},
      {id: 3, text: "Which combination of pole and door colours, and floor markings are best for Polly?", 
      options: "colours", comment: true, likert: false},
      {id: 4, text: "How clear are the door light and sound indications?", 
      options: "", comment: true, likert: "unclear", findingName: "door_indicators_polly",},
      // Final questions must always be present
      {id: 5, text: "Thinking about Polly's journey, how well do the new trains suit the needs of someone like Polly?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_polly",},
    ],
    transcript: [ 
      {text: "I walk along the coast to get to the Metro in the morning. It’s usually very cold and this morning it’s absolutely freezing! I've got music and PE today, so I've got tons of stuff to carry – PE kit, saxophone and school bag! It takes me ten minutes to walk to the Metro station. I like getting to school 'bang on time' so, I get the train just after 7 am. I know exactly where to stand—and on a good day it goes exactly as planned—next to the second piece of glass at the station. When the Metro arrives, it’s quite busy. It looks like there are still a few seats left, but I stand in the multi-purpose space for my journey, rather than sit between people."},
      {text: "I lean against the edge of the divider and wedge my bags between my legs and the edge of the train. I stand on the right-hand side so that I don' t get in the way of passengers getting on and off."},
      {text: "The journey takes half an hour, so I use my phone to message my friends and listen to music. My friend Molly messages me to say she’s on her Metro. I like to know the progress of my journey - it looks like I've just left Monument."},
      {text: "I start getting all my stuff together. There are some older boys trying to act tough so, I concentrate on keeping an eye on my bags."},
      {text: "I like to get to the door before I'm getting to the stop to make sure I'm the first off, and I'm at the front of the queue."},
      {text: "There are staff checking tickets at Jesmond Metro station, which I always like. It’s good to know there’s someone there if I need a hand with anything. I show my Season Ticket to the staff on my way out and bump into Molly. It starts tipping it down as we walk the last few minutes to school together. We arrive just in time—but soaked!"},
    ],
  },
  {
    pId: 4, 
    name: "Robert",
    stages: [
      {id: 0, videoUrl: "Robert1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Robert2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Robert3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Robert4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Robert5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Robert6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "How well is the door to the wheelchair space indicated?", 
      options: "", comment: true, likert: "unclear", findingName: "wheel_door_decal_robert",},
      {id: 1, text: "How clear are the door light and sound indications?", 
      options: "", comment: true, likert: "unclear", findingName: "door_indicators_robert",},
      {id: 2, text: "How well is the wheelchair space identified?", 
      options: "", comment: true, likert: "unclear", findingName: "wheel_window_decal_robert",},
      {id: 3, text: "How clear are the passenger information displays from the wheelchair space?", 
      options: "", comment: true, likert: "unclear", findingName: "info_screens_desmond",},
      {id: 4, text: "Which pole is best for Robert?", 
      options: "pole", comment: true, likert: false},
      // Final questions must always be present
      {id: 5, text: "Thinking about Robert's journey, how well do the new trains suit the needs of someone like Robert?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_robert",},
    ],
    transcript: [ 
      {text: "I use a wheelchair to get around including getting to work. Some parts of the North East are really hilly so the Metro is handy for getting around. I leave my house around nine to head to work and make my way to South Gosforth Metro Station. My job allows me to work flexibly so, I arrive and leave work a little later to avoid the rush hours. I arrive at the station around 9:30am. From experience, I know where the Metro train doors will be that are closest to the wheelchair area when it arrives. As the train comes into the station I try to predict where it’s going to stop. It doesn’t look particularly busy today."},
      {text: "I make my way to the door closest to the wheelchair spaces, lean forward and press the button."},
      {text: "I like to get on the Metro with my wheelchair facing forward. There are two wheelchair spaces so, I take the one on the right. I back my wheelchair into the space, trying to not squash my lunch in my rucksack."},
      {text: "It’s good to know where I am so, I look for the screens to check the progress of my journey."},
      {text: "When I hear the announcement for Four Land Ends, I begin to make my way to the door. There’re some people standing in the middle of the train, between the doors, but they’re canny enough and move out the way when they can see I’m trying to leave. On some Metro systems I’ve travelled on the gap between the grab pole and the train is too narrow."},
      {text: "The train stops and I open the doors. If I can, I prefer to get off the train backwards, but sometimes, when it’s busy, it's not always possible. I leave the train and make my way up the platform and use the lift. I have a Gold Card on my Concessionary Travel Pass, so I swipe that and leave the station. I’m at my desk in work by 10.00."},
    ],
  },
  {
    pId: 5, 
    name: "Mary",
    stages: [
      {id: 0, videoUrl: "Mary1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Mary2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Mary3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Mary4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Mary5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Mary6.mp4", nextId: null, questionId: 5},
    ],
    questions: [
      {id: 0, text: "Should priority seats be indicated with different colours?", 
      options: "priority", comment: true, likert: false},
      {id: 1, text: "Which pole is best for Mary?", 
      options: "pole", comment: true, likert: false},
      {id: 2, text: "How safe do these train features make Mary feel?", 
      options: "", comment: false, likert: "safer", findingName: "cctv_mary",},
      {id: 3, text: "How clear is the passenger information screen?", 
      options: "", comment: true, likert: "unclear", findingName: "info_screens_mary",},
      {id: 4, text: "How clear are the door light and sound indications?", 
      options: "", comment: true, likert: "unclear", findingName: "door_indicators_mary",},
      // Final questions must always be present
      {id: 5, text: "Thinking about Mary's journey, how well do the new trains suit the needs of someone like Mary?", 
      options: "", comment: true, likert: "verywell", findingName: "persona_mary",},
    ],
    transcript: [ 
      {text: "The weather has been lovely this week and on Friday I’m off to the coast to meet my friends for a coffee and a bit of window shopping. We’re going to meet in South Shields at 3 o’clock so, I leave home in plenty of time to get to there – the journey usually takes around forty minutes. I’m waiting at Gateshead Stadium Metro Station. It's quite quiet, like it normally is in the afternoon. The arthritis in my knees has been getting worse recently so, I don’t like standing for long if I can help it. When I get on the train, I’m on the lookout for a priority seat but there’s already a couple sat there."},
      {text: "I’m not in the mood to make a fuss so, start looking for another empty seat. The train starts moving off and I need to grab hold of one of the grab poles."},
      {text: "I find another seat on the other side of the train and settle down for the journey. A mixed group of people in smart clothes get on the train. They’re a bit rowdy – maybe it’s an office outing? They seem friendly and harmless enough but I can see a few other passengers looking over.  I notice the CCTV cameras and that everyone in the train can see what’s going on."},
      {text: "I’m soon lost in my thoughts just sitting and watching the world whizz by the window and lose track of where the Metro has got to. I quickly check the information screen to make sure."},
      {text: "Thank goodness South Shields is the end of this line so there’s less rush to get off the train. I want to be early, so get to the doors as the train is pulling in. I press the button to open the door. I forgot last time and somebody started tutting."},
      {text: "The sun is still shining as I leave South Shields station. And I’m the first at the coffee shop on King Street. 5 minutes early for once!"},
    ],
  },
]