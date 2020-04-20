const NodeGeocoder = require("node-geocoder");

const providers = [
  {
    name: "Google",
    staticFields: [
      {
        name: "apiKey",
        desc: "API key",
      },
    ],
    extraFields: [
      {
        name: "country",
        desc: "The country",
      },
    ],
    initOptions: {
      provider: "google",
    },
    terms_url:
      "https://developers.google.com/maps/documentation/geocoding/policies",
  },
  {
    name: "HERE",
    staticFields: [
      {
        name: "appId",
        desc: "App ID",
      },
      {
        name: "appCode",
        desc: "App Code",
      },
    ],
    extraFields: [
      {
        name: "country",
        desc: "The country",
      },
      {
        name: "state",
        desc: "The state",
      },
    ],
    initOptions: {
      provider: "here",
    },
    terms_url: "https://developer.here.com/terms-and-conditions#terms_sec11",
  },
  {
    name: "FreeGeoIP",
    staticFields: [],
    extraFields: [],
    initOptions: {
      provider: "freegeoip",
    },
    terms_url: "https://ipstack.com/documentation",
  },
  // {
  //   name: "DataScienceToolkit",
  //   staticFields: [],
  //   extraFields: [],
  //   initOptions: {
  //     provider: "datasciencetoolkit",
  //   },
  //   terms_url:
  //     "http://www.datasciencetoolkit.org/developerdocs#googlestylegeocoder",
  // },
  {
    name: "ArcGIS Online",
    staticFields: [
      {
        name: "client_id",
        desc: "Client ID",
      },
      {
        name: "client_secret",
        desc: "Client secret",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "agol",
    },
    terms_url: "https://developers.arcgis.com/features/geocoding/",
  },
  {
    name: "TomTom",
    staticFields: [
      {
        name: "apiKey",
        desc: "API key",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "tomtom",
    },
    terms_url: "https://developer.tomtom.com/terms-and-conditions",
  },
  {
    name: "OpenStreetMap/Nominatim",
    staticFields: [],
    extraFields: [],
    initOptions: {
      provider: "openstreetmap",
    },
    terms_url: "https://operations.osmfoundation.org/policies/nominatim/",
  },
  {
    name: "OpenCage",
    staticFields: [
      {
        name: "apiKey",
        desc: "API key",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "opencage",
    },
    terms_url: "https://opencagedata.com/api#caching",
  },
  {
    name: "SmartyStreet",
    staticFields: [
      {
        name: "auth_id",
        desc: "Auth ID",
      },
      {
        name: "auth_token",
        desc: "Auth token",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "smartyStreet",
    },
    terms_url: "https://smartystreets.com/legal/terms-of-service",
  },
  {
    name: "Geocodio",
    staticFields: [
      {
        name: "apiKey",
        desc: "API key",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "geocodio",
    },
    terms_url: "https://www.geocod.io/terms-of-use/#apiguidelines",
  },
  {
    name: "Yandex",
    staticFields: [
      {
        name: "apiKey",
        desc: "API key",
      },
    ],
    extraFields: [],
    initOptions: {
      provider: "yandex",
    },
    terms_url:
      "https://tech.yandex.com/maps/jsapi/doc/2.1/terms/index-docpage/#index__conditions",
  },
  {
    name: "Open Data France",
    staticFields: [],
    extraFields: [],
    initOptions: {
      provider: "opendatafrance",
    },
  },
];

export { providers, NodeGeocoder };
