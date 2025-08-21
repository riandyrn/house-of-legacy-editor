import { create } from 'zustand';
import useGameDataStore from './useGameDataStore';
import { maxResourceValues } from '../constants/gameConstants';

const useResourceStore = create((set, get) => ({
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
  },

  // Get all resources data
  getResourcesData: () => {
    const { getMoney, getYuanbao, getFood, getVegetables, getMeat } = get();
    return {
      money: getMoney(),
      yuanbao: getYuanbao(),
      food: getFood(),
      vegetables: getVegetables(),
      meat: getMeat()
    };
  },

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
