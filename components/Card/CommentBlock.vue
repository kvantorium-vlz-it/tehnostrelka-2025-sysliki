<script setup lang="ts">

</script>
<template>
    <div class="body">
        <div class="comment-area">
            <h1 class="username-title">Username</h1>
            <p class="comment-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, suscipit! Cum vel, expedita velit nam veniam totam obcaecati debitis voluptates minus. Ea nobis accusantium ullam unde incidunt aspernatur minus consequatur.</p>
        </div>
    </div>
</template>

<style scoped>
    .username-title{
        font-size: 1.6rem;
        font-weight: 400;
    }       
    .comment-area{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .comment-title{
        font-size: 2rem;
    }
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
</style>