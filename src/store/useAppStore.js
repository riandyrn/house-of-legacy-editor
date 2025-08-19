import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // Navigation state
  currentPage: 'upload',
  selectedFile: null,
  
  // Editor state
  activeTab: 'clanMembers',
  selectedSkill: 'Medical',
  
  // Modal state
  showCharacterModal: false,
  showRetainerModal: false,
  showResourceModal: false,
  editingCharacter: {},
  editingRetainer: {},
  editingResource: {},
  editingIndex: -1,
  
  // Data state
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
  
  resourcesData: [
    { money: 278398881, yuanbao: 3400966, food: 93919765, vegetables: 85704326, meat: 84626507 }
  ],
  
  // Navigation actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  
  openEditor: () => {
    const { selectedFile } = get();
    if (selectedFile) {
      set({ currentPage: 'editor' });
    }
  },
  
  goBackToUpload: () => set({ 
    currentPage: 'upload', 
    selectedFile: null 
  }),
  
  // File handling actions
  handleFileSelect: (file) => set({ selectedFile: file }),
  
  // Editor actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSkill: (skill) => set({ selectedSkill: skill }),
  
  // Get current data based on active tab
  getCurrentData: () => {
    const { activeTab, clanMembersData, spousesData, retainersData, resourcesData } = get();
    switch(activeTab) {
      case 'clanMembers': return clanMembersData;
      case 'spouses': return spousesData;
      case 'retainers': return retainersData;
      case 'resources': return resourcesData;
      default: return [];
    }
  },
  
  // Bulk operations
  applySkillToNone: () => {
    const { activeTab, selectedSkill, clanMembersData, spousesData } = get();
    
    const updateSkills = (data) => data.map(item => 
      item.skill === 'None' ? { ...item, skill: selectedSkill } : item
    );
    
    if (activeTab === 'clanMembers') {
      set({ clanMembersData: updateSkills(clanMembersData) });
    } else if (activeTab === 'spouses') {
      set({ spousesData: updateSkills(spousesData) });
    }
  },
  
  maxAllAttributes: () => {
    const { activeTab, clanMembersData, spousesData, retainersData, resourcesData } = get();
    
    if (activeTab === 'resources') {
      const updated = resourcesData.map(item => ({
        ...item,
        money: 999999999,
        yuanbao: 999999999,
        food: 999999999,
        vegetables: 999999999,
        meat: 999999999
      }));
      set({ resourcesData: updated });
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
  
  // Character modal actions
  openCharacterModal: (character, index) => set({
    editingCharacter: { ...character },
    editingIndex: index,
    showCharacterModal: true
  }),
  
  closeCharacterModal: () => set({
    showCharacterModal: false,
    editingCharacter: {},
    editingIndex: -1
  }),
  
  saveCharacter: (updatedCharacter) => {
    const { editingIndex, activeTab, clanMembersData, spousesData } = get();
    
    set({ editingCharacter: updatedCharacter });
    
    if (editingIndex >= 0) {
      if (activeTab === 'clanMembers') {
        const updated = [...clanMembersData];
        updated[editingIndex] = { ...updatedCharacter };
        set({ clanMembersData: updated });
      } else if (activeTab === 'spouses') {
        const updated = [...spousesData];
        updated[editingIndex] = { ...updatedCharacter };
        set({ spousesData: updated });
      }
    }
  },
  
  maxCharacterAttributes: () => {
    const { editingCharacter } = get();
    const newCharacter = { ...editingCharacter };
    Object.keys(newCharacter).forEach(key => {
      if (typeof newCharacter[key] === 'number' && key !== 'age') {
        newCharacter[key] = 100;
      }
    });
    set({ editingCharacter: newCharacter });
  },
  
  // Retainer modal actions
  openRetainerModal: (retainer, index) => set({
    editingRetainer: { ...retainer },
    editingIndex: index,
    showRetainerModal: true
  }),
  
  closeRetainerModal: () => set({
    showRetainerModal: false,
    editingRetainer: {},
    editingIndex: -1
  }),
  
  saveRetainer: (updatedRetainer) => {
    const { editingIndex, retainersData } = get();
    
    set({ editingRetainer: updatedRetainer });
    
    if (editingIndex >= 0) {
      const updated = [...retainersData];
      updated[editingIndex] = { ...updatedRetainer };
      set({ retainersData: updated });
    }
  },
  
  maxRetainerAttributes: () => {
    const { editingRetainer } = get();
    const newRetainer = { ...editingRetainer };
    Object.keys(newRetainer).forEach(key => {
      if (typeof newRetainer[key] === 'number' && key !== 'age') {
        newRetainer[key] = 100;
      }
    });
    set({ editingRetainer: newRetainer });
  },
  
  // Resource modal actions
  openResourceModal: (resource, index) => set({
    editingResource: { ...resource },
    editingIndex: index,
    showResourceModal: true
  }),
  
  closeResourceModal: () => set({
    showResourceModal: false,
    editingResource: {},
    editingIndex: -1
  }),
  
  saveResource: (updatedResource) => {
    const { editingIndex, resourcesData } = get();
    
    set({ editingResource: updatedResource });
    
    if (editingIndex >= 0) {
      const updated = [...resourcesData];
      updated[editingIndex] = { ...updatedResource };
      set({ resourcesData: updated });
    }
  }
}));

export default useAppStore;
