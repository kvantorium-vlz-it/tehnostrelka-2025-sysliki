<template>
    <div class="badge">
        <div class="badge-top">
            <slot name="top"></slot>
        </div>
        <div class="badge-bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<style scoped>
.badge {
    padding: 1.4rem 1.3rem;
    background-color: #FFFFFF;
    border-radius: 100vw;
}
.badge-top {
    font-size: 1.6rem;
    color: black;
    text-align: center;
}
.badge-bottom {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
}
</style>