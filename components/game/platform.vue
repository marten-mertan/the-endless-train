<script setup lang="ts">
import type { Character } from '~/types/game.ts'

const gameStore = useGameStore()

const charactersOnPlatform = computed(() =>
  gameStore.state.characters.filter((ch: Character) => {
    return !gameStore.state.seats.find(s => s.occupiedBy === ch.id)
  }),
)

function onDragStart(e: DragEvent, characterId: string) {
  e.dataTransfer?.setData('characterId', characterId)
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const characterId = e.dataTransfer?.getData('characterId')
  if (characterId) {
    gameStore.assignCharacterToPlatform(characterId)
  }
}
</script>

<template>
  <div
    :class="$style.GamePlatform"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <GameCharacter
      v-for="character in charactersOnPlatform"
      :key="character.id"
      :character="character"
      draggable="true"
      @dragstart="onDragStart($event, character.id)"
    />
  </div>
</template>

<style lang="scss" module>
  .GamePlatform {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: .4rem;
    padding: .8rem;
  }
</style>
