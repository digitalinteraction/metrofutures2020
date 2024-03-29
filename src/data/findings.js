let barColours = [
  "#0066CC",
  "#FF9900",
  "#999999",
  "#FEC600",
  "#66CCFF",
];

export default [
  {
    name: "summary",
    title: "Introduction",
    rows: [
      [
        {
          type: 'text', 
          content: [
            `<a href="https://openlab.ncl.ac.uk">Open Lab</a> at Newcastle University conducted an online public consultation on the proposed designs for new Tyne & Wear Metro trains in September/October 2020. This consultation aimed to obtain public preferences for seven design options (agreed between <a href="https://www.nexus.org.uk">Nexus</a> and <a href="https://www.stadlerrail.com/en/">Stadler</a>) and public feedback on whether new trains fit diverse passenger needs. Open Lab developed this website and other online activities as the means of the consultation.`,
            "There were 23,137 public engagements with the online consultation across the website, social media, webinars, and workshops. More than half (14,100) of these engagements were on social media. However social media engagements were briefer, less in-depth and less contextualised/immersive than website engagements (8,160) and workshop discussions (53). For the purposes of these findings, we define engagement as one person interacting with one online tool or activity to provide information relevant to the public consultation.",
            "Findings consist of public preferences for design options, ratings of other train features, and more detailed concerns and considerations on options and features from workshop discussions and website comments. Findings are presented here under headings that group relevant findings.",
            `Public votes for the seven design options are presented as charts under relevant headings. Design option preferences are given as a percentage of responses within each strand (Twitter polls, Facebook, website – Configure Your Metro, Your Journeys) plus a <strong>mean average</strong> of strand percentages, and as a percentage of the <strong>responses total</strong> across all strands. The mean average percentage therefore gives equal weighting to each strand regardless of the number of responses within it, and the responses total gives equal weighting to each response. <strong>Responses total</strong> therefore provides the public preference for design options as a consensus view but does not take account of the depth of engagement. <strong>Mean average</strong> of percentages across the strands accounts somewhat for the depth of engagement in that narrower (and deeper) strands carry as much weight as wider/shallower strands.`,
          ]
        },
        {
          type: 'table',
          content: {
            rows: [
              {online_tool_or_activity: "Twitter and Facebook polls", engagements: 14100, depth: "Shallow"},
              {online_tool_or_activity: "Website", engagements: 8160, depth: "Mid"},
              {online_tool_or_activity: "Webinar, Active Participants (Slido)", engagements: 824, depth: "Mid"},
              {online_tool_or_activity: "Workshop Attendances", engagements: 53, depth: "Deep"},
              {online_tool_or_activity: "Total", engagements: 23137, depth: ""},
            ],
            caption: "",
          }
        }
      ],
    ],
  },
  {
    name: "explore",
    title: "Visual Usability",
    rows: [
      [
        {
          type: "text", 
          content: [
            "Overall preference (50.91%) for the combination of dark grey floor, logo pattern seats, and logo pattern glass partitions. Opposition to leather seating material – not vegan/ethical, not comfortable, durability concerns.",
            "Glass partitions need to be visible enough for visually impaired people but retain some transparency.",
            "Strong preference for having priority seats differ from standard seats (88.59%) but respondents would like to see a greater contrast or colour difference.",
            "Whilst there was a preference for grey doors, yellow grab poles, and white floor markings, workshop discussions revealed that none of the four options were suitable. Suggestions were made to add contrasting borders to grey doors to make them visually distinct from walls and to use yellow rather than white floor markings.",
            "Door buttons need greater contrast against doors.",
            "Paler lower sidewall colours were preferred (with white preferred slightly more than light grey) to provide contrast with bags under seats and floor. However, respondents recognised that paler sidewalls become dirtier more easily.",
            "Decals on doors indicate the multipurpose space and wheelchair space well (although decals on both doors were suggested), but there were some concerns about the visibility of window decals for multipurpose space, wheelchair space, and priority seats. Suggestions were made for larger and clearer window decals.",
            "Train wrapping (e.g. for advertising, promotion) reduces contrast and legibility of doors etc.",
          ]
        },
        {
          type: "chart", 
          content: {
            title: "Floor, seats, and glass partitions",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Facebook*", "Webinars", "Website /configure" ,"Website /journeys" ,"Average % (mean)" , "Responses Total (%)"],
            datasets: [
              {
                label: "A: light grey, dots, dots",
                backgroundColor: barColours[0],
                data: [26.30, 19.60, 40.00, 33.68, 34.04, 30.79, 31.76,]
              },
              {
                label: "B: green, plain, stripes,",
                backgroundColor: barColours[1],
                data: [32.10, 18.09, 10.00, 18.96, 12.77, 18.30, 21.08,]
              },
              {
                label: "C: dark grey, logo, logo",
                backgroundColor: barColours[2],
                data: [41.60, 62.31, 50.00, 47.36, 53.19, 50.91, 47.16,]
              },
            ],
          },
        },
      ],
      [
        {
          type: "image", 
          content: {
            type: "winning",
            caption: "Most popular choices"
          }
        },
      ],
      [
        {
          type: "chart", 
          content: {
            title: "Doors, grab poles, and floor markings",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Webinars", "Website /configure", "Website /journeys" ,"Average % (mean)" ,"Responses Total (%)"],
            datasets: [
              {
                label: "A: yellow door, metal pole, yellow floor marking",
                backgroundColor: barColours[0],
                data: [17.80, 21.67, 23.20, 15.00, 19.42, 21.97]
              },
              {
                label: "B: grey door, yellow pole, white floor marking",
                backgroundColor: barColours[1],
                data: [35.60, 36.00, 36.02, 66.25, 43.47, 36.37]
              },
              {
                label: "C: yellow door, grey pole, yellow floor marking",
                backgroundColor: barColours[2],
                data: [15.80, 30.00, 16.86, 10.00, 18.16, 16.65]
              },
              {
                label: "D: grey door, metal pole, white floor marking",
                backgroundColor: barColours[3],
                data: [30.80, 12.33, 23.92, 8.75, 18.95, 25.01]
              },
            ],
          },
        },
      ],
      [
        {
          type: "chart", 
          content: {
            title: "Lower Sidewall Colour",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Webinars", "Website /configure" ,"Website /journeys" ,"Average % (mean)", "Responses Total (%)"],
            datasets: [
              {
                label: "A: white",
                backgroundColor: barColours[0],
                data: [20.50,	33.33,	32.90,	84.44,	42.79,	31.52,]
              },
              {
                label: "B: light grey",
                backgroundColor: barColours[1],
                data: [46.80,	60.67,	35.37,	6.67,	37.32,	37.03,]
              },
              {
                label: "C: dark grey",
                backgroundColor: barColours[2],
                data: [32.70,	6.00,	31.73,	8.89,	19.83,	31.45,]
              },
            ],
          }
        },
      ],
    ],
  },
  {
    name: "configure",
    title: "Physical Usability",
    rows: [
      [
        {
          type: "text", 
          content: [
            "Numerous respondents were dissatisfied with the linear seating layout and fewer seats on trains, whilst a smaller number of respondents were positive about the new more open layout.",
            "The open layout of the train prompted respondents to question whether more grab poles are required, including high/horizontal poles, hanging straps, and additional grab handles in the wheelchair space.",
            "Additional armrests were suggested to assist in getting in and out of seats, particularly priority seats.",
            "Preference for the double pole centre grab pole shape (69.25%) across the consultation. Although there were some concerns about obstruction, potential injury risk, and antisocial behaviour for both double pole and ring options,  the double pole was preferred to the ring option.",
            "The sliding step was widely welcomed, some concerns on reliability and maintenance, and whether step is visible when disembarking.",
            "CCTV was generally thought to make trains safer but there were also concerns about whether CCTV is a deterrent and could encourage antisocial behaviour 'for the cameras.'",
            "Opinion was divided over whether the single corridor layout made trains safer with some participants concerned that antisocial behaviour would spread and could not be contained, and other participants positive about the ability to move away from antisocial behaviour mid-journey.",
          ]
        },
        {
          type: "chart", 
          content: {
            title: "Centre Grab Pole Shape",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Webinars", "Website /configure" ,"Website /journeys" ,"Average % (mean)", "Responses Total (%)"],
            datasets: [
              {
                label: "A: single pole",
                backgroundColor: barColours[0],
                data: [13.20,	19.33,	17.17,	31.25,	20.12,	16.26,]
              },
              {
                label: "B: double pole",
                backgroundColor: barColours[1],
                data: [79.10,	73.67,	72.41,	51.70,	69.25,	73.99,]
              },
              {
                label: "C: ring",
                backgroundColor: barColours[2],
                data: [7.70,	7.00,	10.42,	17.05,	10.63,	9.75,]
              },
            ],
          },
        },
      ],
      [
        {
          type: "image", 
          content: {
            type: "pole",
            caption: "Centre grab pole options"
        }
        },
      ],
      [
        {
          type: "chart", 
          content: {
            title: "How much safer CCTV and single corridor makes train",
            stacked: false,
            yLabel: "Responses - number",
            labels: 
              ["1 - no safer", "2", "3", "4", "5 - much safer"],
            datasets: [
              {
                label: "Rating",
                backgroundColor: barColours[0],
                data: [77,52,148,207,311]
              }
            ],
          }
        },
      ],
    ],
  },
  {
    name: "journey",
    title: "Wheeled Mobility",
    rows: [
      [
        {
          type: "text", 
          content: [
            "This section presents findings related to travelling using a wheelchair, and with bicycles, luggage, pushchairs, and children.",
            "Whilst the train was rated highly overall in terms of usability for wheelchair users, workshop discussions and other website comments raised specific usability and accessibility concerns.",
            "Concerns about the ease of moving through a moving train using a wheelchair.",
            "An additional horizontal grab pole was suggested in the wheelchair space for wheelchair users.",
            "An off-centre grab pole was suggested to increase room for manoeuvring wheelchairs and pushchairs.",
            "Poor usability of the call-for-aid and door buttons for wheelchair users.",
            "Suggestion to allow Class II mobility scooters on new trains.",
            "Numerous comments that non-folding bikes should not be allowed on Metro at all, although other comments welcomed provision for carrying bikes.",
            "No clear preference was expressed for the bike rack design option from votes alone with an even split between strap and clamp. However, detailed discussions explored the usability of each option and workshop participants suggested the glass partition should be present whatever bike rack option is chosen.",
            "Clamp (and hook) could be more usable for cyclists but take up more space when not in use and some bikes may not fit.",
            "Strap is more flexible to different and multiple bikes, takes up less space not in use, but could get worn and vandalised.",
            "Questions were raised over whether people would leave luggage in the multipurpose space, and the lack of overhead luggage storage.",
            "Safety concerns were raised about travelling with pushchairs and children – relating to the potential to wander with the open layout and the lack of barriers by doors. Old seating layout preferred for travelling with children.",
            "Concerns about competing priorities for the multipurpose space and the wheelchair space.",
            "Suggestions to mark the location of wheelchair space and multipurpose space doors on platforms (including tactile markers) to avoid conflicts over shared spaces and reduce train dwell times.",
          ]
        },
        {
          type: "chart", 
          content: {
            title: "Bike Racks",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Webinars", "Website /configure" ,"Website /journeys" ,"Average % (mean)", "Responses Total (%)"],
            datasets: [
              {
                label: "A: white",
                backgroundColor: barColours[0],
                data: [30.80,	51.00,	36.21,	59.21,	44.31,	35.55,]
              },
              {
                label: "B: light grey",
                backgroundColor: barColours[1],
                data: [11.90,	5.67,	14.45,	7.89,	9.98,	13.85,]
              },
              {
                label: "C: dark grey",
                backgroundColor: barColours[2],
                data: [57.30,	43.33,	49.34,	32.90,	45.71,	50.60,]
              },
            ],
          },
        },
      ],
      [
        {
          type: "image", 
          content: {
            type: "bike",
            caption: "Bike rack options"
          }
        },
      ],
      [
        {
          type: "chart", 
          content: {
            title: "Safety for Young Children - Journeys",
            stacked: false,
            yLabel: "Responses - number",
            labels: 
              ["1 - no safer", "2", "3", "4", "5 - much safer"],
            datasets: [
              {
                label: "Rating",
                backgroundColor: barColours[0],
                data: [12,18,28,14,9]
              }
            ],
          }
        },
      ],
    ],
  },
  {
    name: "twitter",
    title: "Indicators and Information",
    rows: [
      [
        {
          type: "text", 
          content: [
            "Whilst door opening/closing light and sound indicators were highly rated for clarity, workshop discussions and website comments identified specific concerns.",
            "Flashing door indicator lights are problematic for people with various health conditions including nystagmus and epilepsy.",
            "Suggestion to use door lights to indicate the side of train for disembarkation before arriving at stations.",
            "Door opening/closing sound may be too high pitched for hearing impaired people and too quiet on noisy trains.",
            "Suggestion made to use rotating spindles to indicate door opening/closing for Deaf-blind people.",
            "Polarised discussions of audio announcements with requests to keep announcements short and clear, and suggestions for additional information to be provided.",
            "Deaf and hearing-impaired participants expressed a strong desire for all audio announcements to be provided as text equivalents (such as on passenger information screens (PIS) and destination displays).",
            "Whilst the clarity of PIS was rated highly in the /explore section of the website, persona journey ratings, website comments, and workshop discussions identified concerns.",
            "Visibility of PIS could be improved with larger and clearer text, larger screens, and borders to distinguish PIS from the surrounding black panel.",
            "Locations of PIS in the digital mock-up are poorly visible from the wheelchair space and, generally, when the train is busy. Suggestions were made for locations across from the wheelchair space and in the centre of carriages.",
            "Suggestions were made for additional useful content on PIS, e.g. time to next stop, time to destination.",
          ]
        },
        {
          type: "chart", 
          content: {
            title: "Passenger Information Screens",
            stacked: false,
            yLabel: "Responses - number",
            labels: 
              ["1 - very unclear", "2", "3", "4", "5 - very clear"],
            datasets: [
              {
                label: "Rating",
                backgroundColor: barColours[0],
                data: [134,182,219,251,607]
              }
            ],
          }
        },
      ],
      [
        {
          type: "", 
          content: []
        },
        {
          type: "", 
          content: []
        },
      ],
    ],
  },
  {
    name: "youtube",
    title: "Other Train Features",
    rows: [
      [
        {
          type: "text", 
          content: [
            "Overall preference for North East landmarks being shown on the driver’s cab end wall across the consultation. The quantity and variety of comments and discussions show that this presents a strong opportunity for people across Tyne and Wear to increase their pride and sense of ownership of the new Metro trains.",
            "Uninterrupted connectivity on trains means passengers can alert to and seek assistance for antisocial behaviour.",
            "Some discussion of litter bins, but bins deemed unnecessary.",
            "Air conditioning on trains rather than opening windows was generally welcomed.",
          ]
        },
        {
          type: "chart", 
          content: {
            title: "End Wall Style",
            stacked: true,
            yLabel: "Responses - percent (%)",
            labels: 
              ["Twitter", "Webinars", "Average % (mean)" ,"Responses Total (%)" ],
            datasets: [
              {
                label: "A: Blank",
                backgroundColor: barColours[0],
                data: [8.69,11.00,9.85,8.68,]
              },
              {
                label: "B: Commissioned artwork",
                backgroundColor: barColours[1],
                data: [13.80,11.66,12.51,13.78,]
              },
              {
                label: "C: North East landmarks",
                backgroundColor: barColours[2],
                data: [39.90,64.67,52.28,40.57,]
              },
              {
                label: "D: North East people",
                backgroundColor: barColours[3],
                data: [37.60,4.33,21.18,36.82,]
              },
              {
                label: "E: Something else (not an option on Twitter poll)",
                backgroundColor: barColours[4],
                data: [0.00,8.33,4.17,0.14,]
              },
            ],
          }
        },
      ],
      [
        {
          type: "image", 
          content: {
            type: "endwall",
            caption: "Endwall design options"
          }
        },
      ],
    ],
  },
]