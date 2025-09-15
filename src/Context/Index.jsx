import profile01 from "../assets/HomeAssets/Public-Opinion-2.jpg";
import NAMediaHouseImg from "../assets/CategoryAssets/Page-1757413150-1648348521.jpg";
import GovtAppointeesImg from "../assets/CategoryAssets/Page-1753635867-1753078491.jpg";
import MMDAsImg from "../assets/CategoryAssets/Page-1753635845-1366351219.jpg";
import RateJudiciaryImg from "../assets/CategoryAssets/Page-1751832333-160644413.jpg";
import RateGovAppointeesImg from "../assets/CategoryAssets/Page-1751828351-1358149898.jpg";
import RateMinistriesDeptsImg from "../assets/HomeAssets/PollsPublic.jpg";
import PollsPublic from "../assets/HomeAssets/PollsPublic.jpg";

export const RateAndReviewProfiles = [
  { value: profile01, label: "Executive (Presidency)" },
  { value: profile01, label: "Legislature (MPs)" },
  { value: profile01, label: "Judiciary (Judges)" },
  { value: profile01, label: "Ministers" },
  { value: profile01, label: "MCEs & DCEs" },
  { value: profile01, label: "Ministries & Depts" },
  { value: profile01, label: "Agencies & SOEs" },
  { value: profile01, label: "MMDAs" },
  { value: profile01, label: "Govt. Appointees" },
  { value: profile01, label: "CSOs & NGOs" },
  { value: profile01, label: "Policies" },
  { value: profile01, label: "Traditional Authorities" },
  { value: profile01, label: "Religious Authorities" },
  { value: profile01, label: "Businesses" },
  { value: profile01, label: "CEOs" },
  { value: profile01, label: "Media Houses" },
  { value: profile01, label: "Celebrities" },
  { value: profile01, label: "Other" },
];

export const leaderData = [
  {
    name: "Kate Mawusi Babanawo",
    position: "MCE",
    district: "Donkorkrom District",
    region: "Eastern",
    institutionLogo: profile01,
    ratings: {
      overallRating: 3.6,
      vision: 2.0,
      policyImplementation: 5.0,
      accountability: 4.0,
      responsiveness: 3.0,
      resourceManagement: 4.0,
      stakeholderEngagement: 3.0,
      nationalDevelopment: 3.0,
      antiCorruption: 4.0,
      antiGalamsey: 5.0,
      overallPerformance: 3.0,
    },
    tags: [
      "Promotes Peace and Unity",
      "Active in Community Development",
      "Disconnected from the People",
    ],
    questions: [
      { WhatsYourRelationshipWithThisLeader: "Community member" },
      { HasThisLeaderShowFairnessInHandlingIssues: "No" },
      { isThisLeaderApproachable: "Yes" },
      { HasThisLeaderSupportedNewInitiativesOrProgramImprovements: "No" },
      {
        DoesThisLeaderCommunicateMajorPolicyChangesOrUpdatesClearlyToCommunityMembers:
          "Yes",
      },
      {
        HasTheLeaderTakenVisibleStepsToEnforceAndStrengthenSexualHarassmentPreventionPolicies:
          "No",
      },
    ],
    reviews: [
      {
        reviewer: "Anonymous",
        rating: 3.6,
        comment: "Gjdsk. You are gone for a few minutes before",
        date: "2025-07-22",
      },
    ],
  },
];

export const categoryImages = {
  "NA-Media House": NAMediaHouseImg,
  "Govt. Appointees": GovtAppointeesImg,
  MMDAs: MMDAsImg,
  "Agencies & SOEs": MMDAsImg,
  "MCEs & DCEs": GovtAppointeesImg,
  "Member of Parliament": GovtAppointeesImg,
  "Rate- judiciary": RateJudiciaryImg,
  "Rate - Supreme Court Judges": GovtAppointeesImg,
  "Ministers and Deputies": GovtAppointeesImg,
  "Rate- Ministries & Depts": RateMinistriesDeptsImg,
  "Rate- Gov. Appointees": RateGovAppointeesImg,
  "Rate - CSOs &NGOs": GovtAppointeesImg,
  "Rate-Policies": MMDAsImg,
  "Rate Traditional Authorities": RateMinistriesDeptsImg,
  "Rate-  Businesses": RateMinistriesDeptsImg,
  "Rate- Celebrities": RateJudiciaryImg,
  "Rate- Other": RateMinistriesDeptsImg,
};

