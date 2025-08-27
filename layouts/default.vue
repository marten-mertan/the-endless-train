<script setupt lang="ts">
</script>

<template>
  <div :class="$style.DefaultLayout">
    <LayoutHeader />

    <main :class="$style.main">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<style lang="scss" module>
  .DefaultLayout {
    //
  }

  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: $header-h;
    flex-grow: 1;

    @include respond-to(mobile) {
      padding-top: $header-h-m;
    }
  }
</style>
