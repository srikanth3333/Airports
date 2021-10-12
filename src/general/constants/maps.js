// store anything related to map's content here
import { Dimensions } from 'react-native'

export const directionMapName = 'mergedmapswithportalsklia2'

export const INITIAL_BEARING = 148

export const mapStyle = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export const geolocation = {
  'KLIA': {
    latitude: 2.753673,
    longitude: 101.704911
  },
  'KLIA1': {
    latitude: 2.753673,
    longitude: 101.704911
  },
  'klia2': {
    latitude: 2.7427702058382346,
    longitude: 101.68667536228895
  },
  'KLIA2': {
    latitude: 2.7427702058382346,
    longitude: 101.68667536228895
  }
}

export const placeIds = {
  'KLIA': 'ChIJVVX3h3bAzTERFPQUhKKz3mU',
  'klia2': 'ChIJz5pEz5S_zTER9V7E-AAYxbE'
}

export const maxBoundaries = {
  MAX_LAT:2.7913434,
  MIN_LAT:2.6990801,
  MAX_LNG:101.7381748,
  MIN_LNG:101.6712218
}

export const KLIA1_maxBoundaries = {
  MAX_LAT:2.761,
  MIN_LAT:2.740,
  MAX_LNG:101.720,
  MIN_LNG:101.696
}

export const KLIA2_maxBoundaries = {
  MAX_LAT:2.7513434,
  MIN_LAT:2.7390801,
  MAX_LNG:101.6951748,
  MIN_LNG:101.6822218
}

