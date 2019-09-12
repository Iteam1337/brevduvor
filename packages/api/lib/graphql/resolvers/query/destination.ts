import { QueryResolvers } from '../../../__generated__/brevduvor';


export const allDestinations: QueryResolvers["allDestinations"] = (_, args) => {
    return [
        { alias: "Storuman", lat: 65.090833, lon: 17.1075 },
        { alias: "Kvikkjokk", lat: 66.9501067, lon: 17.708610 },
        { alias: "Slussfors", lat: 65.4308046, lon: 16.2481741 },
    ];
}