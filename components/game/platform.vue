<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GamePlatform">
    <div
      v-for="character in gameStore.state.characters"
      :key="character.id"
      :class="$style.character"
    >
      {{ character.id }} ({{ character.conditions }})
    </div>
  </div>
</template>

<style lang="scss" module>
  .GamePlatform {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: .4rem;
    padding: .8rem;
  }

  .character {
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid $gray;
    padding: .8rem;
  }
</style>
