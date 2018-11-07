export const SymbolEnums = {
  CROSS: 1,
  CIRCLE: 0,
}

export const PlayerEnums = {
  CROSSES: 1,
  ZEROS: 2,
}

export const mapSymbolByPlayer = {
  [PlayerEnums.CROSSES]: SymbolEnums.CROSS,
  [PlayerEnums.ZEROS]: SymbolEnums.CIRCLE,
}

export const mapPlayerBySymbol = {
  [SymbolEnums.CROSS]: PlayerEnums.CROSSES,
  [SymbolEnums.CIRCLE]: PlayerEnums.ZEROS,
}