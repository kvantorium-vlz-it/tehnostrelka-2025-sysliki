<script setup lang="ts">
const tags = [
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
    <div class="create-the-route-area">
        <section class="route-parameters-area">
            <div class="grow">
                <section class="enter-the-parameter-global-area">
                    <div class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-name">название маршрута</label>
                        <input type="text" class="enter-the-parameter-input main">
                    </div>
                    <div  class="enter-the-parameter-area">
                        <label class="enter-the-parameter-title" for="route-description">описание маршрута</label>
                        <input type="text" class="enter-the-parameter-input description">
                    </div>
                </section>
                <section class="public-parametr-area">
                    <label class="public-parametr-title">публичный</label>
                    <div class="public-parametr" :class="{ 'is-checked': !switchState }">
                        <SwitchRoot id="public" v-model:checked="switchState" class="switch-root" style="background: #89C587;">
                            <SwitchThumb class="switch-thumb" style="background-color: #FFFFFF;" />
                        </SwitchRoot>
                    </div>
                </section>
            </div>
            <section class="end">
                <button class="tab-menu-area-button-green">
                    <img src="../public/pics/save-in-icon.svg" class="save-in-icon">
                    <p class="tab-menu-area-title white">сохранить</p>
                </button>
                <button class="tab-menu-area-button" onclick="history.go(-1)">
                    <img src="../public/pics/back-icon.svg" class="back-icon">
                    <p class="tab-menu-area-title">вернуться назад</p>
                </button>
            </section>
        </section>

        <section class="map-area">

        </section>

        <section class="add-points-area">
            <div class="search-area">
                <input type="text" placeholder="Поиск мест" class="search-input">
                <p class="search-title">или создайте <br> своё место</p>
            </div>
            <ScrollAreaRoot class="scroll-area-root">
                <ScrollAreaViewport class="add-points-scroll h-full overflow-hidden " style="height: 100%;">
                    <div v-for="(tag, index) in tags" :key="index" class="test-swipe h-full">
                       <AddPointBlock>
                            {{ tag }}
                        </AddPointBlock>
                    </div>
                    <AddNewPointBlock></AddNewPointBlock>
                 </ScrollAreaViewport>
                 <ScrollAreaScrollbar orientation="vertical">
                     <ScrollAreaThumb class="scroll-area-thumb" />
                </ScrollAreaScrollbar>
            </ScrollAreaRoot>
        </section>
    </div>
</template>

<style scoped>
    .save-in-icon{
        width: 3rem;
    }
    .back-icon{
        width: 2.4rem;
    }
    .public-parametr{
        width: 5.1rem;
        padding-top: 0.1rem;
        padding-left: 0.2rem;
        height: 3.1rem;
        background-color: #89C587;
        transition: background-color 0.1s;
    }
    .public-parametr.is-checked {
        background-color: #A3A3A3;
    }
    .scroll-area-root{
        padding-top: 2rem;
        height: 91%;
    }
    .add-points-scroll{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .switch-root {
        width: 100%;
        height: 100%;
        background-color: #89C587;
        border-radius: 100rem;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .switch-root:focus {
        box-shadow: 0 0 0 2px black;
    }
    .switch-root[data-state='checked'] {
        background-color: #89C587;
    }
    
    .switch-thumb {
        display: block;
        width: 2.8rem;
        height: 2.8rem;
        background-color: white;
        border-radius: 100rem;
        transition: transform 100ms;
        will-change: transform;
    }
    .switch-thumb[data-state='checked'] {
        transform: translateX(19px);
    }
    .search-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
    }
    .test-swipe{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 2rem;
    }
    .search-title{
        font-size: 1.6rem;
    }
    .search-input{
        width: 29.1rem;
        height: 6.1rem;
        font-size: 1.6rem;
        padding: 2rem;
        padding-left: 5rem;
        background-image: url(../public/pics/search-icon.svg);
        background-repeat: no-repeat;
        background-position: 1.3rem center;
    }

    .add-points-area{
        width: 53.8rem;
        height: 100%;
        background-color: #F5F5F5;
        padding: 2rem;
    }

    .map-area{
        width: 91rem;
        height: 100%;
        background-color: #89C587;
    }


    .create-the-route-area{
        width: 100%;
        height: 75rem;
        margin-bottom: 5.2rem;
        padding-left: 4rem;
        padding-right: 4rem;
        display: flex;
        gap: 2rem;
        flex-direction: row;
        justify-content: center;
    }
    .route-parameters-area{
        width: 35.2rem;
        height: 75rem;
        background-color: #FFFFFF;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .enter-the-parameter-input{
        width: 100%;
        border-radius: 0rem;
        border-bottom: 2px dashed #000000;
    }
    .grow{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 7rem;
    }
    .end{
        justify-self: flex-end;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .tab-menu-area-button{
        width: 100%;
        height: 6.1rem;
        background-color: #FFFFFF;
        padding-left: 2.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
    }
    .tab-menu-area-button:hover{
        background-color: #F5F5F5;
    }
    .tab-menu-area-title{
        font-size: 1.6rem;
        color: #000000;
        line-height: 0;
    }
    .white{
        color: #FFFFFF;
    }
    .tab-menu-area-button-green{
        width: 100%;
        height: 6.1rem;
        background-color: #89C587;
        padding-left: 2.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
    }
    
    .public-parametr-area{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .public-parametr-title{
        font-size: 1.6rem;
        color: #000000;
    }
    .enter-the-parameter-global-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .main{
        font-size: 3.2rem;
        color: #000000;
    }
    .description{
        font-size: 1.6rem;
        color: #000000;
    }
    .enter-the-parameter-title{
        font-size: 1.6rem;
        color: #A3A3A3;
    }
    .enter-the-parameter-area{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
    }
</style>