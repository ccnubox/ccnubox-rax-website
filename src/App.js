import { createElement, Component, render } from "rax";
import View from "rax-view";
import Text from "rax-text";
import ListView from "rax-listview";
import Image from "rax-image";
import Link from "rax-link";
// const native = require("@weex-module/test");
import SiteServices from "../services/site";

let bookTag = {
  uri: "http://p9j8ahs4w.bkt.clouddn.com/ccnu-rax-web/book-tag.png"
};
let arrow = {
  uri: "http://p9j8ahs4w.bkt.clouddn.com/ccnu-rax-web/arrow.png"
};
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
      // native.changeLoadingStatus(true);
    });
  }

  listItem = (item, index) => {
    return (
      <View
        style={[
          styles.item,
          index === 0 ? styles.first : {},
          index === this.state.siteData.length - 1 ? styles.last : {}
        ]}
      >
        <Image style={styles.bookTag} source={bookTag} resizeMode="contain" />
        <View style={styles.siteText}> {item.site} </View>
        <Link style={styles.arrowContainer} href={item.url}>
          <Image style={styles.arrow} source={arrow} resizeMode="contain" />
        </Link>
      </View>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(239,239,244,1)"
  },

  listView: {
    width: 750
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
    height: 100,
    backgroundColor: "white"
  },
  first: {
    marginTop: 45
  },
  last: {
    marginBottom: 90
  },
  bookTag: {
    flex: 1,
    height: 46
  },
  siteText: {
    fontSize: 30,
    flex: 2.5
  },
  arrowContainer: {
    flex: 1,
    height: 46
  },
  arrow: {
    height: 46
  }
};

export default SitesList;
