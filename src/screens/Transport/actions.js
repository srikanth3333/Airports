import { TransportType } from "./types";
export const GetTransportData = (params) => {
    console.log("called the actionnnnn of transport");
    
    return {
        type: TransportType.TRANSPORT_REQUEST,
        params
    };
}

export const GetRateData = (params) => {

    console.log(params,"check this params first");
    return {
        type: TransportType.GET_RATE_REQUEST,
        params
    };
}
export const PostRate = (data) => ({
    type: TransportType.POST_RATE_REQUEST,
    payload: data,
});