export default {
  searchTextInit(state, searchText) {
    state.searchText = searchText;
  },

  oneCityInit(state, oneCity) {
    state.oneCity = oneCity;
  },

  categoryInit(state, category) {
    state.category = category;
  },

  allCityArrInit(state, dataAllCity) {
    state.allCityArr = dataAllCity;
  },

  showSearchResultArrInit(state, searchResultArr) {
    state.showSearchResultArr = searchResultArr;
  },

  categoryOfSearchResultArrInit(state, categoryOfSearchResultArr) {
    state.showSearchResultArr = categoryOfSearchResultArr;
  },

  nearbyOfSearchResultArrInit(state, nearbyOfSearchResultArr) {
    state.showSearchResultArr = nearbyOfSearchResultArr;
  },

  changeSelectRelevantOrNearby(state, selectOption) {
    state.selectRelevantOrNearby = selectOption;
  },

  showDynamicPageArrInit(state, dynamicPageArr) {
    state.showDynamicPageArr = dynamicPageArr;
  },

  nearbyOfShowDynamicPageArrInit(state, nearbyOfShowDynamicPageArr) {
    // 取得的項目，需統一固定只選取描述的前面36個字，並在最後面 加上 ...
    nearbyOfShowDynamicPageArr.forEach(item => {
      item.Description = item.Description.substring(0, 37);

      item.Description += "...";
    });

    state.nearbyOfShowDynamicPageArr = nearbyOfShowDynamicPageArr;
  },

  resetFilterInit(state) {
    state.resetFilter = !state.resetFilter; 
  },
};