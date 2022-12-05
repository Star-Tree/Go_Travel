# Side Project
  * ## Taiwan Travel (latest version: v2.1)
    ### [Prototype(Demo)](https://star-tree.github.io/travel/)
    ### [Mockup](https://www.figma.com/file/jp0DadTSAJQEH7TYO2Y1Eg/Week1---%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=2166%3A2566)
    ### [Images](https://www.figma.com/file/jp0DadTSAJQEH7TYO2Y1Eg/Week1---%E5%8F%B0%E7%81%A3%E6%97%85%E9%81%8A%E6%99%AF%E9%BB%9E%E5%B0%8E%E8%A6%BD?node-id=67%3A1099)
    <div align=center>
      <img src="https://i.imgur.com/DxnV30y.png" alt="Taiwan travel website" title="Taiwan travel website." width="75%">
    </div><br>
---
* ### Introduction:
    #### This project is a SPA(Single Page Application) website that applies RWD(Responsive Web Design).
    #### The target is an easy-to-use website for Taiwan travel.
    #### Users can find landscapes, food, activities, and hotel in Taiwan's cities.
    #### On the homepage, it provides recommended items (ex. landscapes,  foods, activities).
    #### When users enter the search page, they can search for a specific target by keywords and they can do a combined search with a select city. 
    #### In addition, users can search for nearby items (ex. landscape, food, activity, and hotel) by nearby search.
    #### On the search page, users can use the category button to filter items for category by click.
    #### When the user enters the search target's dynamic page, the page recommends nearby items at the bottom.
    * #### Sites Language: Traditional Chinese
    * #### User Device: Support PC、tablet and mobile.
    
    <div align=center>
      <img display=inline src="https://i.imgur.com/hQrSkU9.png" alt="Taiwan travel for search page" title="Taiwan travel for search page" width="75%">
    </div>
---
* ### Copyright:
  #### Front-End Developer: [Rex Wang](https://www.facebook.com/RexWang0315/)
  #### Designer: [Lola Lin](https://www.facebook.com/lolalin225) [(Behance)](https://www.behance.net/chikoriri0225?fbclid=IwAR0V9LvdHlqGDgtrcnG_N2-leNw0N7H81gmfxctMVHep9gdVvG3DCfesVIc&)
  #### Source: [Public Transport Data eXchange(TDX) of the Ministry of Communications of the Republic of China](https://tdx.transportdata.tw/)
---
* ### Technology:
  #### Framework: [Vue 3 (Composition API)](https://github.com/vuejs/core)
  #### State Management: [Vuex](https://github.com/vuejs/vuex)
  #### Router: [Vue Router (Html 5 mode)](https://github.com/vuejs/vue-router)
  #### Build Tool: [Vue CLI](https://github.com/vuejs/vue-cli)
  #### AJAX: [Axios](https://github.com/axios/axios)
  #### Preprocessor: [SCSS](https://sass-lang.com)
  #### Version Control: [Git](https://git-scm.com/)、[GitHub](https://github.com/)
---
* ### Third-Party Library:
  #### Querystring Parsing and Stringifying: [qs](https://github.com/ljharb/qs)
  #### Popup Boxes: [sweetalert2](https://github.com/sweetalert2/sweetalert2)
  #### Unique Identifier: [uuid](https://github.com/uuidjs/uuid)
  #### Map: [@googlemaps/js-api-loader](https://github.com/googlemaps/js-api-loader)
