import React from "react"; // eslint-disable-line
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import { persistStore } from "redux-persist";
import { registerScreens } from "./screens";
import configureStore from "./store/configureStore";

const store = configureStore();
// begin periodically persisting the store
// persistStore(store, {storage: AsyncStorage})

registerScreens(store, Provider);

const navigatorStyle = {
  navBarTextColor: "white", // change the text color of the title (remembered across pushes)
  navBarBackgroundColor: "red", // change the background color of the nav bar (remembered across pushes)
  navBarButtonColor: "white", // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
  navBarHidden: false, // make the nav bar hidden
  navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
  navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
  navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true
  navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
  drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
  drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
  statusBarBlur: false, // blur the area under the status bar, works best with navBarHidden:true
  navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
  tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
  statusBarHideWithNavBar: false, // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
  statusBarTextColorScheme: "dark", //change theme of upper statusbar
  tabBarButtonColor: "#ffff00", // change the color of the tab icons and text (also unselected)
  tabBarSelectedButtonColor: "#ff9900", // change the color of the selected tab icon and text (only selected)
  tabBarBackgroundColor: "#551A8B",
  topTabTextColor: "white",
  titleBarHideOnScroll: true,
  selectedTopTabTextColor: "white",
  selectedTopTabIndicatorColor: "red",
  selectedTopTabIndicatorHeight: 10
};

//
Navigation.startSingleScreenApp({
  screen: {
    screen: "app.Cards", // unique ID registered with Navigation.registerScreen
    title: "Wedding Gift", // title of the screen as appears in the nav bar (optional)
    navigatorStyle: navigatorStyle, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    leftButtons: [
      {
        id: "sideMenu"
      }
    ]
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: "slide-down", // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  drawer: {
    left: {
      screen: "app.Drawer"
    }
  }
});
