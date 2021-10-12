import React, { Component } from 'react'
import { View,Text,ListView,Image,TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { values } from 'lodash'

import Toggle from '../../components/Toggle'

import style from './style'

class DepartureArrivalTabs extends Component {
    constructor(props) {
      super(props)
      this.state= {
        departureActive: true
      }
      this._handleToggle = this._handleToggle.bind(this)
    }
    _handleToggle(activeIndex) {
      const { departureActive } = this.state
      this.setState({ departureActive: !departureActive })
      if (this.props.onChange) this.props.onChange(!departureActive);
    }
    render() {
        const { departureActive } = this.state;
        const { lang = 'en' } = this.props;
        const textContent = values(I18n.t('flight_info.toggle', { locale : lang }))
        return (
          <Toggle
            options={textContent}
            onToggle={this._handleToggle} />
        )
    }
}

const mapState = state => ({
  lang: state.i18n.currentLanguage
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(DepartureArrivalTabs)