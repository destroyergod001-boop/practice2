// src/Core/api/genericModelHelper.ts
/**
 * Generic helper class for common model operations
 * This provides a base class that can be extended for model-specific helpers
 * when you need custom logic beyond the basic CRUD operations.
 */

import { TableApi } from './tableApi';

export abstract class GenericModelHelper<DTO extends Record<string, any>, MODEL extends Record<string, any>> {
  protected api: TableApi<DTO, MODEL>;

  constructor(api: TableApi<DTO, MODEL>) {
    this.api = api;
  }

  // Basic CRUD operations that can be used directly
  async getAll(): Promise<MODEL[]> {
    return await this.api.getAll();
  }

  async getById(id: number): Promise<MODEL> {
    return await this.api.getById(id);
  }

  async create(data: Partial<MODEL>): Promise<MODEL> {
    const processedData = this.preprocessForCreate ? this.preprocessForCreate(data) : data;
    const result = await this.api.create(processedData);
    return this.postprocessFromApi ? this.postprocessFromApi(result) : result;
  }

  async update(id: number, data: Partial<MODEL>): Promise<number> {
    const processedData = this.preprocessForUpdate ? this.preprocessForUpdate(data) : data;
    return await this.api.update(id, processedData);
  }

  async delete(id: number): Promise<number> {
    return await this.api.delete(id);
  }

  async duplicate(id: number): Promise<MODEL | null> {
    return await this.api.duplicate(id);
  }

  async getByColumn(column: string, value: any): Promise<MODEL[]> {
    return await this.api.getByColumn(column, value);
  }

  async query(conditions: any[]): Promise<MODEL[]> {
    return await this.api.query(conditions);
  }

  // Optional hooks for model-specific processing
  protected preprocessForCreate?(data: Partial<MODEL>): Partial<MODEL>;
  protected preprocessForUpdate?(data: Partial<MODEL>): Partial<MODEL>;
  protected postprocessFromApi?(data: MODEL): MODEL;
}

// Example usage for a simple model that doesn't need custom processing:
export class SimpleModelHelper<DTO extends Record<string, any>, MODEL extends Record<string, any>> extends GenericModelHelper<DTO, MODEL> {
  constructor(api: TableApi<DTO, MODEL>) {
    super(api);
  }
}