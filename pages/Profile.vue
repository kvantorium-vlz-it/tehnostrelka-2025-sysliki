<script setup lang="ts">
     const { loggedIn, user, session, fetch, clear } = useUserSession()

const myRoutes = await $fetch(`/api/my/${user.value?.yandexId}/routes`, {
    method: 'get'
})
</script>

<template>
    <TheHeader />
    <div v-if="loggedIn">
        <div class="body">
                <Profile :username="user?.real_name || user?.username" />
                <div class="inprofile-area">
                    <NuxtLink to="/CreateTheRoute" class="create-the-route">
                        <h2 class="create-the-route-title">Создайте <br>маршрут</h2>
                        <p class="create-the-route-subtitle">ну пожалуйста :(</p>
                    </NuxtLink>
                    <div class="tickets-n-reservations">
                        <h2 class="tickets-n-reservations-title">Билеты <br>и бронь</h2>
                        <p class="tickets-n-reservations-subtitle">пока здесь пусто</p>
                    </div>
                    <div class="notifications">
                        <h2 class="notifications-title">уведомления</h2>
                        <div class="notifications-blocks">
                            <NotificationBlock />
                            <NotificationBlock />
                        </div>
                    </div>
                </div>
    
                <TabsRoot class="inf-block" default-value="routes">
                    <TabsList class="inf-block-menu-area">
                        <h4 class="inf-block-second-title">мои</h4>
                        <div class="inf-block-tab-menu-area">
                            <TabsIndicator  class="indicator">
                                <div style="width: 100%; height: 100%" class="w-full h-full"></div>
                            </TabsIndicator>
                            <TabsTrigger class="tab-button" value="routes">
                                <p class="tab-button-title">маршруты</p>
                            </TabsTrigger>
                            <TabsTrigger class="tab-button" value="coments">
                                <p class="tab-button-title">комментарии</p>
                            </TabsTrigger>
                            <TabsTrigger class="tab-button" value="saveds">
                                <p class="tab-button-title">избранные</p>
                            </TabsTrigger>
                        </div>
                    </TabsList>
                    <!-- <TabsList class="inf-block-menu-area">
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
                    </TabsList> -->
                    <TabsContent value="routes" class="tab-content">
                        <NuxtLink
                            v-for="route in myRoutes"
                            :to="`/wathcRoute/my/${route.id}`"
                            style="text-decoration: none;"
                        >
                            <MyRouteCard
                                :route="{
                                    favorites: route._count.favorites,
                                    reviewsCount: route._count.coments,
                                    name: route.name,
                                    visited: route._count.visited,
                                    rating: (route.rating.reduce((result, value) => result + value.value, 0) / route.rating.length) || 0
                                }"
                            />
                        </NuxtLink>
                    </TabsContent>
                    <TabsContent value="coments" class="tab-content">
                        <!-- <CardMyCommentCard />
                        <CardMyCommentCard />
                        <CardMyCommentCard />
                        <CardMyCommentCard />
                        <CardMyCommentCard /> -->
                    </TabsContent>
                    <TabsContent value="saveds" class="tab-content">
                        
                    </TabsContent>
                </TabsRoot>
            </div>
    </div>
    <div v-else>
        <NuxtLink external to="/api/auth/yandex">залогиньтесь</NuxtLink>
    </div>
</template>
<style scoped>
    
    .body{
        width: 100%;
        display: grid;
        grid-template-columns:  1fr 1fr 3fr;
        gap: 2rem;
        grid-template-rows: repeat(1,1fr);
    }
    @media (min-width: 720px) {
        .body {
            grid-template-rows: repeat(2,auto);
        }
    }
    .inprofile-area{
        display: grid;
        grid-template-rows: 1fr 1fr auto;
        gap: 2rem;
    }
    
    .tab-content{
        width: 100%;
        height: 100%;
        padding-top: 4.8rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: flex-start;
    }

    .create-the-route{
        background-color: #89C587;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        justify-content: space-between;
        text-decoration: none;
        border-radius: 2.5rem;
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
        border-radius: 2.5rem;
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
        border-radius: 2.5rem;
        background-color: #F5F5F5;
    }
    .notifications-title{
        color: #000000;
        font-size: 3.2rem;
        font-weight: 400;
    }
    .inf-block{
        background-color: #F5F5F5;
        padding: 2rem;
        display: flex;
        border-radius: 2.5rem;
        flex-direction: column;
    }
    .inf-block-menu-area{
        display: flex;
        flex-direction: column;
    }
    .inf-block-tab-menu-area{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 2rem;
    }
    .tab-button{
        border-radius: 2.5rem;
        border: none;
    }
    .tab-button-title{
        font-size: 2.4rem;
        color: #A3A3A3;
    }
    .tab-button-title:hover{
        color: #589977;
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
    .indicator{
        color: #589977;
        text-decoration: underline;
        position: absolute;
        padding-left: 2rem;
        left: 0;
        height: 2px;
        bottom: 0;
        width: var(--radix-tabs-indicator-size);
        transform: translateX(var(--radix-tabs-indicator-position));
        border-radius: 9999px;
        transition-property: width, transform;
        transition-duration: 300ms;
    }
    .notifications-blocks{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>