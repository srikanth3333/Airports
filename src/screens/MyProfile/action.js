import { ProfileAction } from "./action_types";

export const loader = (value) => ({
  type: ProfileAction.LOADING,
  payload: value,
});

export const submitFeedBack = ({ data, onSuccess, onError }) => ({
  type: ProfileAction.SUBMIT_FEEDBACK,
  payload: { data, onSuccess, onError },
});
