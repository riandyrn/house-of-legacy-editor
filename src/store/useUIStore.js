import { create } from 'zustand';

const useUIStore = create((set) => ({
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
  editingIndex: -1,
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
  
  updateEditingCharacter: (character) => set({
    editingCharacter: character
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
