<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String
    }
  }
})
</script>
<template>
    <div class="add-point-block-area">
        <div class="inf-area">
            <p  class="point-number">1</p>
            <p class="point-name">{{name}}</p>
        </div>
        <button class="çlose-button">
            <img src="/pics/close-icon.svg"  class="çlose-button">
        </button>
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
    }
    .inf-area{
        display: flex;
        flex-direction: row;
        gap: 2.4rem;
    }
    .point-number{
        font-size: 1.6rem;
    }
    .point-name{
        font-size: 1.6rem;
        width: 35.7rem;
        word-break:inherit;
    }
    .çlose-button{
        width: 3rem;
        height: 3rem;
    }
</style>