export const terminal_covers = [
  // KLIA 1
  [{"longitude":101.7042804,"latitude":2.7566276},{"longitude":101.7036474,"latitude":2.7561882},{"longitude":101.7041624,"latitude":2.7554273},{"longitude":101.7043233,"latitude":2.7555345},{"longitude":101.704495,"latitude":2.7552773},{"longitude":101.7033363,"latitude":2.7544736},{"longitude":101.7031431,"latitude":2.7547629},{"longitude":101.7033255,"latitude":2.7549022},{"longitude":101.7028105,"latitude":2.7556095},{"longitude":101.702199,"latitude":2.7551809},{"longitude":101.7027033,"latitude":2.7544414},{"longitude":101.7030573,"latitude":2.7546986},{"longitude":101.7032397,"latitude":2.75442},{"longitude":101.7026496,"latitude":2.7540128},{"longitude":101.7028535,"latitude":2.7537234},{"longitude":101.7033899,"latitude":2.7540664},{"longitude":101.7043769,"latitude":2.7525875},{"longitude":101.7049992,"latitude":2.7530269},{"longitude":101.7051923,"latitude":2.7527375},{"longitude":101.7019844,"latitude":2.7504442},{"longitude":101.7021668,"latitude":2.7501763},{"longitude":101.7050314,"latitude":2.7521267},{"longitude":101.7053479,"latitude":2.7517087},{"longitude":101.706276,"latitude":2.7523303},{"longitude":101.7060721,"latitude":2.7526089},{"longitude":101.7060238,"latitude":2.7527644},{"longitude":101.7062598,"latitude":2.7529679},{"longitude":101.7089635,"latitude":2.7548326},{"longitude":101.708749,"latitude":2.7551649},{"longitude":101.706233,"latitude":2.7534341},{"longitude":101.7060452,"latitude":2.7537181},{"longitude":101.7061687,"latitude":2.7538038},{"longitude":101.7051816,"latitude":2.7552987},{"longitude":101.7054713,"latitude":2.7554916},{"longitude":101.7052406,"latitude":2.7557971},{"longitude":101.704613,"latitude":2.7553523},{"longitude":101.7044413,"latitude":2.7556202},{"longitude":101.7047846,"latitude":2.755856},{"longitude":101.7042804,"latitude":2.7566276}]
  ,// KLIA 1 satellite
  [{"longitude":101.7117691,"latitude":2.7504282},{"longitude":101.7118764,"latitude":2.7502514},{"longitude":101.7117691,"latitude":2.7501602},{"longitude":101.7130244,"latitude":2.748317},{"longitude":101.7130136,"latitude":2.7481134},{"longitude":101.7128956,"latitude":2.7478026},{"longitude":101.7111361,"latitude":2.7465809},{"longitude":101.7114365,"latitude":2.7461737},{"longitude":101.7131853,"latitude":2.7473632},{"longitude":101.7134643,"latitude":2.7474061},{"longitude":101.7137003,"latitude":2.7473311},{"longitude":101.7149449,"latitude":2.7454664},{"longitude":101.7150628,"latitude":2.7455522},{"longitude":101.7152345,"latitude":2.7453378},{"longitude":101.7154009,"latitude":2.7454718},{"longitude":101.7152614,"latitude":2.745654},{"longitude":101.7153686,"latitude":2.7457182},{"longitude":101.714108,"latitude":2.7475347},{"longitude":101.7140758,"latitude":2.7477919},{"longitude":101.7141402,"latitude":2.7480491},{"longitude":101.7160446,"latitude":2.7493458},{"longitude":101.7159962,"latitude":2.7494636},{"longitude":101.7161787,"latitude":2.7495708},{"longitude":101.7160392,"latitude":2.7497423},{"longitude":101.7158461,"latitude":2.749603},{"longitude":101.7157388,"latitude":2.7497209},{"longitude":101.7139792,"latitude":2.7484992},{"longitude":101.7137003,"latitude":2.7484778},{"longitude":101.7134321,"latitude":2.7486064},{"longitude":101.712209,"latitude":2.7504389},{"longitude":101.7121017,"latitude":2.7503853},{"longitude":101.7119837,"latitude":2.7505675},{"longitude":101.7117691,"latitude":2.7504282}]
  ,// KLIA 2
  [{"longitude":101.6837347,"latitude":2.7447377},{"longitude":101.6838205,"latitude":2.7445234},{"longitude":101.6827261,"latitude":2.7438054},{"longitude":101.6830158,"latitude":2.7433445},{"longitude":101.6842389,"latitude":2.7441161},{"longitude":101.6844535,"latitude":2.7437946},{"longitude":101.6845822,"latitude":2.7438697},{"longitude":101.6856122,"latitude":2.7424872},{"longitude":101.6854513,"latitude":2.7423693},{"longitude":101.6856766,"latitude":2.7420157},{"longitude":101.6827905,"latitude":2.7398938},{"longitude":101.6829515,"latitude":2.7396688},{"longitude":101.6865134,"latitude":2.7420693},{"longitude":101.6866529,"latitude":2.7418871},{"longitude":101.6869533,"latitude":2.7417692},{"longitude":101.6880047,"latitude":2.7403225},{"longitude":101.6880906,"latitude":2.739926},{"longitude":101.6882086,"latitude":2.7395616},{"longitude":101.6877794,"latitude":2.739283},{"longitude":101.6878438,"latitude":2.7391758},{"longitude":101.6840136,"latitude":2.7365717},{"longitude":101.6841853,"latitude":2.7363466},{"longitude":101.6874361,"latitude":2.7385542},{"longitude":101.6875541,"latitude":2.7385328},{"longitude":101.6881013,"latitude":2.7388757},{"longitude":101.6881979,"latitude":2.7387579},{"longitude":101.6885412,"latitude":2.7390151},{"longitude":101.6887987,"latitude":2.7388329},{"longitude":101.6892815,"latitude":2.7391972},{"longitude":101.6891205,"latitude":2.7394116},{"longitude":101.689539,"latitude":2.7396902},{"longitude":101.689539,"latitude":2.7398081},{"longitude":101.6896462,"latitude":2.7400224},{"longitude":101.693058,"latitude":2.7423372},{"longitude":101.6928756,"latitude":2.7425837},{"longitude":101.6892707,"latitude":2.7401724},{"longitude":101.6891849,"latitude":2.7402367},{"longitude":101.6887558,"latitude":2.7399688},{"longitude":101.6881657,"latitude":2.7404082},{"longitude":101.6872108,"latitude":2.74193},{"longitude":101.6872108,"latitude":2.7421443},{"longitude":101.6870499,"latitude":2.7424658},{"longitude":101.6911805,"latitude":2.745295},{"longitude":101.6910088,"latitude":2.7455307},{"longitude":101.6874897,"latitude":2.7431624},{"longitude":101.6871572,"latitude":2.7436125},{"longitude":101.6869962,"latitude":2.7435267},{"longitude":101.6861272,"latitude":2.7448556},{"longitude":101.6862345,"latitude":2.7449735},{"longitude":101.6859663,"latitude":2.7453914},{"longitude":101.6871786,"latitude":2.7461844},{"longitude":101.6868889,"latitude":2.7465809},{"longitude":101.6857624,"latitude":2.7458951},{"longitude":101.6856444,"latitude":2.7460451},{"longitude":101.6837347,"latitude":2.7447377}]
]

