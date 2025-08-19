import { create } from 'zustand';

const useGameDataStore = create((set, get) => ({
  // Game data state
  gameData: null,
  originalFilename: null,
  
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
  parseES3Data: (fileContent, filename) => {
    const gameData = JSON.parse(fileContent); // Let JSON.parse throw on error
    
    // Store the entire game data and filename
    set({
      gameData: gameData,
      originalFilename: filename
    });
    
    // Log loaded data for debugging using getter functions
    const { getMoney, getYuanbao } = get();
    console.log('Loaded ES3 data:', { 
      money: getMoney(), 
      yuanbao: getYuanbao(), 
      filename 
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
    if (gameData && gameData.CGNum && gameData.CGNum.value) {
      return parseInt(gameData.CGNum.value[0]) || 0;
    }
    return 0;
  },
  
  setMoney: (amount) => {
    const { gameData } = get();
    if (gameData && gameData.CGNum && gameData.CGNum.value) {
      const updatedGameData = structuredClone(gameData);
      updatedGameData.CGNum.value[0] = amount.toString();
      set({ gameData: updatedGameData });
    }
  },
  
  // Yuanbao getter and setter
  getYuanbao: () => {
    const { gameData } = get();
    if (gameData && gameData.CGNum && gameData.CGNum.value) {
      return parseInt(gameData.CGNum.value[1]) || 0;
    }
    return 0;
  },
  
  setYuanbao: (amount) => {
    const { gameData } = get();
    if (gameData && gameData.CGNum && gameData.CGNum.value) {
      const updatedGameData = structuredClone(gameData);
      updatedGameData.CGNum.value[1] = amount.toString();
      set({ gameData: updatedGameData });
    }
  },
  
  // Get resources data from gameData
  getResourcesData: () => {
    const { getMoney, getYuanbao } = get();
    const money = getMoney();
    const yuanbao = getYuanbao();
    
    // For now, return default values for other resources since we haven't mapped them yet
    return [{
      money: money,
      yuanbao: yuanbao,
      food: 93919765,
      vegetables: 85704326,
      meat: 84626507
    }];
  },
  
  // Get current data based on active tab
  getCurrentData: (activeTab) => {
    const { clanMembersData, spousesData, retainersData, getResourcesData } = get();
    switch(activeTab) {
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
    const { clanMembersData, spousesData, retainersData, setMoney, setYuanbao } = get();
    
    if (activeTab === 'resources') {
      // Use the new setter functions for cleaner code
      setMoney(999999999);
      setYuanbao(999999999);
    } else {
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
    }
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
    const { setMoney, setYuanbao } = get();
    
    if (editingIndex >= 0) {
      // Use the new setter functions for cleaner code
      setMoney(updatedResource.money);
      setYuanbao(updatedResource.yuanbao);
    }
  }
}));

export default useGameDataStore;
