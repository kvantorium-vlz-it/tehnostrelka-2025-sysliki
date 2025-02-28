<script setup lang="ts">
defineProps<{
    route: {
        name: string
        reviewsCount: number
        rating: number
        favorites: number
        visited: number
    }
}>()
</script>

<template>
    <div class="route">
        <h1 class="stat-text name">
            {{ route.name }}
        </h1>

        <div class="rating-area">
            <div class="rating-block">
                <p class="stat-text white">{{ route.rating }}</p>
            </div>
            <p class="stat-text">{{route.reviewsCount}} отзывов</p>
        </div>

        <div class="stat-area">
            <div class="stat-flex">
                <img src="/pics/seen-icon.svg" class="seen-icon">
                <p class="stat-text">{{route.visited}}</p>
            </div>
            <div  class="stat-flex">
                <img src="/pics/saved-s-icon.svg" class="saved-icon">
                <p class="stat-text">{{route.favorites}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .route{
        background-color: #EDEDED;
        width: 100%;
        padding: 2rem;
        border-radius: 2rem;
        display: flex;
        /* display: grid; */
        align-items: center;
        /* grid-template-columns: auto 1fr; */
        justify-items: end;
        text-decoration: none;
    }
    .feedback-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        text-decoration: none;
        gap: 7rem;
    }
    .rating-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        gap: 0.5rem;
    }
    .stat-flex{
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        gap: 0.5rem;
    }
    .stat-area{
        display: flex;
        flex-direction: row;
        text-decoration: none;
        align-items: center;
        gap: 2rem;
    }
    .seen-icon{
        width: 2.475rem;
        text-decoration: none;
        height: 1.688rem;
    }
    .saved-icon{
        width: 2.7rem;
        text-decoration: none;
        height: 2.7rem;
    }
    .rating-block{
        padding-top: 0.4rem; 
       padding-bottom: 0.4rem; 
       padding-left: 1.55rem;
       padding-right: 1.55rem;
       background-color: #89C587;
       border-radius: 100vw;
       text-decoration: none;
    }
    .stat-text{
        color: #A3A3A3;
        font-size: 1.6rem;
        line-height: 1;
        text-decoration: none;
    }
    .white{
        color: #FFFFFF;
        text-decoration: none;
    }
    .name{
        color: #000000;
        font-weight: 400;
       text-decoration: none;
       line-height: 3.7rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        border-radius: 0;
        width: 39rem;
        max-width: 39rem;
        overflow: hidden;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-all;
        hyphens: auto;
    }
</style>