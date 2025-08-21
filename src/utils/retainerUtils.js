import { rangeAttrs } from '../constants/gameConstants';

class RetainerUtils {
  constructor(gameData) {
    this.gameData = structuredClone(gameData);
  }

  // Pure function to create retainer object from raw data
  createRetainer(rawRecord, retainerIdx) {
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
    };
  }

  // Get all retainers data
  getRetainersData() {
    if (this.gameData?.MenKe_Now?.value) {
      return this.gameData.MenKe_Now.value.map((rawRecord, index) => 
        this.createRetainer(rawRecord, index)
      );
    }
    return [];
  }

  // Get single retainer
  getRetainer(retainerIdx) {
    const retainers = this.getRetainersData();
    return retainers[retainerIdx] || {};
  }

  // Update single retainer
  setRetainer(retainerIdx, { age, literature, martial, commerce, art, strategy, reputation, monthlySalary }) {
    const rawRecord = this.gameData.MenKe_Now.value[retainerIdx];
    rawRecord[3] = age.toString();
    rawRecord[4] = literature.toString();
    rawRecord[5] = martial.toString();
    rawRecord[6] = commerce.toString();
    rawRecord[7] = art.toString();
    rawRecord[15] = strategy.toString();
    rawRecord[11] = reputation.toString();
    rawRecord[18] = monthlySalary.toString();

    this.gameData.MenKe_Now.value[retainerIdx] = rawRecord;
    return this.gameData;
  }

  // Set all retainers to best attributes
  allRetainersBestAttributes() {
    for (let i = 0; i < this.gameData.MenKe_Now.value.length; i++) {
      const rawRecord = this.gameData.MenKe_Now.value[i];
      rawRecord[3] = rangeAttrs.age[0].toString(); // Minimum age (youngest)
      rawRecord[4] = rangeAttrs.literature[1].toString(); // Maximum literature
      rawRecord[5] = rangeAttrs.martial[1].toString(); // Maximum martial
      rawRecord[6] = rangeAttrs.commerce[1].toString(); // Maximum commerce
      rawRecord[7] = rangeAttrs.art[1].toString(); // Maximum art
      rawRecord[15] = rangeAttrs.strategy[1].toString(); // Maximum strategy
      rawRecord[11] = rangeAttrs.reputation[1].toString(); // Maximum reputation
      rawRecord[18] = rangeAttrs.monthlySalary[0].toString(); // Minimum salary (lowest cost)

      this.gameData.MenKe_Now.value[i] = rawRecord;
    }
    
    return this.gameData;
  }
}

export default RetainerUtils;
