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
  editingRetainer: {},
  editingResource: {},
  editingIndex: -1,
  
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
  
  updateEditingRetainer: (retainer) => set({
    editingRetainer: retainer
  }),
  
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
  
  updateEditingResource: (resource) => set({
    editingResource: resource
  })
}));

export default useUIStore;
