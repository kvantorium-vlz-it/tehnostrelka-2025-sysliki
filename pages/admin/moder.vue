<script setup lang="ts">

    import { adminUser } from '~/shared/utils/abilities';    
    
    const modereted = ref()
    reloadData()

    async function reloadData() {
        modereted.value = await $fetch('/api/getAll/moder')
    }

    async function approved(route_id:number) {
        await $fetch(`/api/moder/${route_id}`,{
            method:'PUT',
            body:{
                approved:true
            }
        })
        deleteData(route_id)
        reloadData()
    }

    async function deleteData(route_id:number) {
        await $fetch(`/api/moder`,{
            method:'DELETE',
            body:{
                route_id
            }
        })
    }

</script>

<template>
    <Can :ability="adminUser">
        <button @click="reloadData()">обновить</button>
        <div v-if="modereted?.length < 1"><h1 style="justify-content: center; display: flex; color: brown;">неть путей на модерацию</h1></div>
        <h1 v-else>{{modereted?.length}} путь на модерацию</h1>
        <div v-for="moder in modereted">
            <div>
                <h3>route№{{ moder.route_id }}</h3>
                <hr>
                <h3>user№{{ moder.user_id }}</h3>
                <button  @click="approved(moder.route_id)">проверено</button>

            </div>
        </div>

    </Can>

</template>
