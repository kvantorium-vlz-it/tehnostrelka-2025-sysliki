<template>
    <div class="footer">
        <h1 class="logo">MAP<br>PER</h1>
        <ul class="foooter-options-list">
            <label class="foooter-options-list-title">Навигация</label>
            <li class="foooter-options-list-item">Маршрут месяца</li>
            <li class="foooter-options-list-item">Регистрация</li>
            <li class="foooter-options-list-item">Места рядом</li>
            <li class="foooter-options-list-item">Публичные маршруты</li>
            <li class="foooter-options-list-item">Профиль</li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
    .footer{
        width: 100%;
        background-color: #89C587;
        padding: 2rem;
        border-radius: 2.5rem 2.5rem 0 0;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 2rem;
        align-items: start;
    }
    .logo{
        font-weight: 400;
        font-size: 11rem;
        color: #FFFFFF;
        font-family: Righteous;
        line-height: 0.75;
    }
    .foooter-options-list{
        text-decoration: none;
    }
    .foooter-options-list-title{
        font-size: 1.6rem;
        color: #FFFFFF80;
    }
    .foooter-options-list-item{
        list-style-type: none;
        font-size: 1.6rem;
        color: #FFFFFF;
        line-height: 1.5;
    }
</style>