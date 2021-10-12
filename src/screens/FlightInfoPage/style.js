import { Dimensions, Platform } from 'react-native'


const { height } = Dimensions.get('window')


export default {
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    scrollPage: {
        paddingBottom: 120
    },
    row: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    firstRow: {
        // paddingTop: 24,
        marginTop:35,
        paddingTop: 64,
        height: 32
    },
    secondRow: {
        marginTop: 50,
        height: 35
    },
    lastUpdate: {
        color: '#ffffff'
    },
    departureTabContainer: {
        marginLeft: 4,
        marginTop: 4,
        height: 24,
        width: 93,
        marginBottom: 4,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrivalTabContainer: {
        marginLeft: 11,
        marginRight: 8,
        marginTop: 4,
        height: 24,
        width: 70,
        marginBottom: 4,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    departureArrivalTabActiveContainer: {
        backgroundColor: 'rgb(249,149,0)',
    },
    departureArrivalTabActive: {
        fontSize: 12,
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
        color: '#FFF',
    },
    departureArrivalTabInactive: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: 'rgb(121,126,134)',
    },
    departureArrivalTabContainer: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 24,
        width:172,
        height: 32,
    },
    langChanger: {
        position: 'absolute',
        marginTop:30,
        right : 60,
        width: 20,
        height: 20
    },
    searchIcon: {
        top: 20,
        right : 10
    },
    locationPicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 12,
        height: 35,
        borderBottomWidth: 1,
        width: 150,
        borderColor: 'rgb(236,236,236)'
    },
    datePicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 12,
        height: 35,
        borderBottomWidth: 1,
        width: 150,
        borderColor: 'rgb(236,236,236)'
    },
    flightList: {
        alignSelf: 'stretch',
    },
    prevFlightBtn: {
        marginBottom: 20
    },
    prevFlightBtnText: {
        color: 'white'
    },
    footerGradientColors: [ 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)' ],
    footer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        top: 100,
    },
    footerInner: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    modalTerminalFilter: {
        flex: 1
    },
    modalFlightTypeFilter: {
        flex: 1,
        alignItems: 'flex-end'
    },
  }