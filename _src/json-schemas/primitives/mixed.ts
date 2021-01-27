type MixedType = 'string' | 'number' | 'integer' | 'boolean' | 'null';

export const mixed = (type: MixedType[]) => ({ type });
