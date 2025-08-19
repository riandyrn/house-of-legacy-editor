import { create } from 'zustand';

const useUIStore = create((set) => ({
  // Navigation state
  currentPage: 'upload',
  selectedFile: null,
  
  // Editor state
  activeTab: 'clanMembers',
  selectedSkill: 'Medical',
  
  // Modal state
  showClanMemberModal: false,
  showSpouseModal: false,
  showRetainerModal: false,
  showResourceModal: false,

  currentClanMemberIdx: -1,
  currentSpouseIdx: -1,
  currentRetainerIdx: -1,
  
  // Error state
  showErrorDialog: false,
  errorMessage: '',
  
  // Navigation actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  
  goBackToUpload: () => set({ 
    currentPage: 'upload', 
    selectedFile: null 
  }),
  
  // Editor actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSkill: (skill) => set({ selectedSkill: skill }),
  
  // Error dialog actions
  showError: (message) => set({ 
    showErrorDialog: true, 
    errorMessage: message 
  }),
  
  closeErrorDialog: () => set({ 
    showErrorDialog: false, 
    errorMessage: '' 
  }),
  
  // Clan member modal actions
  openClanMemberModal: (index) => set({
    currentClanMemberIdx: index,
    showClanMemberModal: true
  }),
  
  closeClanMemberModal: () => set({
    showClanMemberModal: false,
    currentClanMemberIdx: -1
  }),
  

  
  // Spouse modal actions
  openSpouseModal: (spouseIdx) => set({
    currentSpouseIdx: spouseIdx,
    showSpouseModal: true
  }),
  
  closeSpouseModal: () => set({
    showSpouseModal: false,
    currentSpouseIdx: -1
  }),
  
  // Retainer modal actions
  openRetainerModal: (retainerIdx) => {
    set({
      currentRetainerIdx: retainerIdx,
      showRetainerModal: true
    });
  },
  
  closeRetainerModal: () => set({
    showRetainerModal: false,
    currentRetainerIdx: -1
  }),
  
  // Resource modal actions
  openResourceModal: () => set({
    showResourceModal: true
  }),
  
  closeResourceModal: () => set({
    showResourceModal: false
  })
}));

export default useUIStore;
