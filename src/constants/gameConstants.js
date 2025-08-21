// Global constants for the House of Legacy Editor
// These constants are used across multiple stores and components

export const skillMap = {
  'None': '0',
  'Witch': '1',
  'Medical': '2',
  'Fortune': '3',
  'Divination': '4',
  'Charm': '5',
  'Craft': '6'
};

export const talentMap = {
  'None': '0',
  'Literature': '1',
  'Martial': '2',
  'Commerce': '3',
  'Art': '4'
};

export const rangeAttrs = {
  age: [18, 100],
  literature: [0, 100],
  martial: [0, 100],
  commerce: [0, 100],
  art: [0, 100],
  strategy: [0, 100],
  reputation: [0, 100],
  luck: [0, 100],
  charm: [0, 100],
  health: [0, 100],
  talentValue: [0, 100],
  skillValue: [0, 100],
  monthlySalary: [0, 9999],
};

export const maxResourceValues = {
  money: 999_999_999,
  yuanbao: 99_999_999,
  food: 99_999_999,
  vegetables: 99_999_999,
  meat: 99_999_999,
};

// Helper functions for converting IDs to labels
export const getTalentLabel = (talentId) => {
  switch (talentId) {
    case "1":
      return "Literature";
    case "2":
      return "Martial";
    case "3":
      return "Commerce";
    case "4":
      return "Art";
    default:
      return "None";
  }
};

export const getSkillLabel = (skillId) => {
  switch (skillId) {
    case "1":
      return "Witch";
    case "2":
      return "Medical";
    case "3":
      return "Fortune";
    case "4":
      return "Divination";
    case "5":
      return "Charm";
    case "6":
      return "Craft";
    default:
      return "None";
  }
};
