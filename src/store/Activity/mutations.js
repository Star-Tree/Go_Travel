export default {
  searchTextInit(state, searchText) {
    state.searchText = searchText;
  },

  oneCityInit(state, oneCity) {
    state.oneCity = oneCity;
  },

  dateTimeInit(state, dateTime) {
    state.dateTime = dateTime;
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

  selectDate(state, date) {
    state.showSearchResultArr = state.showSearchResultArr.filter(item => {
      let startTime = +new Date(item.StartTime);
      let endTime = +new Date(item.EndTime);

      return (date > startTime) && (date < endTime);
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
      item.Description = item.Description.substring(0, 37);

      item.Description += "...";
    });

    state.nearbyOfShowDynamicPageArr = nearbyOfShowDynamicPageArr;
  },

  resetFilterInit(state) {
    state.resetFilter = !state.resetFilter;
  },
}