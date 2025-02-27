<template>
    <Container>
        <div class="header">
            <NuxtLink class="logo" to="/">
                MAP<br>PER
            </NuxtLink>

            <SelectRoot v-model="selectedCityId">
                <SelectTrigger>
                    <SelectValue placeholder="Город" />
                    <Icon
                        name="mdi:chevron-down"
                    />
                </SelectTrigger>

                <SelectPortal>
                    <SelectContent
                        :side-offset="5"
                    >
                        <SelectScrollUpButton>
                            <Icon name="mdi:chevron-down" />
                        </SelectScrollUpButton>

                        <SelectViewport>

                            <SelectLabel>
                                Город
                            </SelectLabel>

                            <SelectGroup>
                                <SelectItem
                                    v-for="(option, index) in cities"
                                    :key="index"
                                    :value="'' + option.id"
                                >
                                    <SelectItemIndicator>
                                        <Icon name="mdi:check" />
                                    </SelectItemIndicator>
                                    <SelectItemText>
                                        {{ option.name }}
                                    </SelectItemText>
                                </SelectItem>
                            </SelectGroup>
                        </SelectViewport>
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
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

const selectedCityId = defineModel<string>('selectedCityId')

const { data: cities } = await useAsyncData('cities', () => $fetch('/api/getAll/city'))
</script>

<style>
.header {
    padding-block: 3.4rem;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
}
.logo {
    font-family: Righteous;
    line-height: 0.75;
    color: #000;
    font-size: 2.7rem;
    text-decoration: none;
}
.profile {
    font-size: 1.6rem;
    color: #000;
    line-height: 1.2;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}
</style>