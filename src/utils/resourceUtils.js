import { maxResourceValues } from '../constants/gameConstants';

class ResourceUtils {
  constructor(gameData) {
    this.gameData = gameData;
  }

  // Get money
  getMoney() {
    return parseInt(this.gameData.CGNum.value[0]) || 0;
  }

  // Set money
  setMoney(amount) {
    const updatedGameData = structuredClone(this.gameData);
    updatedGameData.CGNum.value[0] = amount.toString();
    return updatedGameData;
  }

  // Get yuanbao
  getYuanbao() {
    return parseInt(this.gameData.CGNum.value[1]) || 0;
  }

  // Set yuanbao
  setYuanbao(amount) {
    const updatedGameData = structuredClone(this.gameData);
    updatedGameData.CGNum.value[1] = amount.toString();
    return updatedGameData;
  }

  // Get food
  getFood() {
    return parseInt(this.gameData.Prop_have.value[this.gameData.idxFood][1]) || 0;
  }

  // Set food
  setFood(amount) {
    const updatedGameData = structuredClone(this.gameData);
    updatedGameData.Prop_have.value[updatedGameData.idxFood][1] = amount.toString();
    return updatedGameData;
  }

  // Get vegetables
  getVegetables() {
    return parseInt(this.gameData.Prop_have.value[this.gameData.idxVegetables][1]) || 0;
  }

  // Set vegetables
  setVegetables(amount) {
    const updatedGameData = structuredClone(this.gameData);
    updatedGameData.Prop_have.value[updatedGameData.idxVegetables][1] = amount.toString();
    return updatedGameData;
  }

  // Get meat
  getMeat() {
    return parseInt(this.gameData.Prop_have.value[this.gameData.idxMeat][1]) || 0;
  }

  // Set meat
  setMeat(amount) {
    const updatedGameData = structuredClone(this.gameData);
    updatedGameData.Prop_have.value[updatedGameData.idxMeat][1] = amount.toString();
    return updatedGameData;
  }

  // Get all resources data
  getResourcesData() {
    return {
      money: this.getMoney(),
      yuanbao: this.getYuanbao(),
      food: this.getFood(),
      vegetables: this.getVegetables(),
      meat: this.getMeat()
    };
  }

  // Save resource data
  saveResource(updatedResource) {
    let updatedGameData = this.setMoney(updatedResource.money);
    updatedGameData = this.setYuanbao(updatedResource.yuanbao);
    updatedGameData = this.setFood(updatedResource.food);
    updatedGameData = this.setVegetables(updatedResource.vegetables);
    updatedGameData = this.setMeat(updatedResource.meat);
    return updatedGameData;
  }

  // Max all resources
  maxAllResources() {
    let updatedGameData = this.setMoney(maxResourceValues.money);
    updatedGameData = this.setYuanbao(maxResourceValues.yuanbao);
    updatedGameData = this.setFood(maxResourceValues.food);
    updatedGameData = this.setVegetables(maxResourceValues.vegetables);
    updatedGameData = this.setMeat(maxResourceValues.meat);
    return updatedGameData;
  }
}

export default ResourceUtils;
