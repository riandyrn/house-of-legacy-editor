import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';
import { 
  skillMap, 
  talentMap, 
  rangeAttrs,
  getTalentLabel,
  getSkillLabel
} from '../constants/gameConstants';

const useSpouseStore = create((set, get) => ({
  newSpouse: (rawRecord, memberIdx) => {
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
