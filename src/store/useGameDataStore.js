import { create } from 'zustand';

export const maxResourceValues = {
  money: 999_999_999,
  yuanbao: 99_999_999,
  food: 99_999_999,
  vegetables: 99_999_999,
  meat: 99_999_999,
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

const useGameDataStore = create((set, get) => ({
  // Game data state
  gameData: null,
  originalFilename: null,

  // index for finding resources
  idxFood: -1,
  idxVegetables: -1,
  idxMeat: -1,

  // Parse ES3 file data - throws exception on error
  parseES3Data: (fileContent, originalFilename) => {
    const gameData = JSON.parse(fileContent); // Let JSON.parse throw on error

    // validate money & yuanbao fields
    if (!gameData.CGNum || !gameData.CGNum.value || !Array.isArray(gameData.CGNum.value)) {
      throw new Error("money & yuanbao not found");
    }
    // validate props
    if (!gameData.Prop_have || !gameData.Prop_have.value || !Array.isArray(gameData.Prop_have.value)) {
      throw new Error("props not found");
    }
    // validate retainers field
    if (!gameData.MenKe_Now || !gameData.MenKe_Now.value || !Array.isArray(gameData.MenKe_Now.value)) {
      throw new Error("retainers field not found");
    }
    // validate spouses field
    if (!gameData.Member_qu || !gameData.Member_qu.value || !Array.isArray(gameData.Member_qu.value)) {
      throw new Error("spouses field not found");
    }
    // validate clan members field
    if (!gameData.Member_now || !gameData.Member_now.value || !Array.isArray(gameData.Member_now.value)) {
      throw new Error("clan members field not found");
    }

    // find index storage for food, vegetables, meat
    const props = gameData.Prop_have.value;
    let idxFood, idxVegetables, idxMeat;
    for (let i = 0; i < props.length; i++) {
      const [id, _] = props[i];
      switch (id) {
        case "2":
          idxFood = i;
          break
        case "3":
          idxVegetables = i;
          break
        case "4":
          idxMeat = i;
          break
      }
    }

    // hande if food record is not found, we will just create it
    if(idxFood === undefined) {
      gameData.Prop_have.value.push(["2", "0"]);
      idxFood = gameData.Prop_have.value.length - 1;
    }

    // handle if vegetable record is not found, we will just create it
    if (idxVegetables === undefined) {
      gameData.Prop_have.value.push(["3", "0"]);
      idxVegetables = gameData.Prop_have.value.length - 1;
    }

    // handle if meat record is not found, we will just create it
    if (idxMeat === undefined) {
      gameData.Prop_have.value.push(["4", "0"]);
      idxMeat = gameData.Prop_have.value.length - 1;
    }

    // Store the entire game data and filename
    set({
      gameData,
      originalFilename,
      idxFood,
      idxVegetables,
      idxMeat,
    });
  },

  // Save file functionality
  saveToFile: () => {
    const { gameData, originalFilename } = get();
    if (gameData && originalFilename) {
      const jsonString = JSON.stringify(gameData);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = originalFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('File saved:', originalFilename);
    }
  },

  // Money getter and setter
  getMoney: () => {
    const { gameData } = get();
    return parseInt(gameData.CGNum.value[0]) || 0;
  },

  setMoney: (amount) => {
    const { gameData } = get();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.CGNum.value[0] = amount.toString();
    set({ gameData: updatedGameData });
  },

  // Yuanbao getter and setter
  getYuanbao: () => {
    const { gameData } = get();
    return parseInt(gameData.CGNum.value[1]) || 0;
  },

  setYuanbao: (amount) => {
    const { gameData } = get();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.CGNum.value[1] = amount.toString();
    set({ gameData: updatedGameData });
  },

  // Food getter and setter
  getFood: () => {
    const { gameData, idxFood } = get();
    return parseInt(gameData.Prop_have.value[idxFood][1]) || 0;
  },

  setFood: (amount) => {
    const { gameData, idxFood } = get();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxFood][1] = amount.toString();
    set({ gameData: updatedGameData });
  },

  // Vegetables getter and setter
  getVegetables: () => {
    const { gameData, idxVegetables } = get();
    return parseInt(gameData.Prop_have.value[idxVegetables][1]) || 0;
  },

  setVegetables: (amount) => {
    const { gameData, idxVegetables } = get();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxVegetables][1] = amount.toString();
    set({ gameData: updatedGameData });
  },

  // Meat getter and setter
  getMeat: () => {
    const { gameData, idxMeat } = get();
    return parseInt(gameData.Prop_have.value[idxMeat][1]) || 0;
  },

  setMeat: (amount) => {
    const { gameData, idxMeat } = get();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxMeat][1] = amount.toString();
    set({ gameData: updatedGameData });
  },

  // Get resources data from gameData
  getResourcesData: () => {
    const { getMoney, getYuanbao, getFood, getVegetables, getMeat } = get();
    return {
      money: getMoney(),
      yuanbao: getYuanbao(),
      food: getFood(),
      vegetables: getVegetables(),
      meat: getMeat()
    };
  },

  newRetainer: (rawRecord, retainerIdx) => {
    return {
      name: rawRecord[2].split("|")[0],
      age: Number(rawRecord[3]) || 0,
      literature: Number(rawRecord[4]) || 0,
      martial: Number(rawRecord[5]) || 0,
      commerce: Number(rawRecord[6]) || 0,
      art: Number(rawRecord[7]) || 0,
      strategy: Number(rawRecord[15]) || 0,
      reputation: Number(rawRecord[11]) || 0,
      monthlySalary: Number(rawRecord[18]) || 0,
      retainerIdx,
    }
  },

  getRetainersData: () => {
    /**
     * We need to return data with the following format:
     * 
     *    retainersData: [
            { name: "Jieci Qiang", age: 35, literature: 100, martial: 100, commerce: 100, art: 100, strategy: 100, reputation: 100, monthlySalary: 0, retainerIdx: 0 },
            { name: "Retainer Two", age: 28, literature: 90, martial: 95, commerce: 85, art: 80, strategy: 88, reputation: 92, monthlySalary: 50, retainerIdx: 1 }
          ]
     */
    const { gameData, newRetainer } = get();
    return gameData.MenKe_Now.value.map(newRetainer);
  },

  getRetainer: (retainerIdx) => {
    const { gameData, newRetainer } = get();
    return newRetainer(gameData.MenKe_Now.value[retainerIdx]);
  },

  setRetainer: (retainerIdx, { age, literature, martial, commerce, art, strategy, reputation, monthlySalary }) => {
    const { gameData } = get();
    const updatedGameData = structuredClone(gameData);

    const rawRecord = updatedGameData.MenKe_Now.value[retainerIdx];
    rawRecord[3] = age.toString();
    rawRecord[4] = literature.toString();
    rawRecord[5] = martial.toString();
    rawRecord[6] = commerce.toString();
    rawRecord[7] = art.toString();
    rawRecord[15] = strategy.toString();
    rawRecord[11] = reputation.toString();
    rawRecord[18] = monthlySalary.toString();

    updatedGameData.MenKe_Now.value[retainerIdx] = rawRecord;
    set({ gameData: updatedGameData });
  },

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
    /**
     * We need to return data with the following format for clan members:
     * 
     *   clanMembersData: [
           { name: "Zilan Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "Medical", skillValue: 100, memberIdx: 0 },
           ...
         ]
     */
    // TODO: Create a proper newClanMember function for clan members data structure
    const { gameData, newClanMember } = get();
    return gameData.Member_now.value.map(newClanMember);
  },

  getSpousesData: () => {
    /**
     * We need to return data with the following format:
     * 
     *   spousesData: [
           { name: "Lady Chen", age: 45, literature: 95, martial: 15, commerce: 85, art: 90, strategy: 70, reputation: 88, luck: 75, charm: 95, health: 92, talent: "Commerce", talentValue: 88, skill: "Medical", skillValue: 85, memberIdx: 0 },
           { name: "Madam Liu", age: 38, literature: 88, martial: 20, commerce: 78, art: 85, strategy: 65, reputation: 82, luck: 70, charm: 90, health: 85, talent: "Art", talentValue: 85, skill: "None", skillValue: 0, memberIdx: 1 }
         ]
     */
    const { gameData, newSpouse } = get();
    return gameData.Member_qu.value.map(newSpouse);
  },

  getClanMember: (memberIdx) => {
    const { getClanMembersData } = get();
    const clanMembers = getClanMembersData();
    return clanMembers[memberIdx] || {};
  },

  getSpouse: (spouseIdx) => {
    const { getSpousesData } = get();
    const spouses = getSpousesData();
    return spouses[spouseIdx] || {};
  },

  setClanMember: (memberIdx, updateData) => {
    const { gameData } = get();
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
      set({ gameData: updatedGameData });
    }
  },

  setSpouse: (spouseIdx, updateData) => {
    const { gameData } = get();
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
      set({ gameData: updatedGameData });
    }
  },


  // Get current data based on active tab
  getCurrentData: (activeTab) => {
    const { getClanMembersData, getSpousesData, getRetainersData, getResourcesData } = get();
    switch (activeTab) {
      case 'clanMembers': return getClanMembersData();
      case 'spouses': return getSpousesData();
      case 'retainers': return getRetainersData();
      case 'resources': return [getResourcesData()]; // Wrap in array for consistency
      default: return [];
    }
  },

  // Bulk operations
  applyClanMembersSkillToNone: (selectedSkill) => {
    const { gameData } = get();
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

    set({ gameData: updatedGameData });
  },

  applySpousesSkillToNone: (selectedSkill) => {
    const { gameData } = get();
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

    set({ gameData: updatedGameData });
  },

  applySkillToNone: (activeTab, selectedSkill) => {
    const { applyClanMembersSkillToNone, applySpousesSkillToNone } = get();

    if (activeTab === 'clanMembers') {
      applyClanMembersSkillToNone(selectedSkill);
    } else if (activeTab === 'spouses') {
      applySpousesSkillToNone(selectedSkill);
    }
  },

  maxAllAttributes: (activeTab) => {
    const { gameData } = get();
    const updatedGameData = structuredClone(gameData);

    if (activeTab === 'clanMembers') {
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
    } else if (activeTab === 'spouses') {
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
    }

    set({ gameData: updatedGameData });
  },

  maxAllResources: () => {
    const { setMoney, setYuanbao, setFood, setVegetables, setMeat } = get();

    // Set all resources to their maximum values
    setMoney(maxResourceValues.money);
    setYuanbao(maxResourceValues.yuanbao);
    setFood(maxResourceValues.food);
    setVegetables(maxResourceValues.vegetables);
    setMeat(maxResourceValues.meat);
  },

  allRetainersBestAttributes: () => {
    const { gameData } = get();
    const updatedGameData = structuredClone(gameData);

    for (let i = 0; i < updatedGameData.MenKe_Now.value.length; i++) {
      const rawRecord = updatedGameData.MenKe_Now.value[i];
      rawRecord[3] = rangeAttrs.age[0].toString(); // Minimum age (youngest)
      rawRecord[4] = rangeAttrs.literature[1].toString(); // Maximum literature
      rawRecord[5] = rangeAttrs.martial[1].toString(); // Maximum martial
      rawRecord[6] = rangeAttrs.commerce[1].toString(); // Maximum commerce
      rawRecord[7] = rangeAttrs.art[1].toString(); // Maximum art
      rawRecord[15] = rangeAttrs.strategy[1].toString(); // Maximum strategy
      rawRecord[11] = rangeAttrs.reputation[1].toString(); // Maximum reputation
      rawRecord[18] = rangeAttrs.monthlySalary[0].toString(); // Minimum salary (lowest cost)

      updatedGameData.MenKe_Now.value[i] = rawRecord;
    }
    set({ gameData: updatedGameData });
  },

  // Character data operations
  saveClanMember: (updatedCharacter, editingIndex, activeTab) => {
    if (editingIndex >= 0) {
      if (activeTab === 'clanMembers') {
        const { clanMembersData } = get();
        const updated = [...clanMembersData];
        updated[editingIndex] = { ...updatedCharacter };
        set({ clanMembersData: updated });
      } else if (activeTab === 'spouses') {
        const { spousesData } = get();
        const updated = [...spousesData];
        updated[editingIndex] = { ...updatedCharacter };
        set({ spousesData: updated });
      }
    }
  },

  maxClanMemberAttributes: (character) => {
    const newCharacter = { ...character };
    Object.keys(newCharacter).forEach(key => {
      if (typeof newCharacter[key] === 'number' && key !== 'age') {
        newCharacter[key] = 100;
      }
    });
    return newCharacter;
  },

  // Resource data operations
  saveResource: (updatedResource) => {
    const { setMoney, setYuanbao, setFood, setVegetables, setMeat } = get();

    // Use the new setter functions for cleaner code
    setMoney(updatedResource.money);
    setYuanbao(updatedResource.yuanbao);
    setFood(updatedResource.food);
    setVegetables(updatedResource.vegetables);
    setMeat(updatedResource.meat);
  }
}));

export default useGameDataStore;