// Poll.js
export const pollsData = [
  {
    id: 1,
    title: "Approval Rating",
    image: PollsPublic,
    description: "How popular is the government right now?",
    questions: [
      {
        question: "Do you approve the performance of the President?",
        answers: [
          {
            category: "Approve",
            percentage: 66.7,
            count: 2,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 0.0,
            count: 0,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 33.3,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Do you approve the government's economic policies?",
        answers: [
          {
            category: "Approve",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Do you think the government is transparent?",
        answers: [
          {
            category: "Approve",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Which best describes your age?",
        answers: [
          {
            category: "Below 20",
            percentage: 0,
            count: 0,
            color: "bg-green-500",
          },
          {
            category: "21 - 30",
            percentage: 67.7,
            count: 3,
            color: "bg-red-500",
          },
          {
            category: "31 - 40",
            percentage: 33.3,
            count: 5,
            color: "bg-yellow-400",
          },
          {
            category: "41 - 50",
            percentage: 0,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Above 50",
            percentage: 0,
            count: 0,
            color: "bg-red-500",
          },
        ],
      },
      {
        question: "Which best describes your gender?",
        answers: [
          { category: "Male", percentage: 45, count: 9, color: "bg-green-500" },
          {
            category: "Female",
            percentage: 50,
            count: 10,
            color: "bg-red-500",
          },
          {
            category: "Prefer not to answer",
            percentage: 5,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Which best describes your highest level of education?",
        answers: [
          {
            category: "JHS (BECE)",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "SHS (WASCE)",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Training College (Diploma)",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
          {
            category: "University (Bachelors)",
            percentage: 25,
            count: 1,
            color: "bg-blue-400",
          },
          {
            category: "Postgraduate degree",
            percentage: 25,
            count: 1,
            color: "bg-purple-400",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "Favorite Programming Language",
    image: PollsPublic,
    description: "Vote for your favorite programming language.",
    questions: [
      {
        question: "Do you approve the performance of the President?",
        answers: [
          {
            category: "Approve",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Do you approve the government's economic policies?",
        answers: [
          {
            category: "Approve",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Do you think the government is transparent?",
        answers: [
          {
            category: "Approve",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Disapprove",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Neutral",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Which best describes your age?",
        answers: [
          {
            category: "Below 20",
            percentage: 15,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "21 - 30",
            percentage: 35,
            count: 7,
            color: "bg-red-500",
          },
          {
            category: "31 - 40",
            percentage: 25,
            count: 5,
            color: "bg-yellow-400",
          },
          {
            category: "41 - 50",
            percentage: 15,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "Above 50",
            percentage: 10,
            count: 2,
            color: "bg-red-500",
          },
        ],
      },
      {
        question: "Which best describes your gender?",
        answers: [
          { category: "Male", percentage: 45, count: 9, color: "bg-green-500" },
          {
            category: "Female",
            percentage: 50,
            count: 10,
            color: "bg-red-500",
          },
          {
            category: "Prefer not to answer",
            percentage: 5,
            count: 1,
            color: "bg-yellow-400",
          },
        ],
      },
      {
        question: "Which best describes your highest level of education?",
        answers: [
          {
            category: "JHS (BECE)",
            percentage: 50,
            count: 3,
            color: "bg-green-500",
          },
          {
            category: "SHS (WASCE)",
            percentage: 25,
            count: 1,
            color: "bg-red-500",
          },
          {
            category: "Training College (Diploma)",
            percentage: 25,
            count: 1,
            color: "bg-yellow-400",
          },
          {
            category: "University (Bachelors)",
            percentage: 25,
            count: 1,
            color: "bg-blue-400",
          },
          {
            category: "Postgraduate degree",
            percentage: 25,
            count: 1,
            color: "bg-purple-400",
          },
        ],
      },
    ],
  },
];
