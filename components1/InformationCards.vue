
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
                <p class="card-button-title">регистрация</p>
            </button>
        </div>
        <div class="another-card"></div>
    </div>
</template>
<style scoped>
    .information-cards-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin-top: 16.2rem;
        margin-right: 2rem;
        margin-left: 2rem;
        justify-content: center;
    }
    .hello-card{
        width: 109.6rem;
        height: 40.7rem;
        background-color: #89C587;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 7.5rem;
        padding-left: 7.5rem;
        gap: 7rem;
        background-image: url("/pics/inf-hello-card.svg");
    }
    .card-hello-title{
        display: flex;
        flex-direction: column;
    }
    .card-title-w-logo-area{
        display: flex;
        flex-direction: row;
        gap: 1rem;
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
    }
    .another-card{
        width: 72.4rem;
        height: 40.7rem;
        background-color: #d9d9d9;
    }
</style>