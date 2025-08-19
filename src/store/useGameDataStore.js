import { create } from 'zustand';

const maxResourceValues = {
  money: 999_999_999,
  yuanbao: 99_999_999,
  food: 99_999_999,
  vegetables: 99_999_999,
  meat: 99_999_999,
}

const useGameDataStore = create((set, get) => ({
  // Game data state
  gameData: null,
  originalFilename: null,

  // index for finding resources
  idxFood: -1,
  idxVegetables: -1,
  idxMeat: -1,

  // Static data state (could be moved to separate files later)
  clanMembersData: [
    { name: "Zilan Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "Medical", skillValue: 100 },
    { name: "Yier Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "None", skillValue: 100 },
    { name: "Boxun Ma", age: 87, literature: 100, martial: 83.5, commerce: 100, art: 100, strategy: 100, reputation: 100, luck: 100, charm: 83, health: 100, talent: "Martial", talentValue: 100, skill: "None", skillValue: 100 }
  ],

  spousesData: [
    { name: "Lady Chen", age: 45, literature: 95, martial: 15, commerce: 85, art: 90, strategy: 70, reputation: 88, luck: 75, charm: 95, health: 92, talent: "Commerce", talentValue: 88, skill: "Medical", skillValue: 85 },
    { name: "Madam Liu", age: 38, literature: 88, martial: 20, commerce: 78, art: 85, strategy: 65, reputation: 82, luck: 70, charm: 90, health: 85, talent: "Art", talentValue: 85, skill: "None", skillValue: 0 }
  ],

  retainersData: [
    { name: "Jieci Qiang", age: 35, literature: 100, martial: 100, commerce: 100, art: 100, strategy: 100, reputation: 100, monthlySalary: 0 },
    { name: "Retainer Two", age: 28, literature: 90, martial: 95, commerce: 85, art: 80, strategy: 88, reputation: 92, monthlySalary: 50 }
  ],

  // Parse ES3 file data - throws exception on error
  parseES3Data: (fileContent, originalFilename) => {
    const gameData = JSON.parse(fileContent); // Let JSON.parse throw on error

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
    return [{
      money: getMoney(),
      yuanbao: getYuanbao(),
      food: getFood(),
      vegetables: getVegetables(),
      meat: getMeat()
    }];
  },

  // Get current data based on active tab
  getCurrentData: (activeTab) => {
    const { clanMembersData, spousesData, retainersData, getResourcesData } = get();
    switch (activeTab) {
      case 'clanMembers': return clanMembersData;
      case 'spouses': return spousesData;
      case 'retainers': return retainersData;
      case 'resources': return getResourcesData();
      default: return [];
    }
  },

  // Bulk operations
  applySkillToNone: (activeTab, selectedSkill) => {
    const { clanMembersData, spousesData } = get();

    const updateSkills = (data) => data.map(item =>
      item.skill === 'None' ? { ...item, skill: selectedSkill } : item
    );

    if (activeTab === 'clanMembers') {
      set({ clanMembersData: updateSkills(clanMembersData) });
    } else if (activeTab === 'spouses') {
      set({ spousesData: updateSkills(spousesData) });
    }
  },

  maxAllAttributes: (activeTab) => {
    const { clanMembersData, spousesData, retainersData } = get();

    const maxAttributes = (data) => data.map(item => {
      const newItem = { ...item };
      Object.keys(newItem).forEach(key => {
        if (typeof newItem[key] === 'number' && key !== 'age') {
          newItem[key] = 100;
        }
      });
      return newItem;
    });

    if (activeTab === 'clanMembers') {
      set({ clanMembersData: maxAttributes(clanMembersData) });
    } else if (activeTab === 'spouses') {
      set({ spousesData: maxAttributes(spousesData) });
    } else if (activeTab === 'retainers') {
      set({ retainersData: maxAttributes(retainersData) });
    }
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

  // Character data operations
  saveCharacter: (updatedCharacter, editingIndex, activeTab) => {
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

  maxCharacterAttributes: (character) => {
    const newCharacter = { ...character };
    Object.keys(newCharacter).forEach(key => {
      if (typeof newCharacter[key] === 'number' && key !== 'age') {
        newCharacter[key] = 100;
      }
    });
    return newCharacter;
  },

  // Retainer data operations
  saveRetainer: (updatedRetainer, editingIndex) => {
    if (editingIndex >= 0) {
      const { retainersData } = get();
      const updated = [...retainersData];
      updated[editingIndex] = { ...updatedRetainer };
      set({ retainersData: updated });
    }
  },

  maxRetainerAttributes: (retainer) => {
    const newRetainer = { ...retainer };
    Object.keys(newRetainer).forEach(key => {
      if (typeof newRetainer[key] === 'number' && key !== 'age') {
        newRetainer[key] = 100;
      }
    });
    return newRetainer;
  },

  // Resource data operations
  saveResource: (updatedResource, editingIndex) => {
    const { setMoney, setYuanbao, setFood, setVegetables, setMeat } = get();

    if (editingIndex >= 0) {
      // Use the new setter functions for cleaner code
      setMoney(updatedResource.money);
      setYuanbao(updatedResource.yuanbao);
      setFood(updatedResource.food);
      setVegetables(updatedResource.vegetables);
      setMeat(updatedResource.meat);
    }
  }
}));

export default useGameDataStore;
