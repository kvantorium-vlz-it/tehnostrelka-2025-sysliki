<script setup lang="ts">

const { loggedIn, user, session, fetch, clear } = useUserSession()

defineProps<{
    
    username: string
    
    
}>()
</script>

<template>
        <div class="profile-area">
            <section class="menu">
                <section class="user-inf-area">
                    <img src="../public/pics/userphoto.svg" class="userphoto">
                    <p class="username-title">{{username}}</p>
                </section>
                <section class="tab-menu-area">
                    <NuxtLink to="/">
                        <button class="tab-menu-area-button">
                            <img src="../public/pics/home-icon.svg" class="home-icon">
                            <p class="tab-menu-area-title">главная</p>
                        </button>
                    </NuxtLink>
                    <NuxtLink to="/profile/help">
                        <button class="tab-menu-area-button">
                            <img src="../public/pics/question-icon.svg" class="question-icon">
                            <p class="tab-menu-area-title">вопросы и ответы</p>
                        </button>
                    </NuxtLink>
                </section>
                <section class="end"><button @click="clear" class="tab-menu-area-button">
                    <img src="../public/pics/exit-icon.svg" class="exit-icon">
                    <p  class="tab-menu-area-title">выйти</p>
                </button></section>

            </section>
            <slot></slot>
        </div>
</template>

<style scoped>
*{
    Border-radius: 2.5rem;
    Border: none;
}
    .profile-area{
        width: 100%;
        height: 75rem;
        margin-bottom: 5.2rem;
        padding-left: 2rem;
        padding-right: 4rem;
        display: flex;
        gap: 2rem;
        flex-direction: row;
    }
    .home-icon{
        width: 2.4rem;
    }
    .question-icon{
        width: 3rem;
    }
    .exit-icon{
        width: 3rem;
    }
    .menu{
        width: 35.2rem;
        height: 75rem;
        background-color: #FFFFFF;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .tab-menu-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 5rem;
        flex-grow: 1;
    }
    .end{
        justify-self: flex-end;
        width: 100%;
        height: 6.1rem;
    }
    .tab-menu-area-button{
        width: 100%;
        min-height: 6.1rem;
        background-color: #ffffff;
        padding-left: 2rem;
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
        word-wrap: break-word;
    }
    .user-inf-area{
        display: flex;
        flex-direction: row;
        gap: 2rem;
        align-items: center;
    }
    .username-title{
        font-size: 1.6rem;
    }
    .userphoto{
        width: 11.2rem;
        height: 11.2rem;
    }

</style>