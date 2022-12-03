import { createStore } from 'vuex'
import Home from "./Home/index.js";
import Landscape from "./Landscape/index.js";
import Foods from "./Foods/index.js";
import Activity from "./Activity/index.js";
import Hotel from "./Hotel/index.js";

export default createStore({
  modules: {
    Home,
    Landscape,
    Foods,
    Activity,
    Hotel,
  },
});