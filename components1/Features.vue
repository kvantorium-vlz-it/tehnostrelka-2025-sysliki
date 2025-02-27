<template>
    <div class="features">
        <div class="create-route-feature">
            <div class="create-route-feature-name">
                Создавайте свои
                <br>маршруты и
                <br>путешествуйте с MAPPER
            </div>

            <NuxtLink to="/registration/" class="create-route-feature-button">
                регистрация
            </NuxtLink>
        </div>

        <div class="unknown-feature">
            ГОСПОДИ СПАСИ И СОХРАНИ
        </div>
    </div>
</template>

<style scoped>
.features {
    padding-inline: 2.5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
}
.create-route-feature {
    background-color: #89C587;
    background-image: url();
    padding: 4.6875rem;
    border-radius: 1.5625rem;
}
.create-route-feature-name {
    color: #FFFFFF;
    font-size: 2.5rem;
    margin-bottom: 4.375rem;
}
.create-route-feature-button {
    padding: 1.25rem 2.25rem;
    background-color: #FFFFFF;
    color: #000000;
    text-decoration: none;
    border-radius: 100vw;
}
.unknown-feature {
    background-color: #E8E8E8;
    color: #000000;
    padding: 4.6875rem;
    border-radius: 1.5625rem;
    font-size: 2.5rem;
}
</style>
