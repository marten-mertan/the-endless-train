export type TGameStatus = 'running' | 'gameover'

export interface IGameConfig {
  ROWS: number
  COLS: number
  CHARACTER_IDS: string // ID персонажей через пробел
  SOLUTION_RANDOMNESS: number // от 0 до 1, насколько часто будут добавляться условия для персонажей (0 - никогда, 1 - всегда)
}

export interface IGameState {
  seats: ISeat[]
  characters: ICharacter[]
  lastFailedSeatIds: Set<string>
  lastFailedMsgs: Set<string>
  status: TGameStatus
}

export interface ISeat {
  id: string
  row: number
  col: number
  direction: 'forward' | 'backward'
  occupiedBy: string | null
  neighbors: string[]
}

export interface ICharacter {
  id: string
  conditions: ICondition[]
}

export interface ICondition {
  type: 'near' | 'windowLeft' | 'windowRight' | 'front' | 'back' | 'facingForward' | 'facingBackward'
  nearTarget?: string // ID персонажа, если type === 'near'
}
