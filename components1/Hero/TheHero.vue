<template>
    <Container>
        <div class="hero">
            <div>
                <TheHeroTitle city="Волгоград" />

                <div class="features">
                    <TheHeroBadge>
                        <template #top>48 точек</template>
                        <template #bottom>в маршруте</template>
                    </TheHeroBadge>

                    <TheHeroBadge>
                        <template #top>Рейтинг 4.7⭐</template>
                        <template #bottom>По мнению гостей</template>
                    </TheHeroBadge>

                    <TheHeroBadge>
                        <template #top>🏆маршрут месяца🏆</template>
                        <template #bottom>По посещаемости</template>
                    </TheHeroBadge>
                </div>
            </div>

            <div class="buttons">
                <TheHeroButton to="/view-route/" variant="green">
                    Посмотреть маршрут
                </TheHeroButton>

                <TheHeroButton to="/find-tickets/" variant="white">
                    Найти билеты
                </TheHeroButton>
            </div>
        </div>
    </Container>
</template>

<style scoped>
.hero {
    background: url('/pics/hero-background.png');
    background-position: center center;
    border-radius: 2.5rem;
    background-repeat: no-repeat;
    background-size: cover;
    height: 59.2rem;
    padding: 6.7rem 7.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.features {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 4.5rem;
}
.buttons {
    display: flex;
    gap: 2.25rem;
}
</style>