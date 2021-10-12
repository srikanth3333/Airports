//Localization
import I18n from "../localization/language";

//Service
import { request } from "./Service";
import { HTTP_METHODS } from "./api-constants";

//Theme
import { Wrapper } from "../themes/common";

export { I18n, HTTP_METHODS, request, Wrapper };

export const service = {
  I18n,
  HTTP_METHODS,
  request,
  Wrapper,
};
