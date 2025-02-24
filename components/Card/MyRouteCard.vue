<template>
    <div class="body">
        <h1>name</h1>
        <div>
            <div>
                <div class="rating-block">
                    <p class="stat-text white">3232</p>
                </div>
                <p class="stat-text">4444</p>
            </div>
            <div>
                <div class="">
                    <img src="/pics/seen-icon.svg" class="seen-icon">
                    <p class="stat-text">32</p>
                </div>
                <div>
                    <img src="/pics/saved-s-icon.svg" class="saved-icon">
                    <p class="stat-text">343</p>
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
        display: flex;
        flex-direction: row;
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
</style>