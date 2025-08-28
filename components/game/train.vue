<script setup lang="ts">
const gameStore = useGameStore()

function onDragStart(e: DragEvent, occupiedBy: string | null) {
  if (!occupiedBy) return
  e.dataTransfer?.setData('characterId', occupiedBy)
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDrop(e: DragEvent, seatId: string) {
  e.preventDefault()
  const characterId = e.dataTransfer?.getData('characterId')
  if (characterId) {
    gameStore.assignCharacterToSeat(characterId, seatId)
  }
}
</script>

<template>
  <div :class="$style.GameTrain">
    <div
      v-for="seat in gameStore.state.seats"
      :key="seat.id"
      :class="$style.seat"
      :draggable="Boolean(seat.occupiedBy) ? 'true' : 'false'"
      @dragstart="onDragStart($event, seat.occupiedBy)"
      @dragover="onDragOver"
      @drop="(e) => onDrop(e, seat.id)"
    >
      {{ seat.id }} ({{ seat.row }},{{ seat.col }}) [{{ seat.direction }}] [{{ seat.occupiedBy }}]
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
    user-select: none;
  }
</style>
