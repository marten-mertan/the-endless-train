<script setup lang="ts">
import type { ICharacter } from '~/types/game.ts'

defineProps<{
  character: ICharacter
}>()
</script>

<template>
  <div
    :class="$style.GameCharacter"
  >
    {{ character.id }} ({{ character.conditions }})
  </div>
</template>

<style lang="scss" module>
  .GameCharacter {
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid $gray;
    padding: .8rem;
  }
</style>
