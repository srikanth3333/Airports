import axios, { create } from "axios";
import { headerParams } from "./api-constants";
import { HTTP_METHODS, SOMETHING_WENT_WRONG } from "./api-constants";



/**
 * axios object
 */
 const API = create({
    timeout: 60000,
  });


  const getReqJsonHeaders = async () => {
    // cookieID = await AsyncStorage.getItem("cookieID");
    return {
      'Content-Type': 'application/json'
    };
  };

  const getReqTextHeaders = async () => {
    return {
      'Content-Type': 'text/plain'
    };
  }


  export const request = (
    url,
    httpMethod,
    params,
    isPlain,
    header = {},
    isWithToken,
    token,
  ) =>
    new Promise(async (resolve, reject) => {
      try {


        const tokenObj = isWithToken
        ? {
          Authorization: `Bearer ${token}` /*the token is a variable which holds the token */,
        }
        : {};
      const commonJSONHeaders = await getReqJsonHeaders();
      const commonTextHeaders = await getReqTextHeaders();
      let configObj;

      if(isPlain){
        configObj = {
          headers: {
            ...header,
            ...commonTextHeaders,
          },
        };
      } else {
        configObj = {
          headers: {
            ...header,
            ...commonJSONHeaders,
            ...tokenObj
          },
        };
      }
      console.log("<><><><><> start request <><><><><>");
      console.log("<><><><><> url <><><><><>", url);
      console.log("<><><><><> httpMethod <><><><><>", httpMethod);
      console.log("<><><><><> params <><><><><>", JSON.stringify(params));
      console.log("<><><><><> headers <><><><><>", JSON.stringify(configObj.headers));
      console.log("<><><><><> end request <><><><><>");
        switch (httpMethod) {
          // GET
          case HTTP_METHODS.GET:
            doGet(url, resolve, reject, configObj);
            break;

          // POST
          case HTTP_METHODS.POST:
            doPost(url, params, resolve, reject,configObj);
            break;

          // PUT
          case HTTP_METHODS.PUT:
            doPut(url, params, resolve, reject, configObj);
            break;

          // DELETE
          case HTTP_METHODS.DELETE:
            doDelete(url, params, resolve, reject, configObj);
            break;
        }
      } catch (error) {
        reject(error);
      }
    });

  /**
   *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
   * We can consider it as a child promise
   * @param {*} response
   */
  export const parseResponse = (response) =>
    new Promise((parsedResponse) => {
      const isSuccess =
        response.status === 200 || response.status === 202 ? true : false; // 202 is used for Knet-checkout
      if (isSuccess) {
        parsedResponse({ isSuccess: true, response: response });
      } else {
        let message = SOMETHING_WENT_WRONG;
        if (response.data != null && response.data.message) {
          message = response.data.message;
        }
        parsedResponse({ isSuccess: false, message: message });
      }
    });

  /***
   * This function is used for service request with GET as request type
   * and send back completion in resolve or reject based on parent Promise.
   * @param {*} url
   * @param {*} resolve
   * @param {*} reject
   * @param {*} config
   */
  const doGet = (url, resolve, reject) => {
    API.get(url)
      .then((response) => {
        parseResponse(response).then((parsedResponse) => {
          // console.log(`url ${url} response => ${JSON.stringify(response)}`);
          if (parsedResponse.isSuccess) {
            resolve({ response: parsedResponse.response });
          } else {
            reject(parsedResponse.message);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  };

  /***
   * This function is used for service request with POST as request type
   * and send back completion in resolve or reject based on parent Promise.
   * @param {*} url
   * @param {*} resolve
   * @param {*} reject
   * @param {*} config
   */
  const doPost = (url, params, resolve, reject, config = {}) => {
    API.post(url, params, config)
      .then((response) => {
        console.log("url:UD", url);
        console.log("response:UD", response);
        parseResponse(response).then((parsedResponse) => {
          if (parsedResponse.isSuccess) {
            resolve({ response: parsedResponse.response });
          } else {
            reject(parsedResponse.message);
          }
        });
      })
      .catch((error) => {
        console.log(
          `doPost ERROR: URL : ${url},  PARAMS: ${JSON.stringify(
            params
          )}, ERROR MESSAGE : ${error}`
        );
        reject(error);
      });
  };

  /***
   * This function is used for service request with PUT as request type
   * and send back completion in resolve or reject based on parent Promise.
   * @param {*} url
   * @param {*} resolve
   * @param {*} reject
   * @param {*} config
   */
  const doPut = (url, params, resolve, reject, config = {}) => {
    API.put(url, params, config)
      .then((response) => {
        console.log("url:UD", url);
        console.log("response:UD", response);
        parseResponse(response).then((parsedResponse) => {
          if (parsedResponse.isSuccess) {
            resolve({ response: parsedResponse.response });
          } else {
            reject(parsedResponse.message);
          }
        });
      })
      .catch((error) => {
        console.log(
          `doPut ERROR: URL : ${url}, PARAMS: ${JSON.stringify(
            params
          )}, ERROR MESSAGE : ${error}`
        );
        reject(error.response);
      });
  };

  /***
   * This function is used for service request with DELETE as request type
   * and send back completion in resolve or reject based on parent Promise.
   * @param {*} url
   * @param {*} resolve
   * @param {*} reject
   * @param {*} config
   */
  const doDelete = (url, params, resolve, reject, config = {}, DY) => {
    // console.log("DeleteLineItemError==== doDelete called", url);

    API.delete(url, config)
      .then((response) => {
        parseResponse(response).then((parsedResponse) => {
          // console.log(`url ${url} response => ${JSON.stringify(response)}`);
          if (parsedResponse.isSuccess) {
            resolve({ response: parsedResponse.response });
          } else {
            reject(parsedResponse);
          }
        });
      })
      .catch((error) => {
        console.log(
          `doDelete ERROR: URL : ${url}, PARAMS: ${JSON.stringify(
            params
          )}, ERROR MESSAGE : ${error}`
        );
        reject(error.response);
      });
  };

  export const customHeader = async (token) => {
    const selectedMarket = getMarketConfig();
    cookieID = "cookieID";
    const custom = {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
        brand: headerParams.brandApp,
        market: selectedMarket.mas.market,
        language: I18n.locale,
        cookie: cookieID,
        ...getMASKey(),
      },
    };
    return custom;
  };

  export const customHeaderWithoutToken = async () => {
    const selectedMarket = getMarketConfig();

    cookieID = "cookieID";
    const custom = {
      headers: {
        brand: headerParams.brandApp,
        market: selectedMarket.mas.market,
        language: I18n.locale,
        cookie: cookieID,
        ...getMASKey(),
      },
    };
    return custom;
  };

