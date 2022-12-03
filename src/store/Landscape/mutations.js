export default {
  searchTextInit(state, searchText) {
    state.searchText = searchText;
  },

  oneCityInit(state, oneCity) {
    state.oneCity = oneCity;
  },

  checkboxTicketInit(state, checkboxTicket) {
    state.checkboxTicket = checkboxTicket;
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

  checkTicketInfo(state) {
    state.showSearchResultArr = state.showSearchResultArr.filter(item => {
      return item.TicketInfo !== undefined;
    });
  },

  nearbyOfSearchResultArrInit(state, nearbyOfSearchResultArr) {
    state.showSearchResultArr = nearbyOfSearchResultArr;
  },

  changeSelectRelevantOrNearby(state, selectOption) {
    state.selectRelevantOrNearby = selectOption;
  },

  // 景點動態分頁用
  showDynamicPageArrInit(state, dynamicPageArr) {
    state.showDynamicPageArr = dynamicPageArr;
  },

  nearbyOfShowDynamicPageArrInit(state, nearbyOfShowDynamicPageArr) {
    // 取得的項目，需統一固定只選取描述的前面36個字，並在最後面 加上 ...
    nearbyOfShowDynamicPageArr.forEach(item => {
      item.DescriptionDetail = item.DescriptionDetail.substring(0, 37);

      item.DescriptionDetail += "...";
    });

    state.nearbyOfShowDynamicPageArr = nearbyOfShowDynamicPageArr;
  },

  resetFilterInit(state) {
    state.resetFilter = !state.resetFilter;
  },
}