<script setup lang="ts">
definePageMeta({
    layout: 'profile'
})

import { Icon } from '@iconify/vue'

const accordionItems = [
  {
    value: 'item-1',
    title: 'Могу ли я пользоваться этим сайтом за пределами РФ?',
    content: 'Нет. В данный момент модерация допускает создание маршрутов только внутри страны.',
  },
  {
    value: 'item-2',
    title: 'Могу ли я делиться маршрутами с друзьями?',
    content: 'Да. Маршрутами свободно можно делиться.',
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
]
</script>

<template>
    <div class="help-body">
        <AccordionRoot type="single" :collapsible="true" class="accordion-root">
            <template v-for="item in accordionItems" :key="item.value">
                <AccordionItem :value="item.value" class="accordion-item">
                    <AccordionHeader>
                        <AccordionTrigger class="accordion-trigger">
                            <span class="accordion-title-question">{{ item.title }}</span>
                            <Icon icon="radix-icons:chevron-down" aria-label="Expand/Collapse" class="icon"/>
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent class="accordion-content">
                        <div class="accordion-title-answer">{{ item.content }}</div>
                    </AccordionContent>
                </AccordionItem>
            </template>
        </AccordionRoot>
    </div>
</template>

<style scoped>
    .help-body{
        width: 142rem;
        height: 100%;
        display: flex;
    }
    .accordion-trigger[data-state='open'] > .icon {
        transform: rotate(180deg);
      }
    .icon{
        transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
        font-size: 3rem;
    }
    .accordion-content{
        padding-top: 2rem;
        padding-right: 2rem;
        padding-left: 2rem;
    }
    .accordion-content[data-state='open'] {
        animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
    .accordion-content[data-state='closed'] {
        animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
      }
    .accordion-trigger{
        padding: 2rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .accordion-title-answer{
        font-size: 2.4rem;
    }
    .accordion-item{
        border-radius: 0rem;
        overflow: hidden;
    }
    .accordion-title-question{
        font-size: 2.4rem;
        color: #000000;
        text-align: start;
        word-break: inherit;
        width: 90%;
    }
    .accordion-root{
        width: 50%;
        height: auto;
        padding: 2rem;
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    @keyframes slideDown {
        from {
          height: 0;
        }
        to {
          height: var(--radix-accordion-content-height);
        }
    }
      
      @keyframes slideUp {
        from {
          height: var(--radix-accordion-content-height);
        }
        to {
          height: 0;
        }
    }
</style>