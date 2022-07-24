import { isEqual } from "lodash";
import {
  backgroundColor,
  borderColor,
  borderRadius,
  color,
  dim,
  padding,
} from "../../../styles";

export let bgBlack = backgroundColor("black");
export let bgWhite = backgroundColor("white");
export let bcBlack = borderColor("", "black");
export let bcWhite = borderColor("", "white");
export let cBlack = color("black");
export let cWhite = color("white");
export let brAll5 = borderRadius("", 5);
export let brAll10 = borderRadius("", 10);
export let brAll15 = borderRadius("", 15);
export let brAll20 = borderRadius("", 20);
export let brAll25 = borderRadius("", 25);
export let _4_3 = (4 / 3) * dim.width;
export let _16_9 = (16 / 9) * dim.width;
export let _4_9 = (4 / 9) * dim.width;
export let _1_1 = dim.width;
export let lightBG = "rgba(0,0,0,0.05)";
export let bgLightBg = backgroundColor(lightBG);
export let bcLightBg = borderColor("", lightBG);
export let ph5 = padding("h", 5);
export let ph10 = padding("h", 10);
export let ph15 = padding("h", 15);
export let ph20 = padding("h", 20);
export let ph25 = padding("h", 25);

export let rulerNums = [
  {
    nums: 8,
    start: 0.5,
    end: 1,
  },
  {
    nums: 8,
    start: 1,
    end: 2,
  },
  {
    nums: 8,
    start: 2,
    end: 4,
  },
  {
    nums: 10,
    start: 4,
    end: 10,
  },
  {
    nums: 8,
    start: 10,
    end: 20,
  },
  {
    nums: 4,
    start: 20,
    end: 30,
  },
  {
    nums: 1,
    start: 30,
    end: 30,
  },
];

export let timers = ["OFF", "2", "5", "10"];
export let flashModes = ["off", "auto", "on"];
export let defaultRatios = ["9:16", "1:1", "Full"];
export let thirdRatios = ["3:4", ...defaultRatios];
export let zoomBtns = [0.5, 1, 2, 4, 10, 20, 30];
export let mostZoomBtns = [0.5, 1, 3];
export let videoSizes = [
  {
    title: "UHD",
    subtitle: "30",
  },
  {
    title: "FHD",
    subtitle: "60",
  },
  {
    title: "FHD",
    subtitle: "30",
  },
  {
    title: "HD",
    subtitle: "30",
  },
];
export let HeightCalc = (DIM) =>
  isEqual(DIM, "3:4")
    ? _4_3
    : isEqual(DIM, "9:16")
    ? _16_9
    : isEqual(DIM, "1:1")
    ? _1_1
    : dim.height;
