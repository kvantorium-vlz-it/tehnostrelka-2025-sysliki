<script setup lang="ts">
defineProps<{
    city: string
}>()
</script>

<template>
    <div class="title">
        Готовый<br>
        Маршрут в <span class="title-city">{{ city }}</span>
    </div>
</template>

<style scoped>
.title {
    font-size: 6.4rem;
    color: #FFFFFF;
}
.title-city {
    color: #265545;
}
</style>