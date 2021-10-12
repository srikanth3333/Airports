import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { TouchableOpacity, Platform, I18nManager } from "react-native";

import styles from "./styles";

export default class DropdownItem extends PureComponent {
  static defaultProps = {
    color: "transparent",
    disabledColor: "transparent",
    rippleContainerBorderRadius: 0,
    shadeBorderRadius: 0,
  };

  static propTypes = {
    ...TouchableOpacity.propTypes,

    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    let { onPress, index } = this.props;

    if ("function" === typeof onPress) {
      onPress(index);
    }
  }

  render() {
    let { children, style, index, ...props } = this.props;

    return (
      <TouchableOpacity
        {...props}
        style={[
          styles.container,
          style,
          Platform.OS === "ios" && {
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            paddingEnd: I18nManager.isRTL ? 15 : 0,
            width: "98%",
            justifyContent: "flex-start",
          },
          {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            // borderColor: "#f2f2f2",
            paddingEnd: I18nManager.isRTL ? 30 : 0,
          },
        ]}
        onPress={this.onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
