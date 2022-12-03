import { bannerImg } from "./bannerImg.js";
import { exploreImg } from "./exploreImg.js";
import { participateImg } from "./participateImg.js";
import { enjoyImg } from "./enjoyImg.js";
import { enjoyReverseImg } from "./enjoyReverseImg.js";
import { allCity } from "./allCity.js";
import { v4 as uuidv4 } from "uuid";

import { getSpecifyOfLandscape,
         getNearbyOfLandscape,
         getOneLocationOfLandscape } from "./scenicSpot.js";

import { getSpecifyOfFoods,
         getNearbyOfFoods,
         getOneLocationOfFoods } from "./restaurant.js";

import { getSpecifyOfActivity,
         getNearbyOfActivity,
         getOneLocationOfActivity } from "./activity.js";

import { getSpecifyOfHotel,
         getNearbyOfHotel,
         getOneLocationOfHotel } from "./hotel.js";

export const dataBannerImg = bannerImg;
export const dataExploreImg = exploreImg;
export const dataParticipateImg = participateImg;
export const dataEnjoyImg = enjoyImg;
export const dataEnjoyReverseImg = enjoyReverseImg;
export const dataAllCity = allCity;
export const uuid = uuidv4;

export const apiGetSpecifyOfLandscape = getSpecifyOfLandscape;
export const apiGetNearbyOfLandscape = getNearbyOfLandscape;
export const apiGetOneLocationOfLandscape = getOneLocationOfLandscape;

export const apiGetSpecifyOfFoods = getSpecifyOfFoods;
export const apiGetNearbyOfFoods = getNearbyOfFoods;
export const apiGetOneLocationOfFoods = getOneLocationOfFoods;

export const apiGetSpecifyOfActivity = getSpecifyOfActivity;
export const apiGetNearbyOfActivity = getNearbyOfActivity;
export const apiGetOneLocationOfActivity = getOneLocationOfActivity;

export const apiGetSpecifyOfHotel = getSpecifyOfHotel;
export const apiGetNearbyOfHotel = getNearbyOfHotel;
export const apiGetOneLocationOfHotel = getOneLocationOfHotel;