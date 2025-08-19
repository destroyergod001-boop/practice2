// Default values for stats used across all models
export const DEFAULT_STATS = {
  STR: 0,    // Strength
  INT: 0,    // Intelligence
  AGI: 0,    // Agility
  CON: 0,    // Constitution
  WIS: 0,    // Wisdom
  DEX: 0,    // Dexterity
  LUCK: 0,   // Luck
  CHAR: 0    // Charisma
};

// Default values for elements used across all models
export const DEFAULT_ELEMENTS = {
  Fire: 0,
  Water: 0,
  Air: 0,
  Earth: 0,
  Wood: 0,
  Metal: 0,
  Light: 0,
  Dark: 0,
  Ice: 0,
  Thunder: 0,
  Life: 0,
  Death: 0,
  Physical: 0,
  Magical: 0,
  Void: 0,
  Chaos: 0
};

// Helper function to get default data for any model with stats and elements
export const getDefaultModelData = <T extends Record<string, any>>(overrides: Partial<T> = {}): Partial<T> => ({
  basic_stats: { ...DEFAULT_STATS },
  requirement_stats: { ...DEFAULT_STATS },
  element_mastery: { ...DEFAULT_ELEMENTS },
  element_resistance: { ...DEFAULT_ELEMENTS },
  requirement_element_mastery: { ...DEFAULT_ELEMENTS },
  requirement_element_resistance: { ...DEFAULT_ELEMENTS },
  ...overrides
} as Partial<T>);