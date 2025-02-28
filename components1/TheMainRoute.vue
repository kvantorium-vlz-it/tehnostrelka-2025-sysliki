<script setup lang="ts">
defineProps<{
    town: string
    volume: number
    rating: number
}>()
</script>

<template> 
    <div class="the-main-route-area">
        <div class="the-main-photo-area">
            <div class="the-main-photo-inside-area">
                <div class="the-best-route-title-area">
                    <h1 class="the-best-route-title">Готовый</h1>
                    <div class="the-best-route-title-second-part-area">
                        <h1 class="the-best-route-title">Маршрут в</h1>
                        <span class="the-best-route-title-city">{{town}}</span>
                    </div>
                </div>
                <div class="first-row-information-area">
                    <div class="information-place">
                        <p class="primally-p">{{volume}} точек</p>
                        <p class="then-p">в маршруте</p>
                    </div>
                    <div class="information-place">
                        <p class="primally-p">Рейтинг {{rating}}⭐</p>
                        <p class="then-p">По мнению гостей</p>
                    </div>
                    <div class="information-place">
                        <p class="primally-p">🏆маршрут месяца🏆</p>
                        <p class="then-p">По посещаемости</p>
                    </div>
                </div>
                <div class="second-row-information-area">
                    <button class="view-the-route">
                        <p class="other-p-route">Посмотреть маршрут</p>
                    </button>
                    <NuxtLink to="/inProcess">
                        <button  class="buy-the-tickets">
                            <p class="other-p-tickets">Найти билеты</p>
                        </button>
                    </NuxtLink>
                </div>
            </div>
            <div class="comment-area"></div>
        </div>
    </div>
</template>

<style scoped>
    .the-main-route-area{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .the-main-photo-area{
        width: 182rem;
        height: 58.6rem;
        background-image: url("/pics/rodina-mat.svg");
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .the-main-photo-inside-area{
        margin-left: 7.3rem;
        margin-top: 7.5rem;
    }
    .the-best-route-title-area{
        display: flex;
        flex-direction: column;
    }
    .the-best-route-title-second-part-area{
        display: flex;
        flex-direction: row;
        gap: 1.4rem;
    }
    .the-best-route-title{
        font-weight: 400;
        font-size: 6.4rem;
        color: #FFFFFF;
    }
    .the-best-route-title-city{
        font-weight: 400;
        font-size: 6.4rem;
        color: #265545;
    }
    .first-row-information-area{
        display: flex;
        flex-direction: row;
        gap: 1.2rem;
        padding-top: 3.2rem;
    }
    .information-place{
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
        padding-left: 1.6rem;
        padding-right: 1.6rem;
        padding-top: 1.45rem;
        padding-bottom: 1.45rem;
        border-radius: 2.5rem;
        align-items: center;
    }
    .primally-p{
        font-size: 1.6rem;
        color: #000000;
    }
    .then-p{
        font-size: 1rem;
        color: #7F7F7F;
        line-height: 1;
    }
    .second-row-information-area{
        display: flex;
        flex-direction: row;
        gap: 3.6rem;
        padding-top: 16.5rem;
    }
    .other-p-route{
        font-size: 1.6rem;
        color: #ffffff;
        letter-spacing: 0.1rem;
    }
    .other-p-tickets{
        font-size: 1.6rem;
        color: #000000;
    }
    .view-the-route{
        background-color: #89C587;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 2.5rem;
        align-items: center;
        border: none;
    }
    .buy-the-tickets{
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 2.5rem;
        align-items: center;
        border: none;
    }
    .comment-area{
        background-color: #FFFFFF42;
        width: 33.3rem;
        height: 55.4rem;
        backdrop-filter: blur(4.2rem);
        margin-right: 2rem;
        margin-top: 1.9rem;
    }
</style>