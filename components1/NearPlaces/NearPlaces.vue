<template>
    <Container>
        <div class="near-places">
            <div class="heading">
                Места рядом
            </div>

            <div class="list">
                <PlaceCard
                    v-for="i in 20"
                    :place="{
                        id: i,
                        image: 'https://images.unsplash.com/photo-1740175541716-ba5561127a72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        name: `place ${i}`,
                        rating: i
                    }"
                />
            </div>
        </div>
    </Container>
</template>

<style scoped>
.heading {
    font-size: 4rem;
    color: #589977;
    margin-bottom: 1.25rem;
}
.list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
}
</style>