import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';
import { maxResourceValues } from '../constants/gameConstants';

const useResourceStore = create((set, get) => ({
  // Reactive state
  resources: {
    money: 0,
    yuanbao: 0,
    food: 0,
    vegetables: 0,
    meat: 0
  },

  // Sync from gameData
  syncFromGameData: () => {
    const { gameData, idxFood, idxVegetables, idxMeat } = useGameDataStore.getState();
    if (gameData) {
      const resources = {
        money: parseInt(gameData.CGNum.value[0]) || 0,
        yuanbao: parseInt(gameData.CGNum.value[1]) || 0,
        food: parseInt(gameData.Prop_have.value[idxFood][1]) || 0,
        vegetables: parseInt(gameData.Prop_have.value[idxVegetables][1]) || 0,
        meat: parseInt(gameData.Prop_have.value[idxMeat][1]) || 0
      };
      set({ resources });
    }
  },

  // Resource getters and setters
  getMoney: () => {
    const { gameData } = useGameDataStore.getState();
    return parseInt(gameData.CGNum.value[0]) || 0;
  },

  setMoney: (amount) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.CGNum.value[0] = amount.toString();
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
  },

  getYuanbao: () => {
    const { gameData } = useGameDataStore.getState();
    return parseInt(gameData.CGNum.value[1]) || 0;
  },

  setYuanbao: (amount) => {
    const { gameData, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.CGNum.value[1] = amount.toString();
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
  },

  getFood: () => {
    const { gameData, idxFood } = useGameDataStore.getState();
    return parseInt(gameData.Prop_have.value[idxFood][1]) || 0;
  },

  setFood: (amount) => {
    const { gameData, idxFood, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxFood][1] = amount.toString();
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
  },

  getVegetables: () => {
    const { gameData, idxVegetables } = useGameDataStore.getState();
    return parseInt(gameData.Prop_have.value[idxVegetables][1]) || 0;
  },

  setVegetables: (amount) => {
    const { gameData, idxVegetables, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxVegetables][1] = amount.toString();
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
  },

  getMeat: () => {
    const { gameData, idxMeat } = useGameDataStore.getState();
    return parseInt(gameData.Prop_have.value[idxMeat][1]) || 0;
  },

  setMeat: (amount) => {
    const { gameData, idxMeat, updateGameData } = useGameDataStore.getState();
    const updatedGameData = structuredClone(gameData);
    updatedGameData.Prop_have.value[idxMeat][1] = amount.toString();
    updateGameData(updatedGameData);
    // Trigger sync after update
    get().syncFromGameData();
  },

  // Get all resources data (reactive)
  getResourcesData: () => get().resources,

  // Save resource data
  saveResource: (updatedResource) => {
    const { setMoney, setYuanbao, setFood, setVegetables, setMeat } = get();
    setMoney(updatedResource.money);
    setYuanbao(updatedResource.yuanbao);
    setFood(updatedResource.food);
    setVegetables(updatedResource.vegetables);
    setMeat(updatedResource.meat);
  },

  // Max all resources
  maxAllResources: () => {
    const { setMoney, setYuanbao, setFood, setVegetables, setMeat } = get();
    setMoney(maxResourceValues.money);
    setYuanbao(maxResourceValues.yuanbao);
    setFood(maxResourceValues.food);
    setVegetables(maxResourceValues.vegetables);
    setMeat(maxResourceValues.meat);
  },
}));

export default useResourceStore;
