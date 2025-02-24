<script setup lang="ts">
import { number } from 'zod'



    const citys = ref()
    const name =  ref() 
    reloadData()
    async function reloadData() {
       citys.value = await $fetch('/api/getAll/city')
    }


    async function createCity() {
        if (name.value!='') {
            
            await $fetch('/api/city',{
                method:'POST',
                body:{
                    name:name.value
                }
            })
            name.value=''
            reloadData()
        }
    }


    async function deleteCity(id:number) {
        await $fetch(`/api/city/${id}`,{method:'DELETE'})
        reloadData()
    }
</script>


<template>
<div>
<button @click="reloadData">обновить</button> <button @click="createCity">создать</button> <input type="text" v-model="name">
<hr>
</div>
<div v-for="city in citys">
    <div style="display: block; border: solid black 1px; border-radius: 20px; padding: 1%;">
        <h3>id: {{ city.id }}</h3>
        <h4>name: {{ city.name }}</h4>
        <hr>
        <button @click="deleteCity(city.id)">удалить</button>
    </div>
</div>

</template>