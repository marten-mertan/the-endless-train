<script setup lang="ts">
import type { ICharacter } from '~/types/game.ts'

const props = defineProps<{
  character: ICharacter
}>()

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData('characterId', props.character.id)
}
</script>

<template>
  <div
    :class="$style.GameCharacter"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div :class="$style.name">
      {{ character.id }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameCharacter {
    position: relative;
    width: 6rem;
    height: 8.4rem;
    background-image: url('~/public/img/sChar.png');
  }

  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    background: $gray-light;
    border: .3rem solid $black;
    border-radius: 50%;
    font-size: 1.2rem;;
    font-weight: bold;
    transform: translateX(-50%);
  }
</style>
