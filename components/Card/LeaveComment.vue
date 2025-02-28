<template>
    <div class="body">
        <input type="text" placeholder="Оставьте свой комменатрий о пройденном маршруте" class="input">
        <button class="send-button">
            <p class="send-button-title">Отправить</p>
        </button>
    </div>
</template>

<style scoped>
    .body{
        background-color: #FFFFFF;
        padding: 2rem;
        width: 112rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2rem;
        border-radius: 2.5rem;
    }
    .input{
        width: 108rem;
        height: 3rem;
        border-radius: 0rem;
        font-size: 2rem;
        overflow: auto;
        resize: vertical;
        outline: none;
        border: none;
    }
    .send-button{
        background-color: #89C587;
        padding: 1rem 2rem;
        border: none;
        border-radius: 2.5rem;
    }
    .send-button-title{
        font-size: 1.6rem;
        color: #FFFFFF;
    }
</style>