<template>
    <Container class="public-routes-wrapper">
        <div class="public-routes">
            <h1 class="public-routes-heading">
                <span class="public-routes-heading-top">Публичные</span><br>
                <span class="public-routes-heading-bottom">маршруты</span>
            </h1>

            <RoutesList class="public-routes-list" />

            <NuxtLink class="public-routes-button">
                смотреть больше
            </NuxtLink>
        </div>
    </Container>
</template>

<style>
.public-routes-wrapper {
    background-color: #F5F5F5;
    padding-top: 2.4rem;
    padding-bottom: 6.5rem;
    border-radius: 2.5rem;
}
.public-routes-heading {
    margin-bottom: 3.2rem;
}
.public-routes-heading-top {
    font-size: 3.2rem;
    color: #00000033;
}
.public-routes-heading-bottom {
    font-size: 6.4rem;
    color: #589977;
}
.public-routes-list {
    margin-bottom: 7rem;
}
.public-routes-button {
    background-color: #589977;
    padding: 2rem 11.5rem;
    border-radius: 100vw;
    font-size: 1.6rem;
    color: #FFFFFF;
    display: flex;
    width: fit-content;
    margin-inline: auto;
}
</style>
