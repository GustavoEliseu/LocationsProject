const toRad = (value: number) => (value * Math.PI) / 180;

//Baseado na formula haversine disponível em:  https://en.wikipedia.org/wiki/Haversine_formula
//Também baseado na resposta de : https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
//
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const radLat1 = toRad(lat1);
    const radLat2 = toRad(lat2);
    const DeltaDistLat = toRad(lat2 - lat1);
    const DeltaDistlon = toRad(lon2 - lon1);

    const a = Math.sin(DeltaDistLat / 2) * Math.sin(DeltaDistLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(DeltaDistlon / 2) * Math.sin(DeltaDistlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};