const cookies = {
  'mfsid' : '7a7fe245-c72a-4287-8971-2994ae732114', 
  'SameSite' : 'Strict',
};

const validImgInput = {
  'cam': '4',
  'o1': '1',
  'o2': '1',
  'o3': '1',
  'o4': '3',
  'o5': '0',
  'o6': '1',
  'o7': '1',
};

const invalidImgInput = {
  'cam' : '12',
  'o1' : '1',
  'o2' : '1',
  'o3' : '1',
  'o4' : '3',
  'o5' : '1',
  'o6' : '1',
  'o7' : '1',
}

const validEndwallInput = {
  'cam': '6',
  'o1': '1',
  'o2': '1',
  'o3': '1',
  'o4': '3',
  'o5': '0',
  'o6': '1',
  'o7': '1',
  'design': 0
};

const validOptionInput = {
  'cam': '14',
  'o1': '1',
  'o2': '1',
  'o3': '1',
  'o4': '3',
  'o5': '1',
  'o6': '1',
  'o7': '1',
  'qindex': '3',
};

const invalidOptionInput = {
  'cam': '14',
  'o1': '1',
  'o2': '1',
  'o3': '1',
  'o4': '3',
  'o5': '1',
  'o6': '1',
  'o7': '1',
  'qindex': '99',
};

const endwallResponse = {
  "day": [
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_1A.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_1B.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_1C.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_1D.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_1A.jpg",
  ],
  "night": [
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_2A.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_2B.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_2C.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_2D.jpg",
    "https://cdn.metrofutures.org.uk/endwall/Camera6_1_1_0_0_0_1_2A.jpg",
  ],
};

const optionUrlResponse = {
  "day": [
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_1_0_ON_1_1.jpg",
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_2_0_ON_1_1.jpg",
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_3_0_ON_1_1.jpg",
  ],
  "night": [
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_1_0_ON_1_2.jpg",
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_2_0_ON_1_2.jpg",
    "https://cdn.metrofutures.org.uk/conf/Camera14_1_1_3_0_ON_1_2.jpg",
  ],
};

const validPersonaInput = {
  'stageid': '0',
  'personaid': '1',
}

const invalidPersonaInput = {
  'stageid': '22',
  'personaid': '1',
}

export { 
  cookies,
  validImgInput,
  invalidImgInput,
  validEndwallInput,
  endwallResponse,
  validOptionInput,
  invalidOptionInput,
  optionUrlResponse,
  validPersonaInput,
  invalidPersonaInput,
}