<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GameTrain">
    <div
      v-for="seat in gameStore.state.seats"
      :key="seat.id"
      :class="$style.seat"
    >
      {{ seat.id }} ({{ seat.row }},{{ seat.col }}) [{{ seat.direction }}]
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameTrain {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: .4rem;
    padding: .8rem;
  }

  .seat {
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid $gray;
    padding: .8rem;
  }
</style>
