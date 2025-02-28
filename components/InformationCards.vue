
<template>
    <div class="information-cards-area">
        <div class="hello-card">
            <div class="card-hello-title">
                <h2 class="card-title">Создавайте свои </h2>
                <h2 class="card-title">маршруты и </h2>
                <div class="card-title-w-logo-area">
                    <h2 class="card-title">путешествуйте с </h2>
                    <span class="card-title-span-logo">MAPPER</span>
                </div>
            </div>
            <button class="card-reg-button">
                <NuxtLink external to="/api/auth/yandex" class="card-button-title">регистрация</NuxtLink>
            </button>
        </div>
        <div class="another-card">
            <p class="card-title"> Абсолютно новый подход к отдыху и приключениям</p>
        </div>
    </div>
</template>
<style scoped>
    .information-cards-area{
        display: grid;
        grid-template-columns: repeat(1,auto);
        gap: 2rem;
        padding: 2rem;
    }
    @media (min-width: 1024px) {
        .information-cards-area {
            grid-template-columns: 2fr 1fr;
        }
    }
    .hello-card{
        background-color: #89C587;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 7.5rem;
        gap: 7rem;
        border-radius: 2.5rem
    }
    .card-hello-title{
        display: flex;
        flex-direction: column;
    }
    .card-title-w-logo-area{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        word-break: break-all;
    }
    .card-title{
        font-size: 4rem;
        font-weight: 400;
        color: #FFFFFF;
    }
    .card-title-span-logo{
        font-size: 4rem;
        font-weight: 400;
        font-family: Righteous;
        color: #FFFFFF;
        line-height: 1.1;
    }
    .card-reg-button{
        background-color: #FFFFFF;
        border: none;
        display: flex;
        flex-direction: column;
        padding-left: 3.6rem;
        padding-right: 3.6rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-radius: 2.5rem;
        align-items: center;
    }
    .card-button-title{
        font-size: 1.6rem;
        text-decoration: none;
        color:#000000;
    }
    .another-card{
        border-radius: 2.5rem;
        padding: 7.5rem;
        background: linear-gradient(45deg, #89C587,#d9d9d9);
    }
</style>