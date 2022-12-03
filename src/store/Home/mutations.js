export default {
  mobileMenuIsOpenInit(state) {
    state.mobileMenuIsOpen = !state.mobileMenuIsOpen;
  },

  bannerImgInit(state, bannerImg) {
    state.bannerImgArr = bannerImg;
  },

  bannerImgIsLoadInit(state, bool) {
    state.bannerImgIsLoad = bool;
  },

  nextBannerImg(state) {
    state.bannerImgArrIndex++;

    if (state.bannerImgArrIndex > (state.bannerImgArr.length - 1) ) {
      state.bannerImgArrIndex = 0;
    }
  },

  prevBannerImg(state) {
    state.bannerImgArrIndex--;

    if (state.bannerImgArrIndex < 0) {
      state.bannerImgArrIndex = state.bannerImgArr.length - 1;
    }
  },

  exploreImgInit(state, dataExploreImg) {
    state.exploreImgArr = dataExploreImg;
  },

  participateImgInit(state, dataParticipateImg) {
    state.participateImgArr = dataParticipateImg;
  },

  participateImgArrIndexInit(state, id) {
    state.participateImgArrIndex = id;
  },

  enjoyImgInit(state, dataEnjoyImg) {
    state.enjoyImgArr = dataEnjoyImg;
  },

  enjoyReverseImgInit(state, dataEnjoyReverseImg) {
    state.enjoyReverseImgArr = dataEnjoyReverseImg;
  },
};