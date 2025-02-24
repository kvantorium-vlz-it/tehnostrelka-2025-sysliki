<script setup lang="ts">
definePageMeta({
    layout: 'profile',
})

const currentTabTitle = ref('маршруты')

function updateTitle(value: string) {
    const titles: { [key: string]: string } = {
        routes: 'маршруты',
        coments: 'комментарии',
        saveds: 'избранные'
    };

    currentTabTitle.value = titles[currentTabTitle.value] || 'маршруты';
}

</script>

<template>
            <div class="inprofile-area">
                <NuxtLink to="/CreateTheRoute">
                    <div class="create-the-route">
                        <h2 class="create-the-route-title">Создайте маршрут</h2>
                        <p class="create-the-route-subtitle">ну пожалуйста :(</p>
                    </div>
                </NuxtLink>
                <div class="tickets-n-reservations">
                    <h2 class="tickets-n-reservations-title">Билеты <br>и бронь</h2>
                    <p class="tickets-n-reservations-subtitle">пока здесь пусто</p>
                </div>
                <div class="notifications">
                    <h2 class="notifications-title">уведомления</h2>
                    <div>

                    </div>
                </div>
            </div>

            <TabsRoot class="inf-block" default-value="routes" @value-change="updateTitle">
                <TabsList class="inf-block-menu-area">
                    <div class="inf-block-title-area">
                        <h4 class="inf-block-second-title">мои</h4>
                        <h5 class="inf-block-main-title">{{ currentTabTitle }}</h5>
                    </div>
                    <TabsIndicator></TabsIndicator>
                    <div class="inf-block-tab-menu-area">
                        <TabsTrigger class="tab-button" value="routes">
                            <p class="tab-button-title">мои маршруты</p>
                        </TabsTrigger>
                        <TabsTrigger class="tab-button" value="coments">
                            <p class="tab-button-title">мои комментарии</p>
                        </TabsTrigger>
                        <TabsTrigger class="tab-button" value="saveds">
                            <p class="tab-button-title">мои избранные</p>
                        </TabsTrigger>
                    </div>
                </TabsList>
                <TabsContent value="routes" class="tab-content">
                        <CardMyRouteCard></CardMyRouteCard>
                        <CardMyRouteCard></CardMyRouteCard>
                        <CardMyRouteCard></CardMyRouteCard>
                        <CardMyRouteCard></CardMyRouteCard>
                        <CardMyRouteCard></CardMyRouteCard>
                </TabsContent>
                <TabsContent value="coments">
                    <div style="width: 10rem; height: 10rem; background-color: blueviolet;"></div>
                </TabsContent>
                <TabsContent value="saveds">
                    <div style="width: 10rem; height: 10rem; background-color: olivedrab;"></div>
                </TabsContent>
            </TabsRoot>
</template>
<style scoped>
    .home-section{
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }
    
    .inprofile-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .tab-content{
        width: 100%;
        height: 100%;
        padding-top: 4.8rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .create-the-route{
        width: 35.2rem;
        height: 16.2rem;
        background-color: #89C587;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        justify-content: space-between;
    }
    .create-the-route-title{
        color: #FFFFFF;
        font-size: 3.2rem;
        font-weight: 400;
    }
    .create-the-route-subtitle{
        color: #FFFFFF50;
        font-size: 1.6rem;
    }


    .tickets-n-reservations{
        width: 35.2rem;
        height: 14rem;
        background-color: #F5F5F5;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        justify-content: space-between;
    }
    .tickets-n-reservations-title{
        color: #000000;
        font-size: 3.2rem;
        font-weight: 400;
    }
    .tickets-n-reservations-subtitle{
        color: #00000050;
        font-size: 1.6rem;
    }


    .notifications{
        width: 35.2rem;
        height: 40.8rem;
        padding: 2rem;
        background-color: #F5F5F5;
    }
    .notifications-title{
        color: #000000;
        font-size: 3.2rem;
        font-weight: 400;
    }


    .inf-block{
        width: 105.5rem;
        height: 75rem;
        background-color: #F5F5F5;
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }
    .inf-block-menu-area{
        display: flex;
        flex-direction: row;
        gap: 2.6rem;
    }
    .inf-block-tab-menu-area{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    .tab-button-title{
        font-size: 2.4rem;
        color: #00000020;
        text-decoration: underline;
    }
    .inf-block-title-area{
        display: flex;
        flex-direction: column;
    }
    .inf-block-main-title{
        font-size: 6.4rem;
        color: #589977;
        font-weight: 400;
    }
    .inf-block-second-title{
        font-size: 3.2rem;
        color: #00000020;
        font-weight: 400;
    }

</style>