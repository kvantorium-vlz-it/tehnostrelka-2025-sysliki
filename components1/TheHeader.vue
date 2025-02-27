<script setup lang="ts">
</script>

<template>
    <Container>
        <div class="header">
            <NuxtLink to="/" class="logo">
                MAP<br>PER
            </NuxtLink>
            
            <NuxtLink to="/profile" class="profile">
                <Icon name="mdi:user" />

                Профиль
            </NuxtLink>
        </div>
    </Container>
</template>

<style scoped>
    .header {
        padding-block: 3.4rem;
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        align-items: center;
    }
    .logo {
        font-family: Righteous;
        line-height: 0.75;
        color: #000000;
        font-size: 2.7rem;
        text-decoration: none;
    }
    .profile {
        font-size: 1.6rem;
        color: #000000;
        line-height: 1.2;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
    }
</style>