<template>
  <div class="badge">
      <div class="badge-top">
        <slot name="top"></slot>
      </div>
      <div class="badge-bottom">
        <slot name="bottom"></slot>
      </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.badge {
  padding: 1.4rem 1.3rem;
  background-color: #FFF;
  border-radius: 100vw;
}
.badge-top {
  font-size: 1.6rem;
  color: #000;
  text-align: center;
}
.badge-bottom {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>