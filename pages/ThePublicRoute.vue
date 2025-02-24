<script setup lang="ts">
const tags = [
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    {
        name: 'Московский Художественный театр имени А. П. Чехова',
    },
    {
        name: 'Красная площадь',
    },
    
]
const switchState = ref(false)

</script>

<template>
    <div class="the-public-route">
        <section class="route-inf-area">
            <div class="route-inf-area-top">
                <div class="author-inf">
                    <img src="../public/pics/userphoto.svg" class="user-photo">
                    <div class="user-inf">
                        <h1 class="user-name">Username</h1>
                        <h2 class="author-p">автор маршрута</h2>
                    </div>
                </div>
                <div class="route-inf">
                    <div class="route-inf-block">
                        <p class="inf-type-route">название маршрута</p>
                        <h3 class="route-name">Туда-сюда-тарам-парам</h3>
                    </div>
                    <div class="route-inf-block">
                        <p class="inf-type-route">описание маршрута</p>
                        <h4 class="route-description">Туда-сюда-тарам-парам Туда-сюда-тарам-парам Туда-сюда-тарам-парам</h4>
                    </div>
                </div>
                <div class="stat-inf">
                    <div class="rating-block">
                        <p class="rating-block-title">3.7</p>
                    </div>
                    <div class="stat-inf-second-block">
                        <div class="route-stat-group">
                            <img src="../public/pics/seen-icon.svg" class="seen-icon">
                            <p class="stat-text">3231</p>
                        </div>
                        <div class="route-stat-group">
                            <img src="../public/pics/saved-s-icon.svg" class="saved-icon">
                            <p class="stat-text">455</p>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="buttons-area">
                <button class="route-button green">
                    <img src="../public/pics/go-icon.svg" class="go">
                    <p class="route-button-title white">начать путь</p>
                </button>
                <button class="route-button grey">
                    <img src="../public/pics/save-icon-black.svg" class="save">
                    <p class="route-button-title">сохранить</p>
                </button>
                <button class="route-button" onclick="history.go(-1)">
                    <img src="../public/pics/back-icon.svg" class="back">
                    <p class="route-button-title">вернуться назад</p>
                </button>
            </div>

        </section>
        <section class="map-section">
            <div class="mod-buttons-area">
                <div class="long-mod-buttons-area">
                    <button class="long-mod-button">
                        <p class="long-mod-button-title">редактировать маршрут</p>
                    </button>
                    <button class="long-mod-button">
                        <p class="long-mod-button-title">экспортировать маршрут</p>
                    </button>
                </div>
                <button class="short-mod-button">
                    <img src="../public/pics/share-icon.svg" class="share-icon">
                </button>
            </div>
            <div class="map">

            </div>
        </section>
        <ScrollAreaRoot class="list-points-area">
            <ScrollAreaViewport class="h-full overflow-hidden" style="height: 100%;">
                <div v-for="(tag, index) in tags" :key="index" class="test-swipe h-full">
                   <PointInTheRoute>
                        {{ tag }}
                    </PointInTheRoute>
                </div>
                <ScrollAreaScrollbar orientation="vertical">
                    <ScrollAreaThumb class="scroll-area-thumb" />
               </ScrollAreaScrollbar>
            </ScrollAreaViewport>
        </ScrollAreaRoot>  
    </div>
    <section class="feedback-area">
        <TabsRoot>
            <TabsList class="feedback-list">
                <TabsTrigger value="comment" class="feedback-button">
                    <h5 class="feedback-title">комментарии</h5>
                </TabsTrigger>
                <TabsTrigger value="response" class="feedback-button">
                    <h5 class="feedback-title">Отзывы</h5>
                </TabsTrigger>
                <TabsContent value="comment">

                </TabsContent>
                <TabsContent value="response">

                </TabsContent>
            </TabsList>
        </TabsRoot>
    </section>
</template>

