<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

defineProps<{
    to?: NuxtLinkProps['to']
    variant?: 'white' | 'green'
}>()
</script>

<template>
    <NuxtLink :class="['button', variant]">
        <slot></slot>
    </NuxtLink>
</template>

<style scoped>
.button {
    padding: 2rem;
    font-size: 1.6rem;
    border-radius: 100vw;
}
.green {
    background-color: #89C587;
    color: #FFFFFF;
}
.white {
    background-color: #FFFFFF;
    color: #000000;
}
</style>