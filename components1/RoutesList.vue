<template>
    <div class="list">
        <RouteCard
            :route="{
                addToFavoriteCount: 20,
                description: 'описание маршрута описание маршрута описание маршрута описание маршрута описание маршрута описание маршрута ',
                name: 'Название маршрута',
                id: i,
                rating: 4.9,
                reviewsCount: 100,
            }"
            v-for="i in 20"
        />
    </div>
</template>

<style scoped>
.list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;
}

@media (min-width: 720px) {
    .list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .list {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1440px) {
    .list {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>