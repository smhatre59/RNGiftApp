/**
 * @file central place to store/register all screens
 */

import { Navigation } from "react-native-navigation";
import Drawer from "./pages/global/Drawer.js";
import Cards from "./pages/appscreens/Cards";
export function registerScreens(store, Provider) {
  Navigation.registerComponent("app.Drawer", () => Drawer);
  Navigation.registerComponent("app.Cards", () => Cards, store, Provider);
}
