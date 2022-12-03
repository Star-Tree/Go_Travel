import { dataAllCity,
         apiGetSpecifyOfFoods,
         apiGetNearbyOfFoods,
         apiGetOneLocationOfFoods,
         uuid } from "@/api/index.js";

export default {
  handSearchTextInit({commit}, searchText = "") {
    commit("searchTextInit", searchText);
  },

  handOneCityInit({commit}, oneCity) {
    commit("oneCityInit", oneCity);
  },

  handCategoryInit({commit}, category) {
    commit("categoryInit", category);
  },

  handAllCityArrInit({commit}) {
    commit("allCityArrInit", dataAllCity);
  },

  async handShowSearchResultArrInit({commit}, {searchText = "", oneCity = ""}) {
    try {
      const res = await apiGetSpecifyOfFoods(searchText, oneCity);

      const searchResultArr = res.data.map(item => {
        if (!item.Address) {
          item.Address = item.City;
        }

        if (!item.Picture.PictureUrl1) {
          item.Picture.PictureUrl1 = "https://i.imgur.com/8IBJ19V.png";
          item.priority = 0;  // 沒有圖片的(使用替代圖片的) 優先權較低 丟到後面
        } else {
          item.priority = 1;  // 本來就有圖片的，優先權較高，丟到前面。
        }

        if (!item.Picture.PictureDescription1) {
          item.Picture.PictureDescription1 = "無";
        }

        item.id = uuid();

        return item;
      });

      // 優先權 較高的資料 丟到 前面，反之 優先權較低，丟到後面。
      searchResultArr.sort((a, b) => (a.priority > b.priority) ? -1 : 1);

      commit("showSearchResultArrInit", searchResultArr);
    }

    catch(error) {
      console.log(error.response.data);
    }
  },

  async handCategoryOfSearchResultArrInit({commit}, {searchResultArr, category}) {
    try {
      const categoryOfSearchResultArr = searchResultArr.filter(item => {
        if (!item.Address) {
          item.Address = item.City;
        }

        if (item.Class === "地方特產") {
          item.Class = "伴手禮";
        }

        item.id = uuid();

        return item.Class === category;
      });

      commit("categoryOfSearchResultArrInit", categoryOfSearchResultArr);
    }

    catch(error) {
      console.log(error.response.data);
    }
  },

  async handNearbyOfSearchResultArrInit({commit}, coordsObj) {
    try {
      const res = await apiGetNearbyOfFoods(coordsObj, 500);
      
      const nearbyOfSearchResultArr = res.data.map(item => {
        if (!item.Address) {
          item.Address = item.City;
        }

        if (!item.Picture.PictureUrl1) {
          item.Picture.PictureUrl1 = "https://i.imgur.com/8IBJ19V.png";
          item.priority = 0;  // 沒有圖片的(使用替代圖片的) 優先權較低 丟到後面
        } else {
          item.priority = 1;  // 本來就有圖片的，優先權較高，丟到前面。
        }

        if (!item.Picture.PictureDescription1) {
          item.Picture.PictureDescription1 = "無";
        }

        item.id = uuid();

        return item;
      });

      // 優先權 較高的資料 丟到 前面，反之 優先權較低，丟到後面。
      nearbyOfSearchResultArr.sort((a, b) => (a.priority > b.priority) ? -1 : 1);

      commit("nearbyOfSearchResultArrInit", nearbyOfSearchResultArr);
    }

    catch(error) {
      console.log(error.response.data);
    }
  },

  handChangeSelectRelevantOrNearby({commit}, selectOption) {
    commit("changeSelectRelevantOrNearby", selectOption);
  },

  async handShowDynamicPageArrInit({commit}, scenicSpotID) {
    try {
      const res = await apiGetOneLocationOfFoods(scenicSpotID);
      const dynamicPageArr = res.data[0];

      const KeyPropertiesArr = [
        "Phone",
        "Address",
        "OpenTime",
        "Description",
        "ParkingInfo",
        "WebsiteUrl",
      ];

      for(let properties of KeyPropertiesArr) {
        if (!dynamicPageArr[properties]) {
          dynamicPageArr[properties] = "無";
        } else {
          dynamicPageArr[properties] = dynamicPageArr[properties].replaceAll("。", "。<br / ><br />");
        }
      }

      if (!dynamicPageArr.Picture.PictureUrl1) {
        dynamicPageArr.Picture.PictureUrl1 = "https://i.imgur.com/SYBNVWd.png";
      }

      if (!dynamicPageArr.Picture.PictureDescription1) {
        dynamicPageArr.Picture.PictureDescription1 = "無";
      }

      commit("showDynamicPageArrInit", dynamicPageArr);
    }

    catch(error) {
      console.log(error.response.data);
    }
  },

  async handNearbyOfShowDynamicPageArrInit({commit}, coordsObj) {
    try {  // 取得動態分頁位置的 附近0.5公里內的其他位置項目。
      const res = await apiGetNearbyOfFoods(coordsObj, 500);
      
      const tempArr = res.data.filter((item, index) => {
        if (!item.Address) {
          item.Address = item.City;
        }

        if (!item.Picture.PictureUrl1) {
          item.Picture.PictureUrl1 = "https://i.imgur.com/8IBJ19V.png";
          item.priority = 0;  // 沒有圖片的(使用替代圖片的) 優先權較低 丟到後面
        } else {
          item.priority = 1;  // 本來就有圖片的，優先權較高，丟到前面。
        }

        if (!item.Picture.PictureDescription1) {
          item.Picture.PictureDescription1 = "無";
        }

        item.id = uuid();

        // 跳過自己 && 取陣列中 前4筆(有可能是3筆資料 或 4筆資料)
        return (item.RestaurantID !== coordsObj.currentId) && index < 4;
      });

      // 嚴謹一點，再篩選一次，無論是3筆 或 4筆，就是只取前面3筆資料
      const nearbyOfShowDynamicPageArr = tempArr.filter((item, index) => index < 3);

      // 優先權 較高的資料 丟到 前面，反之 優先權較低，丟到後面。
      nearbyOfShowDynamicPageArr.sort((a, b) => (a.priority > b.priority) ? -1 : 1);

      commit("nearbyOfShowDynamicPageArrInit", nearbyOfShowDynamicPageArr);
    }

    catch(error) {
      console.log(error.response.data);
    }
  },

  handResetFilterInit({commit}) {
    commit("resetFilterInit");
  },
};