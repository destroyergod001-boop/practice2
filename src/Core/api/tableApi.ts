// src/Core/api/tableApi.ts
import { apiClient } from './apiClient';
import { dtoToModelAuto, modelToDtoAuto, JsonFieldMap } from './typedJsonMapper';
import { parseJsonFieldsList, parseJsonFields, stringifyJsonFields } from './jsonFieldHandler';

/**
 * Generic Table API
 * - basePath: API base path for this table (e.g., '/api/monsters' or '/api/monster')
 * - jsonFields: JsonFieldMap for typedJsonMapper OR you can rely on jsonFieldHandler map
 */
export class TableApi<DTO extends Record<string, any>, MODEL extends Record<string, any>> {
  public basePath: string;
  public jsonFieldMap?: JsonFieldMap<DTO>;
  public tableName?: string; // used by jsonFieldHandler if provided

  constructor(opts: {
    basePath: string;
    tableName?: string;
    jsonFieldMap?: JsonFieldMap<DTO>;
  }) {
    this.basePath = opts.basePath.replace(/\/$/, '');
    this.jsonFieldMap = opts.jsonFieldMap;
    this.tableName = opts.tableName;
  }

  private parseResponse(data: DTO | DTO[] | any): MODEL | MODEL[] {
    if (this.jsonFieldMap) {
      return dtoToModelAuto<DTO, MODEL>(data as any, this.jsonFieldMap) as any;
    }
    if (this.tableName) {
      // fallback to jsonFieldHandler map
      if (Array.isArray(data)) return parseJsonFieldsList<MODEL>(this.tableName, data);
      return parseJsonFields<MODEL>(this.tableName, data);
    }
    return data as any;
  }

  private toDtoPayload(model: Partial<MODEL>): any {
    if (this.jsonFieldMap) {
      return modelToDtoAuto<Partial<MODEL>, Partial<DTO>>(model as any, this.jsonFieldMap);
    }
    if (this.tableName) {
      return stringifyJsonFields(this.tableName, model);
    }
    return model;
  }

  // GET all
  async getAll(): Promise<MODEL[]> {
    const res = await apiClient.get<DTO[]>(`${this.basePath}`);
    return this.parseResponse(res.data) as MODEL[];
  }

  async getById(id: number | string): Promise<MODEL> {
    const res = await apiClient.get<DTO>(`${this.basePath}/${id}`);
    return this.parseResponse(res.data) as MODEL;
  }

  // get by single column
  async getByColumn(column: string, value: any): Promise<MODEL[]> {
    const res = await apiClient.get<DTO[]>(`${this.basePath}/${column}/${encodeURIComponent(value)}`);
    return this.parseResponse(res.data) as MODEL[];
  }

  // query: send nested conditions to backend (it supports nested structures)
  async query(conditions: any[]): Promise<MODEL[]> {
    const res = await apiClient.post<DTO[]>(`${this.basePath}/query`, { conditions });
    return this.parseResponse(res.data) as MODEL[];
  }

  // create
  async create(data: Partial<MODEL>): Promise<MODEL> {
    const payload = this.toDtoPayload(data as Partial<MODEL>);
    const res = await apiClient.post<DTO>(`${this.basePath}/`, payload);
    return this.parseResponse(res.data) as MODEL;
  }

  // duplicate by id
  async duplicate(id: number | string): Promise<MODEL | null> {
    const res = await apiClient.post<DTO>(`${this.basePath}/duplicate/${id}`);
    if (!res.data) return null;
    return this.parseResponse(res.data) as MODEL;
  }

  // update by conditions
  async update(conditions: number, newData: Partial<MODEL>): Promise<number> {
    const id = conditions;
    const newDatas = this.toDtoPayload(newData as Partial<MODEL>)
    
    const res = await apiClient.put<{ updatedCount: number }>(`${this.basePath}/${id}`, newDatas);
    return res.data.updatedCount;
  }

  // delete by conditions
  async delete(conditions: number): Promise<number> {
    const id = conditions;
    const res = await apiClient.delete<{ deletedCount: number }>(`${this.basePath}/${id}`);
    return res.data.deletedCount;
  }

  // union (server endpoint /union)
  async union(tables: string[], column: string): Promise<any[]> {
    const res = await apiClient.post<any[]>(`/union`, { tables, column });
    return res.data;
  }

  // join with options to parse JSON columns per table
  async join<U = any>(table2: string, onCondition: string, options?: { jsonFields?: Record<string, string[]> }): Promise<(MODEL & U)[]> {
    const res = await apiClient.post<any[]>(`/join`, { table1: this.tableName || this.basePath.replace(/^\/+|\/+$/g, ''), table2, onCondition });
    let data: any[] = res.data;

    if (options?.jsonFields) {
      for (const [t, fields] of Object.entries(options.jsonFields)) {
        data = parseJsonFieldsList(t, data, fields);
      }
    } else if (this.tableName) {
      data = parseJsonFieldsList(this.tableName, data);
    }

    return data as (MODEL & U)[];
  }
}
