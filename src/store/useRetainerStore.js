import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';
import { rangeAttrs } from '../constants/gameConstants';

const useRetainerStore = create((set, get) => ({
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
    const { gameData } = useGameDataStore.getState();
    const { newRetainer } = get();
    return gameData.MenKe_Now.value.map(newRetainer);
  },

  getRetainer: (retainerIdx) => {
    const { gameData } = useGameDataStore.getState();
    const { newRetainer } = get();
    return newRetainer(gameData.MenKe_Now.value[retainerIdx]);
  },

  setRetainer: (retainerIdx, { age, literature, martial, commerce, art, strategy, reputation, monthlySalary }) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
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
    updateGameData(updatedGameData);
  },

  // Set all retainers to best attributes
  allRetainersBestAttributes: () => {
    const { gameData, updateGameData } = useGameDataStore.getState();
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
    updateGameData(updatedGameData);
  },
}));

export default useRetainerStore;
