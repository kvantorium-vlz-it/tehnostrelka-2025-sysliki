<script setup lang="ts">
const { data: cities } = await useAsyncData('cities', () => $fetch('/api/getAll/city'))

const cityId = ref('' + cities.value[0].id)

const bestRoute = await $fetch(`/api/bestRoute/${cityId.value}`)
</script>

<template>
    <TheHeader v-model:selected-city-id="cityId" />

    {{ bestRoute }}

    <TheFooter />
</template>