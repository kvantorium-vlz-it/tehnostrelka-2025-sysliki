<script setup lang="ts">


const props = defineProps<{
    city_id:number
}>()

const reactiveProps = toRefs(props)


watch(reactiveProps.city_id, async () => {
    routes.value =  await $fetch(`/api/getAll/route/${props.city_id}`)
    routes.value.map(async(v:any)=>{
            try {
                v._count.rating =  await $fetch(`/api/ratings/${v.id}`,{
                    method:'GET',
                    
                }) 
            } catch {
                v._count.rating = 0 
            }
        })
    }
)
    const routes = ref()
</script>

<template>
    
    <section class="body">
        <div class="routes-list-title-area">
            <h2 class="routes-list-subtitle">Публичные</h2>
            <h1 class="routes-list-title">маршруты</h1>
        </div>
        <div class="list">
            <RouteCard
                :route="{
                    addToFavoriteCount: i._count.favorites || 0,
                    description: i.description,
                    name: i.name,
                    id: i.id,
                    rating: i._count.rating,
                    reviewsCount: i._count.rating || 0,
                    coments: i._count.coments || 0,
                    src: i.route_image[0].image.src 
                }"
                v-for="i in routes"
            />
        </div>
    </section>
</template>

<style scoped>
    .body{
        background-color: #F5F5F5;
        border-radius: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
    .routes-list-title-area{
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
    }
    .routes-list-title{
        font-size: 6.4rem;
        font-weight: 400;
        color: #589977;
    }
    .routes-list-subtitle{
        font-size: 3.2rem;
        font-weight: 400;
        color: #A3A3A3;
    }
    .list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
    }

    @media (min-width: 720px) {
        .list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .list {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (min-width: 1440px) {
        .list {
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>