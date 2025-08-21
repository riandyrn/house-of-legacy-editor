import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';

export const skillMap = {
  'None': '0',
  'Witch': '1',
  'Medical': '2',
  'Fortune': '3',
  'Divination': '4',
  'Charm': '5',
  'Craft': '6'
}

export const talentMap = {
  'None': '0',
  'Literature': '1',
  'Martial': '2',
  'Commerce': '3',
  'Art': '4'
}

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
}

const useSpouseStore = create((set, get) => ({
  getTalentLabel: (talentId) => {
    let talentLabel = "None";
    switch (talentId) {
      case "1":
        talentLabel = "Literature";
        break
      case "2":
        talentLabel = "Martial";
        break
      case "3":
        talentLabel = "Commerce";
        break
      case "4":
        talentLabel = "Art";
        break
    }
    return talentLabel;
  },

  getSkillLabel: (skillId) => {
    let skillLabel = "None";
    switch (skillId) {
      case "1":
        skillLabel = "Witch";
        break
      case "2":
        skillLabel = "Medical";
        break
      case "3":
        skillLabel = "Fortune";
        break
      case "4":
        skillLabel = "Divination";
        break
      case "5":
        skillLabel = "Charm";
        break
      case "6":
        skillLabel = "Craft";
        break
    }
    return skillLabel;
  },

  newSpouse: (rawRecord, memberIdx) => {
    const { getTalentLabel, getSkillLabel } = get();

    const tokens = rawRecord[2].split("|");
    const name = tokens[0];
    const talentId = tokens[2];
    const talentValue = Number(tokens[3]) || 0;
    const skillId = tokens[6];
    const skillValue = Number(tokens[7]) || 0;

    return {
      name,
      age: Number(rawRecord[5]) || 0,
      literature: Number(rawRecord[6]) || 0,
      martial: Number(rawRecord[7]) || 0,
      commerce: Number(rawRecord[8]) || 0,
      art: Number(rawRecord[9]) || 0,
      strategy: Number(rawRecord[19]) || 0,
      reputation: Number(rawRecord[12]) || 0,
      luck: Number(rawRecord[23]) || 0,
      charm: Number(rawRecord[15]) || 0,
      health: Number(rawRecord[16]) || 0,
      talent: getTalentLabel(talentId),
      talentValue,
      skill: getSkillLabel(skillId),
      skillValue,
      memberIdx,
    }
  },

  getSpousesData: () => {
    const { gameData } = useGameDataStore.getState();
    const { newSpouse } = get();
    return gameData.Member_qu.value.map(newSpouse);
  },

  getSpouse: (spouseIdx) => {
    const { getSpousesData } = get();
    const spouses = getSpousesData();
    return spouses[spouseIdx] || {};
  },

  setSpouse: (spouseIdx, updateData) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    if (updatedGameData.Member_qu.value[spouseIdx]) {
      const rawRecord = updatedGameData.Member_qu.value[spouseIdx];

      // Update basic attributes
      rawRecord[5] = updateData.age?.toString() || rawRecord[5];
      rawRecord[6] = updateData.literature?.toString() || rawRecord[6];
      rawRecord[7] = updateData.martial?.toString() || rawRecord[7];
      rawRecord[8] = updateData.commerce?.toString() || rawRecord[8];
      rawRecord[9] = updateData.art?.toString() || rawRecord[9];
      rawRecord[19] = updateData.strategy?.toString() || rawRecord[19];
      rawRecord[12] = updateData.reputation?.toString() || rawRecord[12];
      rawRecord[23] = updateData.luck?.toString() || rawRecord[23];
      rawRecord[15] = updateData.charm?.toString() || rawRecord[15];
      rawRecord[16] = updateData.health?.toString() || rawRecord[16];

      // Update talent and talent value if provided
      if (updateData.talent !== undefined || updateData.talentValue !== undefined) {
        const tokens = rawRecord[2].split("|");

        if (updateData.talent) {
          tokens[2] = talentMap[updateData.talent] || '0';
        }
        if (updateData.talentValue !== undefined) {
          tokens[3] = updateData.talentValue.toString();
        }

        rawRecord[2] = tokens.join("|");
      }

      if (updateData.skill !== undefined || updateData.skillValue !== undefined) {
        const tokens = rawRecord[2].split("|");

        if (updateData.skill) {
          tokens[6] = skillMap[updateData.skill] || '0';
        }
        if (updateData.skillValue !== undefined) {
          tokens[7] = updateData.skillValue.toString();
        }

        rawRecord[2] = tokens.join("|");
      }

      updatedGameData.Member_qu.value[spouseIdx] = rawRecord;
      updateGameData(updatedGameData);
    }
  },

  // Bulk operations for spouses
  applySpousesSkillToNone: (selectedSkill) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    // Update spouses data
    for (let i = 0; i < updatedGameData.Member_qu.value.length; i++) {
      const rawRecord = updatedGameData.Member_qu.value[i];
      const tokens = rawRecord[2].split("|");

      // Check if current skill is 'None' (ID '0')
      if (tokens[6] === '0') {
        tokens[6] = skillMap[selectedSkill] || '0';
        rawRecord[2] = tokens.join("|");
        updatedGameData.Member_qu.value[i] = rawRecord;
      }
    }

    updateGameData(updatedGameData);
  },

  maxAllSpouseAttributes: () => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    // Update spouses data using correct field indices
    for (let i = 0; i < updatedGameData.Member_qu.value.length; i++) {
      const rawRecord = updatedGameData.Member_qu.value[i];

      // Set all attributes to maximum (don't modify age)
      rawRecord[6] = rangeAttrs.literature[1].toString(); // Maximum literature
      rawRecord[7] = rangeAttrs.martial[1].toString(); // Maximum martial
      rawRecord[8] = rangeAttrs.commerce[1].toString(); // Maximum commerce
      rawRecord[9] = rangeAttrs.art[1].toString(); // Maximum art
      rawRecord[19] = rangeAttrs.strategy[1].toString(); // Maximum strategy
      rawRecord[12] = rangeAttrs.reputation[1].toString(); // Maximum reputation
      rawRecord[23] = rangeAttrs.luck[1].toString(); // Maximum luck
      rawRecord[15] = rangeAttrs.charm[1].toString(); // Maximum charm
      rawRecord[16] = rangeAttrs.health[1].toString(); // Maximum health

      // Update talent value and skill value to maximum
      const tokens = rawRecord[2].split("|"); // Spouses use field [2]
      tokens[3] = rangeAttrs.talentValue[1].toString(); // Maximum talent value
      tokens[7] = rangeAttrs.skillValue[1].toString(); // Maximum skill value
      rawRecord[2] = tokens.join("|");

      updatedGameData.Member_qu.value[i] = rawRecord;
    }

    updateGameData(updatedGameData);
  },
}));

export default useSpouseStore;