<style scoped>
    .add-points-scroll{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .feedback-area{
        width: 100%;
        height: auto;
        padding: 2rem;
    }
    .feedback-button{
        background-color: #ffffff;
    }
    .feedback-list{
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        padding-left: 2rem;
    }
    .feedback-title{
        font-size: 6.4rem;
        font-weight: 400;
        text-decoration: underline;
    }
    .list-points-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-left: 2rem;
        padding-right: 2rem;
        padding-bottom: 2rem;
    }
    .map{
        width: 100%;
        height: 100%;
        background-color: #7b2359;
        position: relative;
        bottom: 10.2rem;
        z-index: -1;
    }
    .route-inf-area{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .share-icon{
        width: 3rem;
    }
    .short-mod-button{
        background-color: #C8EF92;
        width: 6.1rem;
        height: 6.1rem;
        border-radius: 1.5rem;
    }
    .mod-buttons-area{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2rem;
    }
    .long-mod-buttons-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
    .long-mod-button{
        background-color: #C8EF92;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        padding-top: 2.1rem;
        padding-bottom: 2.1rem;
        border-radius: 1.5rem;
    }
    .long-mod-button-title{
        color: #000000;
        font-size: 1.6rem;
    }
    .route-inf-area-top{
        display: flex;
        flex-direction: column;
        gap: 2.8rem;
    }
    .buttons-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-self: flex-end;
    }
    
    .route-button{
        width: 100%;
        height: 6.1rem;
        background-color: #ffffff;
        padding-left: 2.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
    }
    .route-button:hover{
        background-color: #F5F5F5;
    }
    .grey{
        background-color: #F5F5F5;
    }
    .green{
        background-color: #89C587;
    }
    .green:hover{
        background-color: #89C587;
    }
    .go{
        width: 2.4rem;
    }
    .save{
        width: 2.4rem;
    }
    .back{
        width: 2.4rem;
    }
    .route-button-title{
        font-size: 1.6rem;
        color: #000000;
    }
    .white{
        color: #ffffff;
    }
    .the-public-route{
        width: 100%;
        height: 75rem;
        padding-left: 2rem;
        padding-right: 2rem;
        margin-bottom: 7.6rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2rem;
    }
    .stat-inf{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .rating-block-title{
        font-size: 1.6rem;
        color: #ffffff;
        line-height: 1.2;
    }
    .rating-block{
       padding-top: 0.4rem; 
       padding-bottom: 0.4rem; 
       padding-left: 1.55rem;
       padding-right: 1.55rem;
       background-color: #89C587;
    }
    .stat-inf-second-block{
        display: flex;
        flex-direction: row;
        gap: 2.4rem;
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
    .saved-icon{
        width: 2.7rem;
    }
    .seen-icon{
        width: 2.475rem;
    }
    .route-inf{
        display: flex;
        flex-direction: column;
        gap: 2.8rem;
    }
    .route-inf-block{
        width: 31.2rem;
    }
    .route-name{
        font-size: 3.2rem;
        font-weight: 400;
        color: #000000;
    }
    .route-description{
        font-size: 2rem;
        font-weight: 400;
        color: #000000;
    }
    .inf-type-route{
        font-size: 1.6rem;
        font-weight: 400;
        color: #A3A3A3;
    }
    .user-inf{
        display: flex;
        flex-direction: column;
    }
    .user-name{
        font-size: 1.6rem;
        font-weight: 400;
        color: #000000;
    }
    .author-p{
        font-size: 1.6rem;
        font-weight: 400;
        color: #A3A3A3;
    }
    .author-inf{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.6rem;
    }
    .user-photo{
        width: 6.1rem;
        height: 6.1rem;
    }
    .route-inf-area{
        width: 35.2rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 2rem;
    }
    .map-section{
        width: 91rem;
        height: 100%;
    }
    .list-points-area{
        width: 53.8rem;
        height: 100%;
        background-color: #F5F5F5;
    }
</style>