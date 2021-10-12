import {KayAction} from './action_types';


export const GetFaqData = () => ({
    type: KayAction.GET_FAQ,
  });

  export const GetFaqDataSucess = (data) => ({
    type: KayAction.GET_FAQ_SUCCESS,
    payload:data
  });

  export const QuestioAnswer=(values)=>({
     type: KayAction.PUT_FAQ_QA,
     payload:values
  })
 
