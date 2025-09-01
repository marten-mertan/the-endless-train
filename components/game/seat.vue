<script setup lang="ts">
import type { ISeat } from '~/types/game.ts'

interface Props {
  seat: ISeat
  isRight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isRight: false,
})

const gameStore = useGameStore()
const $style = useCssModule()

const isHovered = ref(false)

const classList = computed(() => {
  return {
    [$style._hovered]: isHovered.value,
    [$style._right]: props.isRight,
  }
})

const occupiedBy = computed(() => props.seat?.occupiedBy)
const character = computed(() =>
  occupiedBy.value ? gameStore.getCharacterById(occupiedBy.value) : null,
)

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isHovered.value = true
}

function onDragLeave() {
  isHovered.value = false
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const characterId = e.dataTransfer?.getData('characterId')
  if (characterId && props.seat?.id) {
    gameStore.assignCharacterToSeat(characterId, props.seat.id)
  }
  isHovered.value = false
}
</script>

<template>
  <div
    :class="[$style.GameSeat, classList]"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <GameCharacter
      v-if="occupiedBy && character"
      :character="character"
      :class="$style.character"
    />
  </div>
</template>

<style lang="scss" module>
  .GameSeat {
    display: flex;
    justify-content: center;
    user-select: none;
    background-image: url('~/public/img/sSeat.png');
    background-position: 0;

    &._right {
      background-position: 100%;
    }

    &._hovered  {
      border: .1rem solid green;
    }
  }
</style>
