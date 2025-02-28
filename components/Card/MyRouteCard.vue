<template>
    <div class="body">
        <h1 class="stat-text name">namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename</h1>
        <div class="feedback-area">
            <div class="rating-area">
                <div class="rating-block">
                    <p class="stat-text white">3232</p>
                </div>
                <p class="stat-text">{{4444}} отзывов</p>
            </div>
            <div class="stat-area">
                <div class="stat-flex">
                    <img src="../../public/pics/seen-icon.svg" class="seen-icon">
                    <p class="stat-text">{{32}}</p>
                </div>
                <div  class="stat-flex">
                    <img src="../../public/pics/saved-s-icon.svg" class="saved-icon">
                    <p class="stat-text">{{343}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .body{
        background-color: #EDEDED;
        width: 100%;
        height: 6.4rem;
        padding: 2rem;
        display: grid;
        align-items: center;
        grid-template-columns: auto 1fr;
        justify-items: end;
    }
    .feedback-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        gap: 7rem;
    }
    .rating-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
    .stat-flex{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
    .stat-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2rem;
    }
    .seen-icon{
        width: 2.475rem;
        height: 1.688rem;
    }
    .saved-icon{
        width: 2.7rem;
        height: 2.7rem;
    }
    .rating-block{
        padding-top: 0.4rem; 
       padding-bottom: 0.4rem; 
       padding-left: 1.55rem;
       padding-right: 1.55rem;
       background-color: #89C587;
    }
    .stat-text{
        color: #A3A3A3;
        font-size: 1.6rem;
        line-height: 1;
    }
    .white{
        color: #FFFFFF;
    }
    .name{
        color: #000000;
        font-weight: 400;
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