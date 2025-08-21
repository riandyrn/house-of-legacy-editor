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

const useClanMemberStore = create((set, get) => ({
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

  newClanMember: (rawRecord, memberIdx) => {
    const { getTalentLabel, getSkillLabel } = get();

    const tokens = rawRecord[4].split("|");
    const name = tokens[0];
    const talentId = tokens[2];
    const talentValue = Number(tokens[3]) || 0;
    const skillId = tokens[6];
    const skillValue = Number(tokens[7]) || 0;

    return {
      name,
      age: Number(rawRecord[6]) || 0,
      literature: Number(rawRecord[7]) || 0,
      martial: Number(rawRecord[8]) || 0,
      commerce: Number(rawRecord[9]) || 0,
      art: Number(rawRecord[10]) || 0,
      strategy: Number(rawRecord[27]) || 0,
      reputation: Number(rawRecord[16]) || 0,
      luck: Number(rawRecord[33]) || 0,
      charm: Number(rawRecord[20]) || 0,
      health: Number(rawRecord[21]) || 0,
      talent: getTalentLabel(talentId),
      talentValue,
      skill: getSkillLabel(skillId),
      skillValue,
      memberIdx,
    }
  },

  getClanMembersData: () => {
    const { gameData } = useGameDataStore.getState();
    const { newClanMember } = get();
    return gameData.Member_now.value.map(newClanMember);
  },

  getClanMember: (memberIdx) => {
    const { getClanMembersData } = get();
    const clanMembers = getClanMembersData();
    return clanMembers[memberIdx] || {};
  },

  setClanMember: (memberIdx, updateData) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    if (updatedGameData.Member_now.value[memberIdx]) {
      const rawRecord = updatedGameData.Member_now.value[memberIdx];

      // Update basic attributes using clan member field indices
      rawRecord[6] = updateData.age?.toString() || rawRecord[6];
      rawRecord[7] = updateData.literature?.toString() || rawRecord[7];
      rawRecord[8] = updateData.martial?.toString() || rawRecord[8];
      rawRecord[9] = updateData.commerce?.toString() || rawRecord[9];
      rawRecord[10] = updateData.art?.toString() || rawRecord[10];
      rawRecord[27] = updateData.strategy?.toString() || rawRecord[27];
      rawRecord[16] = updateData.reputation?.toString() || rawRecord[16];
      rawRecord[33] = updateData.luck?.toString() || rawRecord[33];
      rawRecord[20] = updateData.charm?.toString() || rawRecord[20];
      rawRecord[21] = updateData.health?.toString() || rawRecord[21];

      // Update talent and talent value if provided
      if (updateData.talent !== undefined || updateData.talentValue !== undefined) {
        const tokens = rawRecord[4].split("|"); // Clan members use field [4]

        if (updateData.talent) {
          tokens[2] = talentMap[updateData.talent] || '0';
        }
        if (updateData.talentValue !== undefined) {
          tokens[3] = updateData.talentValue.toString();
        }

        rawRecord[4] = tokens.join("|");
      }

      if (updateData.skill !== undefined || updateData.skillValue !== undefined) {
        const tokens = rawRecord[4].split("|"); // Clan members use field [4]

        if (updateData.skill) {
          tokens[6] = skillMap[updateData.skill] || '0';
        }
        if (updateData.skillValue !== undefined) {
          tokens[7] = updateData.skillValue.toString();
        }

        rawRecord[4] = tokens.join("|");
      }

      updatedGameData.Member_now.value[memberIdx] = rawRecord;
      updateGameData(updatedGameData);
    }
  },

  // Bulk operations for clan members
  applyClanMembersSkillToNone: (selectedSkill) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    // Update clan members data
    for (let i = 0; i < updatedGameData.Member_now.value.length; i++) {
      const rawRecord = updatedGameData.Member_now.value[i];
      const tokens = rawRecord[4].split("|"); // Clan members use field [4] not [2]

      // Check if current skill is 'None' (ID '0')
      if (tokens[6] === '0') {
        tokens[6] = skillMap[selectedSkill] || '0';
        rawRecord[4] = tokens.join("|");
        updatedGameData.Member_now.value[i] = rawRecord;
      }
    }

    updateGameData(updatedGameData);
  },

  maxAllClanMemberAttributes: () => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);

    // Update clan members data using correct field indices
    for (let i = 0; i < updatedGameData.Member_now.value.length; i++) {
      const rawRecord = updatedGameData.Member_now.value[i];

      // Set all attributes to maximum (don't modify age)
      rawRecord[7] = rangeAttrs.literature[1].toString(); // Maximum literature
      rawRecord[8] = rangeAttrs.martial[1].toString(); // Maximum martial
      rawRecord[9] = rangeAttrs.commerce[1].toString(); // Maximum commerce
      rawRecord[10] = rangeAttrs.art[1].toString(); // Maximum art
      rawRecord[27] = rangeAttrs.strategy[1].toString(); // Maximum strategy
      rawRecord[16] = rangeAttrs.reputation[1].toString(); // Maximum reputation
      rawRecord[33] = rangeAttrs.luck[1].toString(); // Maximum luck
      rawRecord[20] = rangeAttrs.charm[1].toString(); // Maximum charm
      rawRecord[21] = rangeAttrs.health[1].toString(); // Maximum health

      // Update talent value and skill value to maximum
      const tokens = rawRecord[4].split("|"); // Clan members use field [4]
      tokens[3] = rangeAttrs.talentValue[1].toString(); // Maximum talent value
      tokens[7] = rangeAttrs.skillValue[1].toString(); // Maximum skill value
      rawRecord[4] = tokens.join("|");

      updatedGameData.Member_now.value[i] = rawRecord;
    }

    updateGameData(updatedGameData);
  },

  // Character data operations (legacy compatibility)
  maxClanMemberAttributes: (character) => {
    const newCharacter = { ...character };
    Object.keys(newCharacter).forEach(key => {
      if (typeof newCharacter[key] === 'number' && key !== 'age') {
        newCharacter[key] = 100;
      }
    });
    return newCharacter;
  },
}));

export default useClanMemberStore;
