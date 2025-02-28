<script setup lang="ts">
defineProps<{
    place: string
    rating: number
}>()

const isSave = ref(true);
const save = 'pics/save-icon.svg';
const saved = 'pics/saved-icon.svg';

function toggleImage() {
    isSave.value = !isSave.value;
}
</script>

<template>
    <div class="body-card">
        <img src="/pics/rest-g.svg" class="place-picture">
        <div class="lya">
            <div class="inf-in-card-area">
                <button class="save-button" @click="toggleImage">
                    <img :src="isSave ? save : saved" class="save-icon" >
                </button>
                <div class="place-inf-area">
                    <!-- <star-rating :rating="3.8" :read-only="true" :increment="0.01"></star-rating> -->
                    <h2 class="places-name-title">{{place}}</h2>
                    <button class="view-place-button"><p class="view-place-title">посмотреть</p></button>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .body-card{
        width: 34.7rem;
        height: 42.8rem;
    }
    .lya{
        padding: 2rem;
    }
    .inf-in-card-area{
        width: 100%;
        height: 38.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .save-button{
        
        background-color: #FFFFFF42;
        width: 5rem;
        height: 5rem;
        border: none;
        border-radius: 1rem;
        backdrop-filter: blur(4.2rem);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
    }
    .save-icon{
        width: 3rem;
        height: 3rem;
    }
    .place-inf-area{
        flex: 1;
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        gap: 2.9rem;
        width: 100%;
        height: 100%;
    }
    .places-name-title{
        font-size: 3.2rem;
        font-weight: 400;
        color: #FFFFFF;
        word-wrap: break-word;
    }
    .view-place-title{
        font-size: 1.6rem;
        line-height: 1rem;
    }
    .view-place-button{
        background-color: #FFFFFF;
        border: none;
        width: 100%;
        padding-top: 2.125rem;
        padding-bottom: 2.225rem;
    }
    .place-picture{
        z-index: -1;
        position: absolute;
        width: 34.7rem;
        height: 42.8rem;
    }
</style>