import { defineStore } from 'pinia'
import type { GameState, Seat } from '~/types/game.ts'

export const useGameStore = defineStore('gameStore', () => {
  const state = ref<GameState>({
    // CONFIG
    rows: 6,
    cols: 4,
    characterIDs: 'A B C D E F G H I J',

    // GAME STATE
    seats: [],
    characters: [],
    lastFailedSeatIds: new Set(),
    status: 'running', // 'running' | 'gameover'
  })

  // Получаем место в поезде по ID
  function seatById(id: string) {
    return (state.value.seats ?? []).find((seat: Seat) => seat.id === id)
  }

  // Генерируем места в поезде
  function initSeats() {
    state.value.seats = []
    for (let r = 0; r < state.value.rows; r++) {
      for (let c = 0; c < state.value.cols; c++) {
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
    const ids = state.value.characterIDs.split(' ')
    const count = Math.min(ids.length, Math.max(4, Math.floor(state.value.seats.length / 2)))
    state.value.characters = ids.slice(0, count).map(id => ({ id, conditions: [] }))
  }

  return { state, initSeats, initCharacters, seatById }
})
