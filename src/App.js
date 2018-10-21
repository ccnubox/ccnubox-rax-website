import { createElement, Component, render } from "rax";
import View from "rax-view";
import Touchable from "rax-touchable";
import ListView from "rax-listview";
import Image from "rax-image";
const native = require("@weex-module/test");
import SiteServices from "../services/site";
import bookTag from "./assets/book-tag.png";
import arrow from "./assets/arrow.png";

class SitesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteData: []
    };
  }
  componentWillMount() {
    SiteServices.getSites().then(siteData => {
      this.setState({ siteData });
      native.changeLoadingStatus(true);
    });
  }

  listItem = (item, index) => {
    return (
      <Touchable
        onPress={() => {
          native.openBrowser(item.url);
        }}
      >
        <View
          style={[
            styles.item,
            index === 0 ? styles.first : {},
            index === this.state.siteData.length - 1 ? styles.last : {}
          ]}
        >
          <View style={styles.item_left}>
            <Image
              style={styles.bookTag}
              source={bookTag}
              resizeMode="contain"
            />
            <View style={styles.siteText}> {item.site} </View>
          </View>

          <View style={styles.arrowContainer}>
            <Image style={styles.arrow} source={arrow} resizeMode="contain" />
          </View>
        </View>
      </Touchable>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          renderRow={this.listItem}
          dataSource={this.state.siteData}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(239,239,244,1)"
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 20,
    height: 100,
    backgroundColor: "white",
    paddingLeft: 60
  },
  first: {
    marginTop: 45
  },
  item_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  last: {
    marginBottom: 90
  },
  bookTag: {
    flex: 1,
    height: 46,
    marginRight: 50
  },
  siteText: {
    fontSize: 30,
    flex: 2.5
  },
  arrowContainer: {
    flex: 1,
    height: 46,
    width: 160,
    alignItems: "flex-end",
    paddingRight: 60
  },
  arrow: {
    height: 46
  }
};

export default SitesList;
