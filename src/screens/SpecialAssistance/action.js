import { SPECIAL_ASSISTANCE } from "./types";
export const GetTravellingData = (params) => {
    console.log("called the actionnnnn");
    return {
        type: SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_REQUEST,
        params
    };
}