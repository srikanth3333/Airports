import { combineReducers } from "redux";
import { FlightInfoReducer, FlightDepartureInfoReducer } from '../screens/FlightInfo/reducer';
import SplashReducer from '../screens/Auth/reducer';
import ProfileReducer from '../screens/MyProfile/reducer';
import SpecialNeedReducer from "../screens/SpecialAssistance/reducer";
import KeyInfoReducer from '../screens/KeyInfo/reducer';
import PromotionReducer from '../screens/Promotion/reducer';
import flightInfo from "../screens/FlightInfoPage/reducer/flightInfo";
import search from "../screens/FlightInfoPage/reducer/search";
import plans from "../screens/FlightDetailsPage/reducer/plans";
import push from "../screens/FlightDetailsPage/reducer/push";
import trackedFlights from "../screens/FlightDetailsPage/reducer/trackedFlights";
import TransportReducer from "../screens/Transport/reducer";

const appReducer = combineReducers({
    SplashReducer:SplashReducer,
    ProfileReducer:ProfileReducer,
    FlightInfoReducer:FlightInfoReducer,
    FlightDepartureInfo:FlightDepartureInfoReducer,
    SpecialNeed: SpecialNeedReducer,
    KeyInfoReducer:KeyInfoReducer,
    PromotionReducer:PromotionReducer,
    flightInfo: flightInfo,
    plans:plans,
    push:push,
    trackedFlights:trackedFlights,
    search: search,
    Transport:TransportReducer,
})


export default (state, action) =>appReducer(state, action);