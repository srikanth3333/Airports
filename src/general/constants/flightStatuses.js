import { fromPairs, reduce } from "lodash";

export const trackableStatusCodes = [
  "FCF",
  "FDL",
  "FDV",
  "FRT",
  "FIN",
  "FRB",
  "GBD",
  "GCH",
  "GFC",
  "GOP",
  "ICC",
  "IOP",
  "KSK",
  "LCC",
  "NTM",
  "NXF",
  "NXT",
  "OPE",
  "RTM",
  "STD",
  "TST",
  "CAR",
  "CBH",
  "CCL",
  "CDK",
  "CDL",
  "CFB",
  "CKS",
  "CLB",
  "COP",
  "DCL",
  "DOP",
  "DRC",
  "DRO",
  "FLD",
  "FKL",
];

export const colorStatusToStatusCode = {
  success: ["FCF", "FLD", "GOP"],
  warning: ["FRT", "CDL", "GBD", "GFC", "GCH"],
  idle: [
    "",
    "FDP",
    "GCL",
    "DOP",
    "DRO",
    "DCL",
    "DRC",
    "IOP",
    "ICL",
    "CFB",
    "CLB",
    "CCL",
  ],
  error: ["FCL", "FDL"],
};

export const colorMapping = {
  default: "rgb(76, 83, 94)",
  success: "rgb(30,158,82)",
  warning: "rgb(249, 149, 0)",
  idle: "rgb(0, 117, 196)",
  error: "rgb(235, 58, 25)",
};

export const statusCodeToColorStatus = reduce(
  colorStatusToStatusCode,
  (result, arr, key) => {
    arr.forEach((value) => {
      result[value] = key;
    });
    return result;
  },
  {}
);

export const statusCodeMap = {
  FCL: {
    text: "flight cancelled",
    shortText: "CANCELLED",
    status: "error",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FDL: {
    text: "flight delayed",
    shortText: "DELAYED",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CCL: {
    text: "closed",
    shortText: "CLOSED",
    status: "default",
    image: require("../../assets/Images/GateClosed.png"),
  },
  CFB: {
    text: "first bag",
    shortText: "FIRST BAG",
    status: "idle",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CLB: {
    text: "last bag",
    shortText: "LAST BAG",
    status: "idle",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  DCL: {
    text: "checkin closed",
    shortText: "CLOSED",
    status: "default",
    image: require("../../assets/Images/GateClosed.png"),
  },
  DOP: {
    text: "counter open",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  DRO: {
    text: "counter re-open",
    shortText: "REOPEN",
    status: "idle",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FDP: {
    text: "flight depart",
    shortText: "DEPARTED",
    status: "idle",
    image: require("../../assets/Images/FlightDepart.png"),
  },
  GCL: {
    text: "gate closed",
    shortText: "CLOSED",
    status: "default",
    image: require("../../assets/Images/GateClosed.png"),
  },
  ICL: {
    text: "counter closed",
    shortText: "CLOSED",
    status: "default",
    image: require("../../assets/Images/GateClosed.png"),
  },
  IOP: {
    text: "counter open",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FCF: {
    text: "flight confirm",
    shortText: "CONFIRMED",
    status: "success",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FLD: {
    text: "flight landed",
    shortText: "LANDED",
    status: "success",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  GOP: {
    text: "gate open",
    shortText: "OPEN",
    status: "success",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CDL: {
    text: "reclaim bag delay",
    shortText: "BAG DELAY",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FRT: {
    text: "flight retime",
    shortText: "RETIME",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  GBD: {
    text: "gate boarding",
    shortText: "BOARDING",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  GCH: {
    text: "gate change",
    shortText: "NEW GATE",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  GFC: {
    text: "gate final call",
    shortText: "FINAL CALL",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CAR: {
    text: "carousel delay",
    shortText: "DELAYED",
    status: "warning",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CBH: {
    text: "desk and kiosk open",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CDK: {
    text: "counter desk open",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  CKS: {
    text: "counter kiosk",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  COP: {
    text: "carousel open",
    shortText: "OPEN",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  DRC: {
    text: "counter re-open",
    shortText: "RECLOSE",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FDV: {
    text: "flight divert",
    shortText: "DIVERTED",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FIN: {
    text: "flight inquire",
    shortText: "INQUIRE",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FKL: {
    text: "flight landed",
    shortText: "LAND AT KLIA",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  FRB: {
    text: "flight return",
    shortText: "RETURN FLIGHT",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  ICC: {
    text: "flight at lcct",
    shortText: "AT LCCT",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  KSK: {
    text: "use kiosk",
    shortText: "USE KIOSK",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  LCC: {
    text: "at lcct",
    shortText: "AT LCCT",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  NTM: {
    text: "flight new time",
    shortText: "NEW TIME",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  NXF: {
    text: "next flight",
    shortText: "NEXT FLIGHT",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  NXT: {
    text: "next flight",
    shortText: "NEXT FLIGHT",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  OPE: {
    text: "flight not operated",
    shortText: "NO OPE",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  RTM: {
    text: "flight retime",
    shortText: "RETIME",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  STD: {
    text: "",
    shortText: "STANDF01",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
  TST: {
    text: "testing",
    shortText: "TESTING",
    status: "default",
    image: require("../../assets/Images/FlightCanceled.png"),
  },
};

export const DEFAULT_COLOR_TYPE = "default";
export const DEFAULT_STATUS_TEXT = "";