---
* ### APIs:
  * #### User-Defined:
    ##### (in src/composition-api/index.js)
    * ##### `useHandImgLoad`: Load Images<br><br>
    
    ##### (in src/api/index.js)
    * ##### `apiGetSpecifyOfLandscape`: Get a specific landscape for data in Taiwan (Keyword & City)
    * ##### `apiGetNearbyOfLandscape`: Get nearby landscape for data in Taiwan
    * ##### `apiGetOneLocationOfLandscape`: Get a landscape for data in Taiwan<br><br>
  
    * ##### `apiGetSpecifyOfFoods`: Get a specific food for data in Taiwan (Keyword & City)
    * ##### `apiGetNearbyOfFoods`: Get nearby food for data in Taiwan
    * ##### `apiGetOneLocationOfFoods`: Get a food for data in Taiwan<br><br>
  
    * ##### `apiGetSpecifyOfActivity`: Get a specific activity for data in Taiwan (Keyword & City)
    * ##### `apiGetNearbyOfActivity`: Get nearby activity for data in Taiwan
    * ##### `apiGetOneLocationOfActivity`: Get an activity for data in Taiwan<br><br>
  
    * ##### `apiGetSpecifyOfHotel`: Get a specific hotel for data in Taiwan (Keyword & City)
    * ##### `apiGetNearbyOfHotel`: Get nearby hotel for data in Taiwan
    * ##### `apiGetOneLocationOfHotel`: Get a hotel for data in Taiwan<br><br>

  * #### Base URL:
    #### from [Transport Data eXchange(TDX) API for Tourism](https://tdx.transportdata.tw/api-service/swagger#/Tourism)
    * ##### `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot` : <br>
      ##### Get data for landscape in Taiwan (in src/api/scenicSpot.js)
      
    * ##### `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant` : <br>
      ##### Get data for food in Taiwan (in src/api/restaurant.js)
      
    * ##### `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity` : <br>
      ##### Get data for activity in Taiwan (in src/api/activity.js)
      
    * ##### `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel` : 
      ##### Get data for hotel in Taiwan (in src/api/hotel.js)
---
* ### Wireframe:
  #### (at https://whimsical.com/travel-BYSQ3H8TM3EBvJcgJeYuDw)
  * #### [App.vue(Root)](https://whimsical.com/app-vue-root-THxpA5DnWC4kusPe4ZNFQh) <Layout: nav、footer、off-canvas menu>
  * #### [Home.vue(Home page)](https://whimsical.com/home-vue-home-page-6sCEJy9KrjFR66GSSqAJv2)
  * #### [index.vue(Search page)](https://whimsical.com/index-vue-search-page-CebYkS9jcZwjYU2WNXLR5G) <It's used for 4 search pages>
  * #### [_id.vue(Dynamic page)](https://whimsical.com/id-vue-dynamic-page-Wjsf5Kn23A4WG91UctQVVc) <It's used for 4 dynamic pages>
---
* ### SCSS:
  #### (in src/assets/scss/)
  #### 1. all.scss (Import other scss，order by 2 to 5)
  #### 2. _reset.scss (Clear default style of browser & Setting default font)
  #### 3. _grid.scss (Responsive Web Design layout: tablet & mobile) (Desktop first)
  #### 4. _mixin.scss (User-defined template，ex. off-canvas, load logo, load background image and setting horizontal line)
  #### 5. module/_text.scss (Setting layout of text)
---
* ###  UX:
  * #### When the user uses a mobile device(tablet or phone), the default is most people's dominant hand(right hand) that swipes the off-canvas menu， then clicks options and closes the menu by closing the button at the top right.
  * #### Considering the size of different devices, the search results have different layouts.
    #### (e.g. PC: Three columns in one column, tablet: two columns in one column, mobile: one column in one column)
  * #### When users use a mobile device that considers the size of the screen, the filter feature is integrated into the button for the filter range. By clicking the button, the user can call the filter menu from bottom to top.
  * #### Considering that when the user scrolls the screen too much, but the user wants to move directly to the top. We set the top button (the symbol is the up arrow) at the bottom right of the screen.
  * #### When the user enters a dynamic page from the search page, we set up a conspicuous bounce mark in the map information(Google Map), that's purpose is to help the user mark the search target.

<div align=center>
   <img display=inline src="https://i.imgur.com/cll1RuV.png" alt="Taiwan travel for search page" title="Taiwan travel for search page" width="75%">
</div>
