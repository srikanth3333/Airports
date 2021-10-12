 import { createStore, applyMiddleware } from "redux";
 import { createLogger } from "redux-logger";
 import createSagaMiddleware from "redux-saga";
 import { persistStore, persistReducer } from "redux-persist";
 import AsyncStorage from "@react-native-community/async-storage";
 import { flightInfo, search} from '../reducers/actions/index'
 // Imports: Redux Root Reducer
 import appReducer from "../reducers";

 // Imports: Redux Root Saga
 import { rootSaga } from "../sagas";

 // Middleware: Redux Saga
 const sagaMiddleware = createSagaMiddleware();

 // Middleware: Redux Persist Config
 const persistConfig = {
   timeout: 0,
   // Root?
   key: "root",
   // Storage Method (React Native)
   storage: AsyncStorage,
   // Whitelist (Save Specific Reducers)
 };

 // Middleware: Redux Persist Persisted Reducer
 const persistedReducer = persistReducer(persistConfig, appReducer);

 // Redux: Store
//  const store = createStore(
//     appReducer,
//    applyMiddleware(sagaMiddleware, createLogger()),
//  );

 const store = createStore(
   persistedReducer,
   applyMiddleware(sagaMiddleware, createLogger()),
 );

 // Middleware: Redux Persist Persister
//  let persistor = persistStore(store);
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

 // Exports
 export default store;

 export const initializeStore = () => {
  // store.dispatch(storage.loadData())

  console.warn('set terminal==> 1')
  // store.dispatch(terminal.getTerminalPlaceList())
  store.dispatch(flightInfo.fetchTailImages())
  store.dispatch(search.fetchFlightMetadata())
}