export const KLIA1_POLYGON1_INDEX = 0
export const KLIA1_POLYGON2_INDEX = 1
export const KLIA2_POLYGON_INDEX = 2

const minMaxArray = []
for (var i=0; i<terminal_covers.length;i++) {
  var polygon = terminal_covers[i];
  var minX = polygon[0].latitude, maxX = polygon[0].latitude;
  var minY = polygon[0].longitude, maxY = polygon[0].longitude;
  for (var n = 1; n < polygon.length; n++) {
      var q = polygon[n];
      minX = Math.min(q.latitude, minX);
      maxX = Math.max(q.latitude, maxX);
      minY = Math.min(q.longitude, minY);
      maxY = Math.max(q.longitude, maxY);
  }
  minMaxArray.push({
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  })
}

export const terminal_covers_minMax = minMaxArray

export const boundaryCords = [
{
  "latitude" : maxBoundaries.MAX_LAT,
  "longitude" :  maxBoundaries.MIN_LNG
  },{
    "latitude" :  maxBoundaries.MAX_LAT,
    "longitude" : maxBoundaries.MAX_LNG
  },{
  "latitude" : maxBoundaries.MIN_LAT,
  "longitude" : maxBoundaries.MAX_LNG
  },{
    "latitude" :maxBoundaries.MIN_LAT,
    "longitude" : maxBoundaries.MIN_LNG
  }
]

const { width, height } = Dimensions.get('window')

export const delta_threshold = {
  latitudeDelta: 0.006
}

export const delta = {
  latitudeDelta: 0.003,
  longitudeDelta: 0.003 * width / height
}

const KLIA_1_PLACE_ID = 'ChIJmfH754C_zTERokIY__usEAY'
const KLIA_1_PLACE_NAME = 'KLIA'
const KLIA_2_PLACE_ID = 'ChIJy_2I4ZW_zTERTHkGPFDcFIM'
const KLIA_2_PLACE_NAME = 'klia2'

export const terminalMap = {
  "KLIA": {
    place_id: KLIA_1_PLACE_ID,
    name: KLIA_1_PLACE_NAME,

  },
  "KLIA2": {
    place_id: KLIA_2_PLACE_ID,
    name: KLIA_2_PLACE_NAME
  },
}

export const levels = {
  "klia": [
    {
      "index": 0,
      "name": "Level 5",
      "shortName": "5"
    },
    {
      "index": 1,
      "name": "Level 4",
      "shortName": "4"
    },
    {
      "index": 2,
      "name": "Level 3",
      "shortName": "3"
    },
    {
      "index": 3,
      "name": "2",
      "shortName": "2"
    },
    {
      "index": 4,
      "name": "G",
      "shortName": "G"
    }
  ],
  "klia_satellite": [
    {
      "index": 0,
      "name": "M",
      "shortName": "M"
    },
    {
      "index": 1,
      "name": "P",
      "shortName": "P"
    }
  ],
  "klia2": [
    {
      "index": 0,
      "name": "3.5",
      "shortName": "3.5"
    },
    {
      "index": 1,
      "name": "3",
      "shortName": "3"
    },
    {
      "index": 2,
      "name": "2",
      "shortName": "2"
    },
    {
      "index": 3,
      "name": "1a",
      "shortName": "1a"
    }
  ]
}

const directionPadding = {
  top: 100,
  left: 100,
  right: 100,
  bottom: 100
}