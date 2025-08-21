import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';
import { 
  skillMap, 
  talentMap, 
  rangeAttrs,
  getTalentLabel,
  getSkillLabel
} from '../constants/gameConstants';

const useClanMemberStore = create((set, get) => ({
  // Reactive state
  clanMembers: [],
  
  newClanMember: (rawRecord, memberIdx) => {
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

  // Sync from gameData
  syncFromGameData: () => {
    const { gameData } = useGameDataStore.getState();
    const { newClanMember } = get();
    if (gameData?.Member_now?.value) {
      const clanMembers = gameData.Member_now.value.map((rawRecord, index) => 
        newClanMember(rawRecord, index)
      );
      set({ clanMembers });
    }
  },
  
  // Get clan members data (reactive)
  getClanMembersData: () => get().clanMembers,

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
      // Trigger sync after update
      get().syncFromGameData();
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

    // Update game data
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
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

    // Update game data
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
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
