<script setup lang="ts">
defineProps<{
    place: {
        name: string
        rating: number
        id: number
        image: string
    }
}>()
</script>

<template>
    <div
        class="card"
        :style="{
            backgroundImage: `url('${place.image}')`
        }"
    >
        <div class="card-info">
            <div class="card-name">
                {{ place.name }}
            </div>
        </div>

        <NuxtLink
            :to="`/place/${place.id}/`"
            class="card-button"
        >
            Посмотреть
        </NuxtLink>
    </div>
</template>

<style scoped>
.card {
    padding: 2rem;
    aspect-ratio: 0.82;
    width: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
    border-radius: 2.5rem;
    justify-content: end;
}
.card-name {
    font-size: 3.2rem;
    color: #FFFFFF;
}
.card-button {
    padding: 2rem;
    background-color: #FFFFFF;
    font-size: 1.6rem;
    color: #000000;
    border-radius: 100vw;
    text-align: center;
    text-decoration: none;
}
</style>
