<script setup lang="ts">
import type { ICharacter } from '~/types/game.ts'

const gameStore = useGameStore()

const charactersOnPlatform = computed(() =>
  gameStore.state.characters.filter((ch: ICharacter) => {
    return !gameStore.state.seats.find(s => s.occupiedBy === ch.id)
  }),
)

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
    />
  </div>
</template>

<style lang="scss" module>
  .GamePlatform {
    display: flex;
    flex-wrap: wrap;
    gap: .4rem;
    padding: .8rem;
    width: 100%;
    height: 100%;
  }
</style>
