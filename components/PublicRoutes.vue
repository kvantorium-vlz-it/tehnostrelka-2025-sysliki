<template>
    <div class="public-routes-area">
        <div class="public-route-title">
            <h2 class="public-route-second-title">Публичные</h2>
            <h1 class="public-route-main-title">маршруты</h1>
        </div>
        <div class="public-routes-cards-area">
            <PublicRouteCard></PublicRouteCard>
            <PublicRouteCard></PublicRouteCard>
            <PublicRouteCard></PublicRouteCard>
            <PublicRouteCard></PublicRouteCard>
        </div>
        <button class="watch-all-button">
            <p class="watch-all-button-title">смотреть больше</p>
        </button>
        
    </div>
</template>

<style scoped>
    
    .public-routes-area{
        background-color: #EAEAEA;
        width: 100%;
        margin-top: 19.4rem;
        padding-bottom: 40rem;
        padding-left: 2rem;
        padding-right: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .public-route-title{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 4.4rem;
        padding-left: 4rem;
        align-self: flex-start;
    }
    .public-route-main-title{
        color: #589977;
        font-size: 6.4rem;
        font-weight: 400;
    }
    .public-route-second-title{
        color: #BBBBBB;
        font-size: 3.2rem;
        font-weight: 400;
    }
    .public-routes-cards-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding-top: 3.6rem;
        flex-wrap: wrap;
    }
    .watch-all-button-title{
        color: #ffffff;
        font-size: 1.6rem;
    }
    .watch-all-button{
        background-color: #589977;
        border: none;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 11.5rem;
        padding-right: 11.5rem;
        margin-top: 7rem;
    }
    
</style>

аккаунт модетора (добавляют города и одобряют маршруты)
добавление и выбор города
избранное
сразу построение маршрута


