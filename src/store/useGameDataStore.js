import { create } from 'zustand';

const useGameDataStore = create((set, get) => ({
  // Game data state
  gameData: null,
  originalFilename: null,

  // index for finding resources (needed for resource store)
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