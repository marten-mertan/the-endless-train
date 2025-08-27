export type GameStatus = 'running' | 'gameover'

export interface GameState {
  rows: number
  cols: number
  characterIDs: string // ID персонажей через пробел
  seats: Seat[]
  characters: Character[]
  lastFailedSeatIds: Set<string>
  status: GameStatus
}

export interface Seat {
  id: string
  row: number
  col: number
  direction: 'forward' | 'backward'
  occupiedBy: Character | null
  neighbors: string[]
}

export interface Character {
  id: string
  conditions: Condition[]
}

export interface Condition {
  type: 'near' | 'windowLeft' | 'windowRight' | 'front' | 'back' | 'facingForward' | 'facingBackward'
  nearTarget?: string[]
}
