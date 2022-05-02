import { IParseTreeAttribute } from 'tiddlywiki';

export function removeTypeFromAttributes(attributes?: Record<string, IParseTreeAttribute>): Record<string, any> | undefined {
  if (!attributes) {
    return;
  }
  return Object.keys(attributes).reduce((acc, key) => {
    const value = attributes[key];
    if (value.type === 'string') {
      acc[key] = value.value;
    }
    return acc;
  }, {} as Record<string, any>);
}

export function addTypeToAttributes(attributes?: Record<string, any>): Record<string, IParseTreeAttribute> | undefined {
  if (!attributes) {
    return;
  }
  return Object.keys(attributes).reduce((acc, key) => {
    const value = attributes[key];
    acc[key] = {
      // not accurate, will make 'link' to 'string', so this function is not used anymore
      type: typeof value,
      value,
    };
    return acc;
  }, {} as Record<string, IParseTreeAttribute>);
}
