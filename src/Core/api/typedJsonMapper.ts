// src/Core/api/typedJsonMapper.ts
/**
 * Generic mapper with recursive + array handling.
 * Exports dtoToModelAuto / modelToDtoAuto which accept either single object or array.
 */

export type JsonFieldMap<DTO> = {
    [K in keyof DTO]?: true | JsonFieldMap<any>;
  };
  
  function parseDto<DTO, MODEL>(dto: DTO, jsonFields: JsonFieldMap<DTO>): MODEL {
    const model: any = { ...dto };
  
    for (const key in jsonFields) {
      const fieldMap = (jsonFields as any)[key];
      const value = (dto as any)[key];
      if (value === undefined || value === null) continue;
  
      if (fieldMap === true && typeof value === 'string') {
        try {
          model[key] = JSON.parse(value);
        } catch {
          model[key] = Array.isArray(value) ? [] : {};
        }
      } else if (typeof fieldMap === 'object') {
        if (Array.isArray(value)) {
          model[key] = value.map((item: any) => parseDto(item, fieldMap));
        } else if (typeof value === 'object') {
          model[key] = parseDto(value, fieldMap);
        }
      }
    }
    return model;
  }
  
  function stringifyModel<MODEL, DTO>(model: MODEL, jsonFields: JsonFieldMap<DTO>): DTO {
    const dto: any = { ...model };
  
    for (const key in jsonFields) {
      const fieldMap = (jsonFields as any)[key];
      const value = (model as any)[key];
      if (value === undefined || value === null) continue;
  
      if (fieldMap === true) {
        dto[key] = JSON.stringify(value);
      } else if (typeof fieldMap === 'object') {
        if (Array.isArray(value)) {
          dto[key] = value.map((item: any) => stringifyModel(item, fieldMap));
        } else if (typeof value === 'object') {
          dto[key] = stringifyModel(value, fieldMap);
        }
      }
    }
    return dto;
  }
  
  export function dtoToModelAuto<DTO, MODEL>(
    dtoOrArray: DTO | DTO[],
    jsonFields: JsonFieldMap<DTO>
  ): MODEL | MODEL[] {
    if (Array.isArray(dtoOrArray)) {
      return dtoOrArray.map(item => parseDto<DTO, MODEL>(item, jsonFields));
    }
    return parseDto<DTO, MODEL>(dtoOrArray as DTO, jsonFields);
  }
  
  export function modelToDtoAuto<MODEL, DTO>(
    modelOrArray: MODEL | MODEL[],
    jsonFields: JsonFieldMap<DTO>
  ): DTO | DTO[] {
    if (Array.isArray(modelOrArray)) {
      return modelOrArray.map(item => stringifyModel<MODEL, DTO>(item, jsonFields));
    }
    return stringifyModel<MODEL, DTO>(modelOrArray as MODEL, jsonFields);
  }
  