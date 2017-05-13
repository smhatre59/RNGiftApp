/**
 * Author:Saurabh Mhatre
 * @file Cards
 * Main home screen page containing cards
 */
import React, { Component, PropTypes } from "react";
import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as projectActions from "../../actions/project.actions";
import * as Animatable from "react-native-animatable";
import ProgessiveImage from "react-native-offline-placeholder";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import styles from "./styles/CardsStyle";
import HTMLView from "react-native-htmlview";
import { Button } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
// Custom components
import ProgressBar from "../global/ProgressBar";
class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      cardView: [],
      currentItem: 0
    };
  }
  componentDidMount() {
    //set loading to false in callback of actions later
    let cardView = this.renderItem(
      this.props.topicData[this.state.currentItem],
      this.state.currentItem
    );
    this.setState({
      isLoading: false,
      cardView
    });
  }
  renderItem(topicItem, index) {
    return (
      <View style={styles.minicardContainer}>
        <View style={styles.titleContainer}>
          <Icon name="toys" size={20} color="red" />
          <Text style={styles.topicTitleText}>
            {topicItem.topicName}
          </Text>
          <Icon name="toys" size={20} color="red" />
        </View>
        <View style={styles.cardContentContainer}>
          <View style={styles.imageContainer}>
            {topicItem.contentType == "image"
              ? <ProgessiveImage
                  source={topicItem.contentUrl}
                  thumbnail={require("../../assets/placeholder.jpg")}
                  style={{ width: viewportWidth - 10, height: 180 }}
                  thumbnailresizeMode={"cover"}
                  thumbnailkey={"pimg"}
                />
              : <View>
                  <VideoPlayer
                    source={topicItem.contentUrl} // Can be a URL or a local file.
                    ref={ref => {
                      this.player = ref;
                    }} // Store reference
                    rate={1.0} // 0 is paused, 1 is normal.
                    volume={1.0} // 0 is muted, 1 is normal.
                    muted={false} // Mutes the audio entirely.
                    paused={false} // Pauses playback entirely.
                    resizeMode="cover" // Fill the whole screen at aspect ratio.*
                    title={"Memories"} //title of video
                    controlTimeout={5000} // hide controls after ms of inactivity.
                    seekColor={"#FFF"} // fill/handle colour of the seekbar
                    repeat={true} // Repeat forever.
                    playInBackground={false} // Audio continues to play when app entering background.
                    playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
                    ignoreSilentSwitch={"ignore"} // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                    progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                    onLoadStart={this.loadStart} // Callback when video starts to load
                    onLoad={this.setDuration} // Callback when video loads
                    onProgress={this.setTime} // Callback every ~250ms with currentTime
                    onEnd={this.onEnd} // Callback when playback finishes
                    onError={this.videoError} // Callback when video cannot be loaded
                    onBuffer={this.onBuffer} // Callback when remote video is buffering
                    onTimedMetadata={this.onTimedMetadata} // Callback when the stream receive some metadata
                    style={styles.backgroundVideo}
                  />
                </View>}
          </View>
          <View style={styles.messageContainer}>
            <ScrollView
              ref={scrollView => {
                _scrollView = scrollView;
              }}
              automaticallyAdjustContentInsets={true}
              scrollEventThrottle={200}
              showsVerticalScrollIndicator={false}
              style={styles.topicMessageScrollView}
              contentContainerStyle={[styles.contentContainer]}
            >
              <HTMLView
                value={topicItem.topicDescription}
                stylesheet={htmlstyles}
                onLinkPress={url => console.log("clicked link: ", url)}
              />
            </ScrollView>
          </View>
        </View>

      </View>
    );
  }
  renderNext(currentIndex) {
    this.refs.view.fadeInLeft(300);
    _scrollView.scrollTo({ x: 0 });
    if (currentIndex < this.props.topicData.length - 1) {
      let nextIndex = parseInt(currentIndex) + 1;
      let cardView = this.renderItem(
        this.props.topicData[nextIndex],
        nextIndex
      );
      this.setState({ cardView: cardView, currentItem: nextIndex });
    } else {
      let nextIndex = 0;
      let cardView = this.renderItem(
        this.props.topicData[nextIndex],
        nextIndex
      );
      this.setState({ cardView: cardView, currentItem: nextIndex });
    }
  }
  renderPrevious(currentIndex) {
    // console.log("previousIndex",currentIndex);
    this.refs.view.fadeInRight(300);
    _scrollView.scrollTo({ x: 0 });
    if (currentIndex > 0) {
      var nextIndex = parseInt(currentIndex) - 1;
      var cardView = this.renderItem(
        this.props.topicData[nextIndex],
        nextIndex
      );
      this.setState({ cardView: cardView, currentItem: nextIndex });
    } else {
      var nextIndex = this.props.topicData.length - 1;
      var cardView = this.renderItem(
        this.props.topicData[nextIndex],
        nextIndex
      );
      this.setState({ cardView: cardView, currentItem: nextIndex });
    }
  }
  render() {
    return this.state.isLoading
      ? <View style={styles.progressBar}>
          <ProgressBar />
        </View>
      : <View>
          <Animatable.View ref="view" style={styles.cardContainer}>
            {this.state.cardView}
          </Animatable.View>
          <View style={styles.buttonContainer}>
            <Button
              full
              info
              style={{
                alignSelf: "flex-start",
                width: viewportWidth / 2,
                height: viewportHeight / 12
              }}
              onPress={() => this.renderPrevious(this.state.currentItem)}
            >
              <Icon name="arrow-back" size={25} color="#ffffff" />
              <Text style={styles.buttonTextStyle}>Previous</Text>
            </Button>
            <Button
              full
              success
              iconRight
              style={{
                marginTop: 0,
                alignSelf: "flex-end",
                width: viewportWidth / 2,
                height: viewportHeight / 12
              }}
              onPress={() => this.renderNext(this.state.currentItem)}
            >
              <Text style={styles.buttonTextStyle}>Next</Text>
              <Icon name="arrow-forward" size={25} color="#ffffff" />
            </Button>
          </View>
        </View>;
  }
}

const fontSize = 18;
const htmlstyles = StyleSheet.create({
  a: {
    fontWeight: "300",
    fontSize: fontSize,
    color: "black"
  },
  p: {
    fontSize: fontSize,
    color: "black"
  },
  strong: {
    fontWeight: "bold",
    fontSize: fontSize,
    color: "black"
  },
  li: {
    fontSize: fontSize
  }
});

Cards.navigatorStyle = {
  navBarTextColor: "white", // change the text color of the title (remembered across pushes)
  navBarBackgroundColor: "black", // change the background color of the nav bar (remembered across pushes)
  navBarButtonColor: "red", // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
  navBarLeftButtonFontSize: 17,
  navBarLeftButtonColor: "red",
  navBarLeftButtonFontWeight: "400",
  navBarRightButtonFontSize: 17,
  navBarRightButtonFontWeight: "600",
  navBarRightButtonColor: "blue",
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

function mapStateToProps(state, ownProps) {
  return {
    topicData: state.projectTopics.topicData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
