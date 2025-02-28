
<template>
    <Container>
        <div class="header">
            <NuxtLink class="logo" to="/">
                MAP<br>PER
            </NuxtLink>

            <SelectRoot v-model="selectedCityId">
                <SelectTrigger  class="select-trigger">
                    <SelectValue placeholder="Город" />
                    <Icon 
                        class="icon-open"
                        name="mdi:chevron-down"
                    />
                </SelectTrigger>

                <SelectPortal>
                    <SelectContent
                        class="select-content"
                        :side-offset="5"
                    >
                        <SelectScrollUpButton>
                            <Icon name="mdi:chevron-down" />
                        </SelectScrollUpButton>

                        <SelectViewport class="select-viewport">
                            <SelectGroup>
                                <SelectItem
                                class="select-item"
                                    v-for="(option, index) in cities"
                                    :key="index"
                                    :value="'' + option.id"
                                >
                                    <SelectItemIndicator 
                                        class="select-item-indicator">
                                        <Icon name="mdi:check" />
                                    </SelectItemIndicator>
                                    <SelectItemText>
                                        {{ option.name }}
                                    </SelectItemText>
                                </SelectItem>
                            </SelectGroup>
                        </SelectViewport>
                        <SelectScrollDownButton class="select-scroll-button">
                            <Icon name="radix-icons:chevron-down" />
                        </SelectScrollDownButton>
                    </SelectContent>
                </SelectPortal>
            </SelectRoot>

            <NuxtLink class="profile" to="/profile">
                <Icon name="mdi:user" />

                Профиль
            </NuxtLink>
        </div>
    </Container>
</template>

<script lang="ts" setup>


const selectedCityId = defineModel<string>('selectedCityId')

const { data: cities } = await useAsyncData('cities', () => $fetch('/api/getAll/city'))
</script>

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
    .select-trigger{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 2.5rem;
        padding: 0.5rem 1.5rem;
        font-size: 1.6rem;
        line-height: 1;
        height: 3.5rem;
        background-color: #FFFFFF;
        border: 0rem 
    }
    .select-viewport{
        padding: 2rem;
    }
    .icon-open{
        font-size: 1.6rem;
        line-height: 1;
    }
    .select-content{
        overflow: hidden;
        background-color: #FFFFFF;
        border-radius: 2.5rem;
    }
    .select-label{
        padding: 0 2rem;
        font-size: 1.6rem;
    }
    .select-item{
        font-size: 1.6rem;
        padding: 0 2rem;
        line-height: 1;
        color: #000000;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        height: 2rem;
        position: relative;
        user-select: none;
    }
    .select-item-indicator{
        position: absolute;
        left: 0;
        width: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .select-scroll-button{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        background-color: #FFFFFF;
        cursor: default;
    }
</style>