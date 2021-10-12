import { createSelector } from "reselect";
import { get, isEmpty } from "lodash";

const getAirport = (state) =>state.PromotionReducer.TerminalState === 'KLIA' ? 'klia1' : 'klia2';

const getPromotions = (state) => state.PromotionReducer.PromotionData || {};

const getAllPlaces = (state) =>
  get(state, "terminal.unfiltered.contentBlocks", []);

const getSubCat = (subCats = [], places) => {
  return subCats.map((subCat) => {
    const poiArr = [];
    const poiItemsList = get(subCat, "contentBlock.poiItemsList", []);
    if (!isEmpty(poiItemsList)) {
      poiItemsList.forEach(({ name = "" }) => {
        const poi = places.find((p) => name.includes(p.path));
        if (!isEmpty(poi)) {
          poiArr.push(poi);
        }
      });
    }

    return {
      ...subCat,
      pois: poiArr,
    };
  });
};

export const getPromotionPageData = createSelector(
  [getAirport, getPromotions, getAllPlaces],

  (airport, promo,places) => {
    console.log("promo==>" + JSON.stringify(promo));
    const promoData = get(promo, `${airport}.0`,[]);
    return {
      ...promoData,
      subCategories: getSubCat(promoData.subCategories, places),
    };
  }
);
