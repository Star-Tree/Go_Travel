import { dataBannerImg,  
         dataExploreImg,
         dataParticipateImg,
         dataEnjoyImg,
         dataEnjoyReverseImg } from "@/api/index.js";

export default {
  handMobileMenuIsOpenInit({commit}) {
    commit("mobileMenuIsOpenInit");
  },

  async handBannerImgInit({commit}) {
    commit("bannerImgInit", dataBannerImg);

    return dataBannerImg;
  },

  handBannerImgIsLoadInit({commit}, bool) {
    commit("bannerImgIsLoadInit", bool);
  },

  handNextBannerImg({commit}) {
    commit("nextBannerImg");
  },

  handPrevBannerImg({commit}) {
    commit("prevBannerImg");
  },

  async handExploreImgInit({commit}) {
    commit("exploreImgInit", dataExploreImg);

    return dataExploreImg;
  },

  async handParticipateImgInit({commit}) {
    commit("participateImgInit", dataParticipateImg);

    return dataParticipateImg;
  },

  handParticipateImgArrIndexInit({commit}, id) {
    commit("participateImgArrIndexInit", id);
  },

  async handEnjoyImgInit({commit}) {
    commit("enjoyImgInit", dataEnjoyImg);

    return dataEnjoyImg;
  },

  async handEnjoyReverseImgInit({commit}) {
    commit("enjoyReverseImgInit", dataEnjoyReverseImg);

    return dataEnjoyReverseImg;
  },
};