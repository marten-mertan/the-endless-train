export type GameStatus = 'running' | 'gameover'

export interface GameConfig {
  ROWS: number
  COLS: number
  CHARACTER_IDS: string // ID персонажей через пробел
  SOLUTION_RANDOMNESS: number // от 0 до 1, насколько часто будут добавляться условия для персонажей (0 - никогда, 1 - всегда)
}

export interface GameState {
  seats: Seat[]
  characters: Character[]
  lastFailedSeatIds: Set<string>
  lastFailedMsgs: Set<string>
  status: GameStatus
}

export interface Seat {
  id: string
  row: number
  col: number
  direction: 'forward' | 'backward'
  occupiedBy: string | null
  neighbors: string[]
}

export interface Character {
  id: string
  conditions: Condition[]
}

export interface Condition {
  type: 'near' | 'windowLeft' | 'windowRight' | 'front' | 'back' | 'facingForward' | 'facingBackward'
  nearTarget?: string // ID персонажа, если type === 'near'
}
