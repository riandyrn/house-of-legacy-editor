import { create } from 'zustand';

const useGameDataStore = create((set, get) => ({
  // Game data state
  gameData: null,
  originalFilename: null,

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
    // Store the entire game data and filename
    set({
      gameData,
      originalFilename,
    });
  },

  // Update game data (used by other stores)
  updateGameData: (updatedGameData) => {
    set({ gameData: updatedGameData });
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
}));

export default useGameDataStore;