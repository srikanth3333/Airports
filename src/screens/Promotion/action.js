import { PromotionAction } from "./action_types";

export const getPromotion = () => ({
  type: PromotionAction.GET_PROMOTIONS
});

export const getPromotionSucess = (data) => ({
  type: PromotionAction.GET_PROMOTIONS_SUCESS,
  payload: data,
});

export const getPromotionError = (data) => ({
    type: PromotionAction.GET_PROMOTIONS_ERROR,
    payload: data,
  });

export const terminalDispatch=(data)=>({
  type: PromotionAction.TERMINAL_STATE,
  payload: data,
})
  