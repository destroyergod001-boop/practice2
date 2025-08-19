// src/Core/api/jsonFieldHandler.ts
/**
 * Central front-end config for which table columns are JSON.
 * Add more tables/columns here as you create models.
 */

export const jsonColumns: Record<string, string[]> = {
  monsters: [
    "basic_skill_ids",
    "basic_stats",
    "element_mastery",
    "element_resistance",
    "drop_item_ids",
  ],
  skills: [
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  items: [
    "basic_skill_ids",
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  abilities: [
    "elements",
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  shops: ["items_ids"],
  occupations: [
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  player_equipment_profiles: ["potion_item_id1", "potion_item_id2"],
  Inventory: ["item_ids"],
  PlayerProfile: ["old_class_ids", "old_race_ids", "skills", "abilities"],
  Race: [
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  Skill: [
    "elements",
    "basic_stats",
    "requirement_stats",
    "element_mastery",
    "element_resistance",
    "requirement_element_mastery",
    "requirement_element_resistance",
  ],
  Story: ["next_nodes_ids", "monster_ids"],
  Choice: [
    "requirement_stats",
    "requirement_element_mastery",
    "requirement_element_resistance",
    "reward_basic_stats",
    "reward_element_mastery",
    "reward_element_resistance",
    "reward_item_ids",
  ],
  Villein: [
    "basic_equipent_item_ids",
    "basic_ability_ids",
    "basic_skill_ids",
    "basic_stats",
    "element_mastery",
    "element_resistance",
    "drop_item_ids",
  ],

  // add more tables here...
};

/**
 * Parse JSON fields for a single row (table-specific)
 */
export function parseJsonFields<T>(
  table: string,
  row: any,
  fields?: string[]
): T {
  if (!row) return row;
  const cols = fields || jsonColumns[table] || [];
  const parsed: any = { ...row };

  cols.forEach((col) => {
    if (parsed[col] && typeof parsed[col] === "string") {
      try {
        parsed[col] = JSON.parse(parsed[col]);
      } catch {
        parsed[col] = null;
      }
    }
  });

  return parsed as T;
}

/**
 * Parse JSON fields for a list
 */
export function parseJsonFieldsList<T>(
  table: string,
  rows: any[],
  fields?: string[]
): T[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => parseJsonFields<T>(table, r, fields));
}

/**
 * Stringify JSON fields for sending to API
 */
export function stringifyJsonFields(
  table: string,
  row: any,
  fields?: string[]
) {
  if (!row) return row;
  const cols = fields || jsonColumns[table] || [];
  const dto: any = { ...row };

  cols.forEach((col) => {
    if (dto[col] !== undefined) {
      try {
        dto[col] = JSON.stringify(dto[col]);
      } catch {
        dto[col] = null;
      }
    }
  });

  return dto;
}
