<template>
    <div class="position">
        <div class="header">
            <div class="header-menu-area">
                <NuxtLink to="/">
                    <div class="logo-area">
                        <h1 class="logo-style">MAP</h1>
                        <h1 class="logo-style">PER</h1>
                    </div>
                </NuxtLink>
                
                <NuxtLink to="/Profile">
                    <div class="account-go-area">
                        <img src="public/pics/account.svg" class="account-icon">
                        <p class="account-title">профиль</p>
                    </div>
                </NuxtLink>
            </div>
        </div>   
    </div>
</template>
<!-- .position{
    position: sticky;
    top: 0;
    z-index: 2;
} -->
<style scoped>
    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFFFFF;
    }
    
    .header-menu-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 3.4rem;
        margin-bottom: 3.4rem;
        width: 100%;
    }
    .logo-area{
        display: flex;
        flex-direction: column;
        padding-left: 6.4rem;
    }
    .logo-style{
        font-family: Righteous;
        font-size: 3.5rem;
        line-height: 0.85;
        font-weight: 400;
        color: #000000;
    }
    .account-go-area{
        display: flex;
        flex-direction: row;
        gap: 0.3rem;
        align-items: center;
        padding-right: 6.4rem;
    }
    .account-icon{
        width: 2.4rem;
        height: 2.4rem;
    }
    .account-title{
        font-size: 1.6rem;
        line-height: 0;
        color: #000000;
    }
    
</style>