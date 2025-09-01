<script setup lang="ts">
import type { ISeat } from '~/types/game.ts'

const gameStore = useGameStore()
const rows = computed(() => gameStore.CONFIG.ROWS)
const cols = computed(() => gameStore.CONFIG.COLS)
const seatsPerSide = computed(() => Math.floor(cols.value / 2))

function getSeat(row: number, col: number) {
  return gameStore.state.seats.find(s => s.row === row && s.col === col) as ISeat
}
</script>

<template>
  <div :class="$style.GameTrain">
    <div
      v-if="gameStore.state.seats.length"
      :class="$style.trainArea"
      :style="{
        '--rows': rows,
        '--cols': cols,
        '--seats-per-side': seatsPerSide,
      }"
    >
      <template
        v-for="row in rows"
        :key="row"
      >
        <template
          v-for="col in seatsPerSide"
          :key="`left-${row}-${col}`"
        >
          <GameSeat
            :seat="getSeat(row - 1, col - 1)"
            :is-right="!Boolean(col % 2)"
          />
        </template>
        <GameAisle />
        <template
          v-for="col in seatsPerSide"
          :key="`right-${row}-${col}`"
        >
          <GameSeat
            :seat="getSeat(row - 1, col - 1 + seatsPerSide)"
            :is-right="!Boolean(col % 2)"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameTrain {
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url('~/public/img/sTrain.png');
    background-size: 100% 100%;
  }

  .trainArea {
    display: grid;
    grid-template-columns: repeat(var(--seats-per-side), 7.8rem) 8.4rem repeat(var(--seats-per-side), 7.8rem);
    grid-template-rows: repeat(var(--rows), 10rem);
    row-gap: 2rem;
    width: 100%;
    height: 100%;
    padding: 9.2rem 4.4rem 5.2rem 4rem;
  }
</style>
