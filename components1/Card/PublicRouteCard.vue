<script setup lang="ts">
defineProps<{
    name: string
    description: string
    rating: number
    feedback: number
    seen: number
    wasSaved: number
}>()

const isSave = ref(true);
const save = 'pics/save-icon-black.svg';
const saved = 'pics/saved-black-icon.svg';

function toggleImage() {
    isSave.value = !isSave.value;
}

</script>

<template>
    <div class="public-route-card">
            <button class="save-button" @click="toggleImage">
                <img :src="isSave ? save : saved" class="save-icon">
            </button>
            <div class="route-name-n-desc-area">
                <div class="cut">
                    <h3 class="route-name">{{name}}</h3>
                </div>
                <p class="route-desc cut-desc">{{description}}</p>
            </div>
            <div class="route-stats-area">
                <div class="route-stat-group">
                    <div class="public-route-rating-block"><p class="public-route-rating-p">{{rating}}</p></div>
                        <p class="stat-text">{{feedback}} отзывов</p>
                    </div>
                    <div class="route-stats-in-second-area">
                       <div class="route-stat-group">
                            <img src="/pics/seen-icon.svg" class="seen-icon">
                            <p class="stat-text">{{seen}}</p>
                        </div>
                        <div class="route-stat-group">
                            <img src="/pics/saved-s-icon.svg" class="saved-icon">
                            <p class="stat-text">{{wasSaved}}</p>
                        </div> 
                    </div>  
                </div>
                <div class="visual-block">
                    <div class="route-map">
                        <img src="/pics/example-map-p-r.svg" class="img"> 
                    </div>
                    <NuxtLink to="/ThePublicRoute">
                        <button class="view-public-route-button">
                            <p class="view-public-route-button-title">Посмотреть маршрут</p>
                        </button>
                    </NuxtLink>
            </div>
        </div>
</template>

<style scoped>
    .public-route-card{
        width: 43.5rem;
        height: 62.2rem;
        background-color: #ffffff;
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }
    .save-button{
        background-color: #ffffff;
        width: 5rem;
        height: 5rem;
        border: none;
        border-radius: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        align-self: flex-end;
    }
    .save-icon{
        width: 3rem;
        height: 3rem;
    }
    .route-name-n-desc-area{
        width: 41rem;
        height: 9.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .route-name{
        font-size: 3.2rem;
        font-weight: 400;
    }
    .cut{
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
    .cut-desc{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        border-radius: 0;
        max-width: 39rem;
        overflow: hidden;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-all;
        hyphens: auto;
    }
    .route-desc{
        font-size: 1.6rem;
        font-weight: 400;
        color: #A3A3A3;
    }
    .seen-icon{
        width: 2.475rem;
        height: 1.688rem;
    }
    .saved-icon{
        width: 2.7rem;
        height: 2.7rem;
    }
    .route-stats-in-second-area{
        display: flex;
        flex-direction: row;
        gap: 6.5rem;
    }
    .visual-block{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-top: 2rem;
    }
    .view-public-route-button-title{
        color: #ffffff;
        font-size: 1.6rem;
    }
    .view-public-route-button{
        background-color: #89C587;
        width: 100%;
        border: none;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .route-map{
        width: 100%;
        height: 29.1rem;
    }
    .public-route-rating-block{
       padding-top: 0.4rem; 
       padding-bottom: 0.4rem; 
       padding-left: 1.55rem;
       padding-right: 1.55rem;
       background-color: #89C587;
    }
    .public-route-rating-p{
        font-size: 1.6rem;
        color: #ffffff;
        line-height: 1.2;
    }
    .route-stats-area{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 2rem;
    }
    .route-stat-group{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
    .stat-text{
        color: #A3A3A3;
        font-size: 1.6rem;
        line-height: 1;
    }
</style>