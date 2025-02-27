<script setup lang="js">

    // Функция для вычисления расстояния между двумя точками на сфере (в метрах)
    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Радиус Земли в км
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // Расстояние в метрах
    }

    // Функция для поиска точек в радиусе
    function findPointsInRadius(center, points, radiusMeters) {
        return points.filter(point => {
            const distance = haversine(center.lat, center.lon, point.lat, point.lon);
            return distance <= radiusMeters;
        });
    }

    // // Пример данных
    // const center = { lat: 55.7558, lon: 37.6176 }; // Центр (Москва)

    // const points = [
    //     { id: 1, name: "Точка 1", lat: 55.7520, lon: 37.6155, description: "Рядом с Кремлём" },
    //     { id: 2, name: "Точка 2", lat: 55.7495, lon: 37.6236, description: "Недалеко от центра" },
    //     { id: 3, name: "Точка 3", lat: 59.9343, lon: 30.3351, description: "Санкт-Петербург" },
    //     { id: 4, name: "Точка 4", lat: 55.7586, lon: 37.6194, description: "Ещё одна точка в Москве" },
    // ];

    // const radiusMeters = 1000; // Радиус 1000 метров (1 км)
    // const pointsInRadius = findPointsInRadius(center, points, radiusMeters);

    // console.log(pointsInRadius);
</script>