import { defineStore } from 'pinia'
import type { GameConfig, GameState, Seat, Character, Condition } from '~/types/game.ts'

export const useGameStore = defineStore('gameStore', () => {
  const CONFIG: GameConfig = {
    ROWS: 6,
    COLS: 4,
    CHARACTER_IDS: 'A B C D E F G H I J',
    SOLUTION_RANDOMNESS: 1,
  }
  const state = ref<GameState>({
    seats: [],
    characters: [],
    lastFailedSeatIds: new Set(),
    lastFailedMsgs: new Set(),
    status: 'running', // 'running' | 'gameover'
  })

  // Получаем место в поезде по ID
  function seatById(id: string): Seat | undefined {
    return (state.value.seats ?? []).find((seat: Seat) => seat.id === id)
  }

  // Генерируем места в поезде
  function initSeats() {
    state.value.seats = []
    for (let r = 0; r < CONFIG.ROWS; r++) {
      for (let c = 0; c < CONFIG.COLS; c++) {
        const id = `${r}-${c}`
        const direction = Math.random() < 0.85 ? 'forward' : 'backward'
        state.value.seats.push({
          id,
          row: r,
          col: c,
          direction,
          occupiedBy: null,
          neighbors: [],
        })
      }
    }

    // После того как сгенерировали места, вычисляем соседей
    const neighborMap = new Map()
    state.value.seats.forEach((s: Seat) => neighborMap.set(s.id, new Set()))

    state.value.seats.forEach((a: Seat) => {
      state.value.seats.forEach((b: Seat) => {
        if (a.id === b.id) return

        const sameRow = a.row === b.row
        const colDiff = Math.abs(a.col - b.col)
        const rowDiff = Math.abs(a.row - b.row)

        // Друг к другу слева/справа (не через проход)
        if (sameRow && colDiff === 1 && !((a.col === 1 && b.col === 2) || (a.col === 2 && b.col === 1))) {
          neighborMap.get(a.id).add(b.id)
        }

        // Друг к другу спереди/сзади
        if (a.col === b.col && rowDiff === 1) {
          neighborMap.get(a.id).add(b.id)
        }

        // Напротив друг друга через проход
        if (sameRow && colDiff === 1 && ((a.col === 1 && b.col === 2) || (a.col === 2 && b.col === 1)) && a.direction !== b.direction) {
          neighborMap.get(a.id).add(b.id)
        }
      })
    })

    // Присваиваем соседей местам
    state.value.seats.forEach((s: Seat) => s.neighbors = Array.from(neighborMap.get(s.id)))
  }

  // Генерируем число персонажей исходя из числа мест
  function initCharacters() {
    const ids = CONFIG.CHARACTER_IDS.split(' ')
    const count = Math.min(ids.length, Math.max(4, Math.floor(state.value.seats.length / 2)))
    state.value.characters = ids.slice(0, count).map(id => ({ id, conditions: [] }))
  }

  function initSolutionAndConditions() {
    // Задаем случайные места персонажам
    const available = [...state.value.seats]

    // Перемешиваем места
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]]
    }

    // присваиваем первые N мест персонажам
    const solution = new Map()
    state.value.characters.forEach((ch, i) => {
      const seat = available[i]
      solution.set(ch.id, seat.id)
    })

    // Генерируем условия для персонажей на основе их мест в решении
    state.value.characters.forEach((ch: Character) => {
      const sId: string = solution.get(ch.id)
      const s: Seat | undefined = seatById(sId)
      if (!s) return

      let added = false
      ch.conditions = []
      // Условие: рядом с кем-то
      const occNeighbors = s.neighbors.map((nid: string) => {
        const other = [...solution.entries()].find(([_cid, sid]) => sid === nid)
        return other ? other[0] : null
      }).filter(Boolean)
      if (occNeighbors.length && Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: 'near',
          nearTarget: occNeighbors[Math.floor(Math.random() * occNeighbors.length)],
        })
        added = true
      }
      // Условие: у окна слева/справа
      if (s.col === 0 && Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: 'windowLeft',
        })
        added = true
      }
      if (s.col === CONFIG.COLS - 1 && Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: 'windowRight',
        })
        added = true
      }
      // Условие: спереди/сзади
      if (s.row === 0 && Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: 'front',
        })
        added = true
      }
      if (s.row === CONFIG.ROWS - 1 && Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: 'back',
        })
        added = true
      }
      // Условие: лицом вперед/назад
      if (Math.random() < CONFIG.SOLUTION_RANDOMNESS) {
        ch.conditions.push({
          type: s.direction === 'forward' ? 'facingForward' : 'facingBackward',
        })
        added = true
      }
      // Гарантируем, что у каждого персонажа есть хотя бы одно условие
      if (!added) {
        ch.conditions.push({
          type: 'front',
        })
      }
    })
  }

  function checkSolution() {
    state.value.lastFailedSeatIds.clear()
    state.value.lastFailedMsgs.clear()
    state.value.characters.forEach((ch: Character) => {
      const s = state.value.seats.find(x => x.occupiedBy === ch.id)
      if (!s) {
        state.value.lastFailedMsgs.add(`${ch.id}: ждет посадку`)
        return
      }
      ch.conditions.forEach((cond: Condition) => {
        if (cond.type === 'near') {
          const tSeat = state.value.seats.find(x => x.occupiedBy === cond.nearTarget)
          if (!tSeat || !s.neighbors.includes(tSeat.id)) {
            state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть рядом с ${cond.nearTarget}`)
            state.value.lastFailedSeatIds.add(s.id)
          }
        }
        if (cond.type === 'windowLeft' && s.col !== 0) {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть у левого окна`)
          state.value.lastFailedSeatIds.add(s.id)
        }
        if (cond.type === 'windowRight' && s.col !== CONFIG.COLS - 1) {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть у правого окна`)
          state.value.lastFailedSeatIds.add(s.id)
        }
        if (cond.type === 'front' && s.row !== 0) {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть в переднем ряду`)
          state.value.lastFailedSeatIds.add(s.id)
        }
        if (cond.type === 'back' && s.row !== CONFIG.ROWS - 1) {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть в заднем ряду`)
          state.value.lastFailedSeatIds.add(s.id)
        }
        if (cond.type === 'facingForward' && s.direction !== 'forward') {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть лицом вперед`)
          state.value.lastFailedSeatIds.add(s.id)
        }
        if (cond.type === 'facingBackward' && s.direction !== 'backward') {
          state.value.lastFailedMsgs.add(`${ch.id}: хочет сидеть лицом назад`)
          state.value.lastFailedSeatIds.add(s.id)
        }
      })
    })
  }

  function initGame() {
    // Сбрасываем состояние
    state.value.status = 'running'

    // Инициализируем места, персонажей, решение и условия
    initSeats()
    initCharacters()
    initSolutionAndConditions()

    // Проверяем сгенерированное решение и условия
    checkSolution()
  }

  return { state, initGame }
})
