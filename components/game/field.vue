<script setup lang="ts">
const gameStore = useGameStore()

onMounted(() => {
  gameStore.initGame()
})
</script>

<template>
  <div :class="$style.GameField">
    <div :class="$style.info">
      <GameInfo />
    </div>
    <div :class="$style.train">
      <GameTrain />
    </div>
    <div :class="$style.platform">
      <GamePlatform />
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameField {
    display: grid;
    grid-template-columns: 30rem 60rem 30rem; // убрать жесткие размеры, переписать с исп $container-w
    gap: calc(11.2rem / 2); // убрать жесткие размеры, переписать с исп $container-w
    border: .1rem solid $black;
    background-color: $white;
  }

  .info {
    border: .1rem solid $gray;
  }

  .train {
    border: .1rem solid $gray;
  }

  .platform {
    border: .1rem solid $gray;
  }
</style>
