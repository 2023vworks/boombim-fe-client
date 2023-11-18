export interface GetGeoMarksRequestDTO {
  minX: number
  maxX: number
  minY: number
  maxY: number
  size: number
  nextCursor?: number
}

export interface GetGeoMarksResponseDTO {
  id: number
  createdAt: string
  updatedAt: string
  x: number
  y: number
  type: string
  activity: number
}
