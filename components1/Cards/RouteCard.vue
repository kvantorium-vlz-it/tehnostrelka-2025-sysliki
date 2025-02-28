<script setup lang="ts">
defineProps<{
    route: {
        name: string
        description: string
        rating: number
        reviewsCount: number
        addToFavoriteCount: number
        id: number
    }
}>()
</script>

<template>
    <div class="route">
        <NuxtLink class="route-favorite-button">
            <Icon name="mdi:bookmark-outline" />
        </NuxtLink>
        <div class="route-name">
            {{ route.name }}
        </div>

        <div class="route-description">
            {{ route.description }}
        </div>

        <div class="route-statistics">
            <div class="route-rating">
                {{ route.rating }}
            </div>

            <div class="route-reviews">
                <Icon name="mdi:eye-outline" />
                {{ route.reviewsCount }} отзывов
            </div>

            <div class="route-favorites">
                <Icon name="mdi:bookmark" />
                {{ route.addToFavoriteCount }}
            </div>
        </div>

        <div class="route-map"></div>

        <NuxtLink :to="`/route/${route.id}/`" class="route-button">
            Посмотреть маршрут
        </NuxtLink>
    </div>
</template>

<style scoped>
.route {
    padding: 2rem;
    border-radius: 2.5rem;
    background-color: #FFFFFF;
}
.route-favorite-button {
    font-size: 3rem;
    margin-left: auto;
    display: block;
    width: fit-content;
}
.route-name {
    font-size: 3.2rem;
    color: #000000;
}
.route-description {
    margin-top: 0.5rem;
    font-size: 1.6rem;
    color: #0000003e;
}
.route-statistics {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
}
.route-rating {
    padding: 0.4rem 1.5rem;
    background-color: #89C587;
    color: #FFFFFF;
    border-radius: 100vw;
    font-size: 1.6rem;
}
.route-reviews {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #0000003e;
}
.route-favorites {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #0000003e;
}
.route-map {
    aspect-ratio: 1.40;
    width: 100%;
    margin-top: 1.25rem;
    background-color: #89C587;
    border-radius: 1.5625rem;
}
.route-button {
    background-color: #89C587;
    color: #FFFFFF;
    font-size: 1.6rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    margin-top: 1.25rem;
    border-radius: 100vw;
    text-decoration: none;
}
</style>