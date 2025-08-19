import { SkillModel } from "@core/Model/Skill";

export class SkillInputController {
  static validateName(name: string): string | null {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 100) return "Name must be less than 100 characters";
    return null;
  }

  static validateDescription(description: string): string | null {
    if (description.length > 1000)
      return "Description must be less than 1000 characters";
    return null;
  }

  static validateTier(tier: number): string | null {
    if (tier < 1 || tier > 10) return "Tier must be between 1 and 10";
    return null;
  }

  static validateLevel(level: number): string | null {
    if (level < 1) return "Level must be at least 1";
    if (level > 100) return "Level cannot exceed 100";
    return null;
  }

  static validateGold(gold: number): string | null {
    if (gold < 0) return "Gold cost cannot be negative";
    return null;
  }

  static validateTurn(turn: number): string | null {
    if (turn < 1) return "Turn cost must be at least 1";
    if (turn > 10) return "Turn cost cannot exceed 10";
    return null;
  }

  static validateEffectValue(
    value: number,
    type: "fixed" | "percentage"
  ): string | null {
    if (type === "percentage" && (value < 0 || value > 100)) {
      return "Percentage value must be between 0 and 100";
    }
    return null;
  }

  static validateCategory(category: string): string | null {
    const validCategories = [
      "single",
      "aoe",
      "dot",
      "hot",
      "buff",
      "debuff",
      "utility",
      "passive",
    ];
    if (!validCategories.includes(category)) {
      return "Invalid category selected";
    }
    return null;
  }

  static validateAssetLocation(assetLocation: string): string | null {
    if (assetLocation && !assetLocation.startsWith("/")) {
      return "Asset location should start with /";
    }
    return null;
  }

  static formatStatValue(value: string | number): number {
    const numValue = typeof value === "string" ? parseInt(value) || 0 : value;
    return Math.max(0, numValue);
  }

  static formatElementValue(value: string | number): number {
    const numValue = typeof value === "string" ? parseInt(value) || 0 : value;
    return Math.max(0, numValue);
  }

  static getDefaultSkillData(): Partial<SkillModel> {
    return {
      name: "",
      description: "",
      tier: 1,
      category: "single",
      turn: 1,
      gold: 0,
      level: 1,
      basic_effect_fixed_value: 0,
      basic_effect_percentage_value: 0,
      monster_id: 0,
      monster_number: 0,
      elements: '',
      basic_stats: {},
      requirement_stats: {},
      element_mastery: {},
      element_resistance: {},
      requirement_element_mastery: {},
      requirement_element_resistance: {},
      asset_location: "",
    };
  }

  static getCategoryOptions() {
    return [
      { value: "single", label: "Single Target" },
      { value: "aoe", label: "Area of Effect (AOE)" },
      { value: "dot", label: "Damage Over Time (DOT)" },
      { value: "hot", label: "Heal Over Time (HOT)" },
      { value: "buff", label: "Buff" },
      { value: "debuff", label: "Debuff" },
      { value: "utility", label: "Utility" },
      { value: "heal", label: "Direct Heal" },
      { value: "cc", label: "Crowd Control (CC)" },
      { value: "summon", label: "Summon/Conjure" },

      { value: "defensivePhy", label: "Defensive (Physical)" },
      { value: "defensiveMagical", label: "Defensive (Magical)" },
      { value: "defensiveBoth", label: "Defensive (Hybrid)" },

      { value: "interrupt", label: "Interrupt / Silence" },
      { value: "trap", label: "Trap / Deployable" },

      // New additions
      { value: "leechHp", label: "Life Leech (HP)" },
      { value: "leechMp", label: "Mana Leech (MP)" },
      { value: "regenHp", label: "Regeneration (HP)" },
      { value: "regenMp", label: "Regeneration (MP)" },
    ];
  }

  static getTypeOptions() {
    return [
      { value: "hp", label: "Health" },
      { value: "mp", label: "Mana" },
      { value: "Both", label: "Both" },
    ];
  }
  static getTypeSkill() {
    return [
      { value: "Physical", label: "Physical" },
      { value: "Magical", label: "Magical" },
    ];
  }
  static getElements() {
    return [
      
        { value: "Physical", label: "Physical" },
        { value: "Magical", label: "Magical" },
        { value: "Fire", label: "Fire" },
        { value: "Water", label: "Water" },
        { value: "Air", label: "Air" },
        { value: "Earth", label: "Earth" },
        { value: "Wood", label: "Wood" },
        { value: "Metal", label: "Metal" },
        { value: "Light", label: "Light" },
        { value: "Dark", label: "Dark" },
        { value: "Ice", label: "Ice" },
        { value: "Thunder", label: "Thunder" },
        { value: "Life", label: "Life" },
        { value: "Death", label: "Death" },
        { value: "Void", label: "Void" },
        { value: "Chaos", label: "Chaos" }
      
      
    ];
  }
}
