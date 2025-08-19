import useUIStore from './useUIStore';
import useGameDataStore from './useGameDataStore';

// Main store that combines UI and game data stores for easier component usage
const useAppStore = () => {
  const uiStore = useUIStore();
  const gameDataStore = useGameDataStore();
  
  return {
    // UI Store properties
    ...uiStore,
    
    // Game Data Store properties
    ...gameDataStore,
    
    // Combined actions that need both stores
    openEditor: () => {
      const { selectedFile } = uiStore;
      const { parseES3Data } = gameDataStore;
      const { showError, setCurrentPage } = uiStore;
      
      if (selectedFile) {
        // Read the file content and parse it
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target.result;
          try {
            parseES3Data(fileContent, selectedFile.name);
            setCurrentPage('editor');
          } catch (error) {
            console.error('Error parsing ES3 file:', error);
            showError(`Failed to parse ${selectedFile.name}\n\nThe selected file is not a valid ES3 save file or is corrupted. Please make sure you've selected the correct GameData.es3 file from your House of Legacy save directory.`);
          }
        };
        reader.readAsText(selectedFile);
      }
    },
    
    // File handling actions
    handleFileSelect: (file) => uiStore.setSelectedFile(file),
    
    // Get current data based on active tab
    getCurrentData: () => {
      return gameDataStore.getCurrentData(uiStore.activeTab);
    },
    
    // Bulk operations with UI state
    applySkillToNone: () => {
      gameDataStore.applySkillToNone(uiStore.activeTab, uiStore.selectedSkill);
    },
    
    maxAllAttributes: () => {
      gameDataStore.maxAllAttributes(uiStore.activeTab);
    },
    
    // Character operations with UI state
    saveCharacter: (updatedCharacter) => {
      uiStore.updateEditingCharacter(updatedCharacter);
      gameDataStore.saveCharacter(updatedCharacter, uiStore.editingIndex, uiStore.activeTab);
    },
    
    maxCharacterAttributes: () => {
      const maxedCharacter = gameDataStore.maxCharacterAttributes(uiStore.editingCharacter);
      uiStore.updateEditingCharacter(maxedCharacter);
    },
    
    // Retainer operations with UI state
    saveRetainer: (updatedRetainer) => {
      uiStore.updateEditingRetainer(updatedRetainer);
      gameDataStore.saveRetainer(updatedRetainer, uiStore.editingIndex);
    },
    
    maxRetainerAttributes: () => {
      const maxedRetainer = gameDataStore.maxRetainerAttributes(uiStore.editingRetainer);
      uiStore.updateEditingRetainer(maxedRetainer);
    },
    
    // Resource operations with UI state
    saveResource: (updatedResource) => {
      uiStore.updateEditingResource(updatedResource);
      gameDataStore.saveResource(updatedResource, uiStore.editingIndex);
    }
  };
};

export default useAppStore;