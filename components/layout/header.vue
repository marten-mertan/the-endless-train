<script setup lang="ts">

</script>

<template>
  <header :class="$style.Header">
    <div :class="[$style.wrapper, 'container']">
      <div :class="$style.title">
        <NuxtLink
          href="/"
          :class="$style.link"
        >
          The Endless Train
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" module>
  .Header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: $white;
    border-bottom: .1rem solid $gray-light;
    z-index: 100;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-h;
    padding-top: 1.8rem;
    padding-bottom: 1.8rem;

    @include respond-to(mobile) {
      height: $header-h-m;
      padding: 0 0 0 $padding-m;
    }
  }

  .link {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
  }
</style>
