<template>
    <div class="add-point-block-area">
        <div class="inf-area">
            <p  class="point-number">+</p>
            <p class="point-name">Добавить место</p>
        </div>
    </div>
</template>

<style scoped>
    .add-point-block-area{
        background-color: #EDEDED;
        padding-top: 2rem;
        padding-bottom: 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        padding-left: 2.8rem;
        padding-right: 2rem;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 2rem;
    }
    .inf-area{
        display: flex;
        flex-direction: row;
        gap: 2.4rem;
        align-items: center;
    }
    .point-number{
        font-size: 3.8rem;
        line-height: 1;
    }
    .point-name{
        line-height: 1;
        font-size: 1.6rem;
        width: 35.7rem;
        word-break:inherit;
    }
    .çlose-button{
        width: 3rem;
        height: 3rem;
    }
</style>