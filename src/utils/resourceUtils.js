import { maxResourceValues } from '../constants/gameConstants';

class ResourceUtils {
  constructor(gameData) {
    this.gameData = structuredClone(gameData);
    
    // Find index storage for food, vegetables, meat
    const props = this.gameData.Prop_have.value;
    let idxFood, idxVegetables, idxMeat;
    
    for (let i = 0; i < props.length; i++) {
      const [id, _] = props[i];
      switch (id) {
        case "2":
          idxFood = i;
          break;
        case "3":
          idxVegetables = i;
          break;
        case "4":
          idxMeat = i;
          break;
      }
    }

    // Handle if food record is not found, we will just create it
    if (idxFood === undefined) {
      this.gameData.Prop_have.value.push(["2", "0"]);
      idxFood = this.gameData.Prop_have.value.length - 1;
    }

    // Handle if vegetable record is not found, we will just create it
    if (idxVegetables === undefined) {
      this.gameData.Prop_have.value.push(["3", "0"]);
      idxVegetables = this.gameData.Prop_have.value.length - 1;
    }

    // Handle if meat record is not found, we will just create it
    if (idxMeat === undefined) {
      this.gameData.Prop_have.value.push(["4", "0"]);
      idxMeat = this.gameData.Prop_have.value.length - 1;
    }

    this.idxFood = idxFood;
    this.idxVegetables = idxVegetables;
    this.idxMeat = idxMeat;
  }

  // Get money
  getMoney() {
    return parseInt(this.gameData.CGNum.value[0]) || 0;
  }

  // Set money
  setMoney(amount) {
    this.gameData.CGNum.value[0] = amount.toString();
    return this.gameData;
  }

  // Get yuanbao
  getYuanbao() {
    return parseInt(this.gameData.CGNum.value[1]) || 0;
  }

  // Set yuanbao
  setYuanbao(amount) {
    this.gameData.CGNum.value[1] = amount.toString();
    return this.gameData;
  }

  // Get food
  getFood() {
    return parseInt(this.gameData.Prop_have.value[this.idxFood][1]) || 0;
  }

  // Set food
  setFood(amount) {
    this.gameData.Prop_have.value[this.idxFood][1] = amount.toString();
    return this.gameData;
  }

  // Get vegetables
  getVegetables() {
    return parseInt(this.gameData.Prop_have.value[this.idxVegetables][1]) || 0;
  }

  // Set vegetables
  setVegetables(amount) {
    this.gameData.Prop_have.value[this.idxVegetables][1] = amount.toString();
    return this.gameData;
  }

  // Get meat
  getMeat() {
    return parseInt(this.gameData.Prop_have.value[this.idxMeat][1]) || 0;
  }

  // Set meat
  setMeat(amount) {
    this.gameData.Prop_have.value[this.idxMeat][1] = amount.toString();
    return this.gameData;
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
  setResource(updatedResource) {
    // Update money and yuanbao
    this.gameData.CGNum.value[0] = updatedResource.money.toString();
    this.gameData.CGNum.value[1] = updatedResource.yuanbao.toString();
    
    // Update food, vegetables, and meat
    this.gameData.Prop_have.value[this.idxFood][1] = updatedResource.food.toString();
    this.gameData.Prop_have.value[this.idxVegetables][1] = updatedResource.vegetables.toString();
    this.gameData.Prop_have.value[this.idxMeat][1] = updatedResource.meat.toString();
    
    return this.gameData;
  }

  // Max all resources
  maxAllResources() {
    // Set money and yuanbao to maximum
    this.gameData.CGNum.value[0] = maxResourceValues.money.toString();
    this.gameData.CGNum.value[1] = maxResourceValues.yuanbao.toString();
    
    // Set food, vegetables, and meat to maximum
    this.gameData.Prop_have.value[this.idxFood][1] = maxResourceValues.food.toString();
    this.gameData.Prop_have.value[this.idxVegetables][1] = maxResourceValues.vegetables.toString();
    this.gameData.Prop_have.value[this.idxMeat][1] = maxResourceValues.meat.toString();
    
    return this.gameData;
  }
}

export default ResourceUtils;
