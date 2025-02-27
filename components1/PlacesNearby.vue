<template>
    <div class="places-nearby-area">
        <h1 class="places-nearby-title">места рядом</h1>
        <div class="places-nearby-cards">
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="9qsoiqnd" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            <ThePlaceNearbyCard :rating="4" place="yw7qy8s" />
            
        </div>
    </div>
</template>

<style scoped>
    .places-nearby-area{
        margin-top: 11.8rem;
        margin-right: 2rem;
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
    }
    .places-nearby-title{
        font-size: 6.4rem;
        font-weight: 400;
        line-height: 6rem;
        align-self: flex-start;
    }
    .places-nearby-cards{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 2rem;
    }
    
</style>