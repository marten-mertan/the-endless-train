<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.GameInfo">
    <div
      v-for="msg in gameStore.state.lastFailedMsgs"
      :key="msg"
      :class="$style.character"
    >
      {{ msg }}
    </div>
  </div>
</template>

<style lang="scss" module>
  .GameInfo {
    //
  }
</style>
