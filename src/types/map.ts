export interface Position {
  lat: number
  lng: number
}

export interface BoundPosition {
  southWestPosition: Position
  northEastPosition: Position
}