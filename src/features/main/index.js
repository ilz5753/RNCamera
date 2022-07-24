import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
  FadeInDown,
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { noop, isEqual, isEmpty, gte } from "lodash";
import {
  EvilIcons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import {
  AnimatedCamera,
  AnimatedOcticons,
  AnimatedTouchableOpacity,
  Button,
  clamp,
  duration,
  FullRowSEView,
  FullRowStyle,
  HeaderIconRoundedBtn,
  HorizontalRulerSlider,
  HorizontalSwitchableRowButtons,
  MotionIcon,
  RatioIcon,
  RoundedButtonColor,
  TimerIcon,
  VideoSizeIcon,
} from "../../../components";
import {
  aic,
  borderRadius,
  bottom,
  bw,
  center,
  color,
  dim,
  fontSize,
  fontWeight,
  full,
  fullWidth,
  fw,
  height,
  jcc,
  jcfe,
  jcsb,
  jcse,
  layout,
  opacity,
  overlay,
  padding,
  root,
  row,
  squareLayout,
  width,
} from "../../../styles";
import {
  ActiveZoomMode,
  reset,
  toggleFilterSelect,
  toggleFlashSelect,
  toggleIsFocusZoomSlider,
  toggleMostZoomBtnSelect,
  toggleMotionSelect,
  toggleOptimizationSelect,
  toggleRatioSelect,
  toggleShotsTypesSelect,
  toggleSuperSteadySelect,
  toggleTimerSelect,
  toggleVideoSizeSelect,
  toggleZoomMode,
  updateActiveFilterTopTab,
  updateActivePage,
  updateFlashMode,
  updateLatestPhoto,
  updateRatios,
  updateTimerText,
  updateVideoSize,
  _slice,
} from "./slice";
import {
  bgBlack,
  bgLightBg,
  bgWhite,
  brAll20,
  cBlack,
  cWhite,
  ph20,
  rulerNums,
  _16_9,
  _1_1,
  _4_3,
  timers,
  flashModes,
  defaultRatios,
  thirdRatios,
  zoomBtns,
  mostZoomBtns,
  videoSizes,
  bcWhite,
  _4_9,
  bcLightBg,
  HeightCalc,
} from "./statics";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { getAssetsAsync, requestPermissionsAsync } from "expo-media-library";

export default function Main() {
  let insets = useSafeAreaInsets();
  let headerHeight = 80 + insets.top;
  let cameraRef = useAnimatedRef();
  let dis = useDispatch();
  let slice = useSelector(_slice);
  let isFirstPage = isEqual(slice?.activePage, 0);
  let isSecondPage = isEqual(slice?.activePage, 1);
  let isThirdPage = isEqual(slice?.activePage, 2);
  let isFourthPage = isEqual(slice?.activePage, 3);
  let isFifthPage = isEqual(slice?.activePage, 4);
  let [Zoom, setZoom] = useState(1);
  let cameraZoom = useSharedValue(1);
  let cameraZoomH = useSharedValue(1);
  let cameraHeight = useSharedValue(isThirdPage ? _4_3 : _16_9);
  let optimiseRotation = useSharedValue(0);
  let bottomHeight = useSharedValue(dim.height - (_4_3 + headerHeight));
  let pinch = Gesture.Pinch()
    .onStart(() => {
      runOnJS(dis)(ActiveZoomMode());
    })
    .onUpdate(({ scale }) => {
      cameraZoom.value = clamp(scale + cameraZoomH.value, 0.5, 30);
      runOnJS(setZoom)(cameraZoom.value);
      runOnJS(dis)(toggleIsFocusZoomSlider());
    })
    .onEnd(() => {
      cameraZoomH.value = cameraZoom.value;
    });
  let isTimerNotOff = !isEqual(slice?.TimerText, "OFF");
  let isFullRatio = isEqual(
    isFirstPage
      ? slice?.Ratios?.first
      : isThirdPage
      ? slice?.Ratios?.third
      : slice?.Ratios?.fourth,
    "Full",
  );
  let cameraStyle = useAnimatedStyle(() => ({
    height: withTiming(cameraHeight.value, duration),
    marginTop: withTiming(isFullRatio ? 0 : headerHeight, duration),
  }));
  let zoomStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: cameraZoom.value,
      },
    ],
  }));
  let bottomStyle = useAnimatedStyle(() => ({
    height: withTiming(bottomHeight.value, duration),
  }));
  let optimiseStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${optimiseRotation.value}deg`,
      },
    ],
  }));
  let getLatestPhoto = async () => {
    try {
      let perm = await requestPermissionsAsync();
      if (perm.granted) {
        let assets = await getAssetsAsync({
          sortBy: ["creationTime"],
        });
        dis(updateLatestPhoto(assets.assets[0]?.uri));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    (async () => await getLatestPhoto())();
    cameraHeight.value = withTiming(
      isSecondPage || isFifthPage
        ? _4_3
        : HeightCalc(
            isFirstPage
              ? slice?.Ratios?.first
              : isThirdPage
              ? slice?.Ratios?.third
              : slice?.Ratios?.fourth,
          ),
      duration,
    );
    let zoom = Zoom;
    if (isFifthPage) zoom = 1;
    cameraZoom.value = withTiming(zoom, duration);
  }, [slice?.activePage]);
  let fzn = `${Zoom}`.includes(".");
  let fz = fzn ? Zoom : `${Zoom}`.split(".");
  let formattedZoom = fzn ? Zoom : `${fz[0]}.${fz[1]?.slice(0, 1) ?? 0}`;
  let filterTopTabBtns = [
    {
      label: "Filters",
      onPress: () => {
        let obj = {};
        if (isThirdPage) obj.third = 0;
        else obj.fourth = 0;
        dis(updateActiveFilterTopTab(obj));
      },
    },
    {
      label: "My filters",
      onPress: () => {
        let obj = {};
        if (isThirdPage) obj.third = 1;
        else obj.fourth = 1;
        dis(updateActiveFilterTopTab(obj));
      },
    },
    {
      label: "Face",
      onPress: () => {
        let obj = {};
        if (isThirdPage) obj.third = 2;
        else obj.fourth = 2;
        dis(updateActiveFilterTopTab(obj));
      },
    },
  ];
  return (
    <Animated.View style={[root, bgBlack]}>
      {/**
       * for test, un comment next view and comment camera view
       */}
      {/* <Animated.View
        style={[fullWidth, cameraStyle, brAll20, bgWhite, zoomStyle, bcWhite]}
      ></Animated.View> */}
      <AnimatedCamera
        ref={cameraRef}
        style={[fullWidth, cameraStyle, brAll20, bcWhite]}
        zoom={Zoom / 30}
      />
      <GestureDetector gesture={pinch}>
        <AnimatedTouchableOpacity
          onPress={() => {
            dis(reset());
            let ph = dim.height - (_4_3 + headerHeight);
            if (!isEqual(bottomHeight.value, ph))
              bottomHeight.value = withTiming(ph, duration);
          }}
          activeOpacity={1}
          style={[root, overlay, bgLightBg, jcsb]}
        >
          <Animated.View
            style={[
              fullWidth,
              height(headerHeight),
              center,
              ph20,
              padding("t", insets.top),
              bgLightBg,
            ]}
          >
            <Animated.View style={[fw, height(60)]}>
              {slice?.TimerSelect ? (
                <FullRowSEView>
                  {timers.map((time, i) => (
                    <HeaderIconRoundedBtn
                      {...{
                        key: i,
                        onPress: () => {
                          dis(updateTimerText(time));
                          dis(toggleTimerSelect());
                        },
                        size: 42,
                        // bg: lightBG,
                        Provider: TimerIcon,
                        name: time,
                        color: RoundedButtonColor(
                          isEqual(time, slice?.TimerText),
                        ),
                        iconProps: {
                          isNumber: !isEqual(i, 0), // this is so bad condition.
                        },
                      }}
                    />
                  ))}
                </FullRowSEView>
              ) : slice?.FlashSelect ? (
                <FullRowSEView>
                  {flashModes.map((flash, i) => (
                    <HeaderIconRoundedBtn
                      {...{
                        key: i,
                        onPress: () => {
                          let obj = {};
                          if (isThirdPage) obj.third = flash;
                          else obj.fourth = flash;
                          dis(updateFlashMode(obj));
                          dis(toggleFlashSelect());
                        },
                        size: 42,
                        // bg: lightBG,
                        Provider: MaterialIcons,
                        name: `flash-${flash}`,
                        color: RoundedButtonColor(
                          isEqual(
                            flash,
                            isThirdPage
                              ? slice?.FlashMode?.third
                              : slice?.FlashMode?.fourth,
                          ),
                        ),
                      }}
                    />
                  ))}
                </FullRowSEView>
              ) : slice?.RatioSelect ? (
                <FullRowSEView>
                  {(isThirdPage ? thirdRatios : defaultRatios).map(
                    (ratio, i) => (
                      <HeaderIconRoundedBtn
                        {...{
                          key: i,
                          onPress: () => {
                            let obj = {};
                            if (isFirstPage) obj.first = ratio;
                            else if (isThirdPage) obj.third = ratio;
                            else obj.fourth = ratio;
                            dis(updateRatios(obj));
                            dis(toggleRatioSelect());
                            let height = 0;
                            if (isEqual(ratio, "Full")) height = dim.height;
                            else {
                              let nums = ratio.split(":");
                              let z = +nums[1] / +nums[0];
                              height = z * dim.width;
                            }
                            cameraHeight.value = height;
                          },
                          size: 42,
                          //   bg: lightBG,
                          Provider: RatioIcon,
                          name: ratio,
                          color: RoundedButtonColor(
                            isEqual(
                              ratio,
                              isFirstPage
                                ? slice?.Ratios?.first
                                : isThirdPage
                                ? slice?.Ratios?.third
                                : slice?.Ratios?.fourth,
                            ),
                          ),
                        }}
                      />
                    ),
                  )}
                </FullRowSEView>
              ) : slice?.VideoSizeSelect ? (
                <FullRowSEView>
                  {videoSizes.map((videoSize, i) => (
                    <HeaderIconRoundedBtn
                      {...{
                        key: i,
                        onPress: () => {
                          dis(updateVideoSize(videoSize));
                          dis(toggleVideoSizeSelect());
                        },
                        size: 42,
                        Provider: VideoSizeIcon,
                        color: RoundedButtonColor(
                          isEqual(videoSize, slice?.VideoSize),
                        ),
                        iconProps: videoSize,
                      }}
                    />
                  ))}
                </FullRowSEView>
              ) : slice?.FilterSelect ? (
                <Animated.View style={[full, center]}>
                  <Animated.View
                    style={[
                      width(120 * filterTopTabBtns.length),
                      height(42),
                      row,
                      aic,
                      borderRadius("", 21),
                      bgLightBg,
                    ]}
                    entering={FadeInUp}
                    exiting={FadeOutUp}
                  >
                    {filterTopTabBtns.map(({ label, onPress }, i) => {
                      let br = borderRadius("", 21);
                      let active = isEqual(
                        i,
                        isThirdPage
                          ? slice?.ActiveFilterTopTab?.third
                          : slice?.ActiveFilterTopTab?.fourth,
                      );
                      return (
                        <Button
                          key={i}
                          parentStyle={[layout(120, 42), br, active && bgWhite]}
                          btnStyle={[br]}
                          onPress={onPress}
                        >
                          <Animated.Text
                            style={[fontSize(20), active ? cBlack : cWhite]}
                          >
                            {label}
                          </Animated.Text>
                        </Button>
                      );
                    })}
                  </Animated.View>
                </Animated.View>
              ) : (
                <Animated.View
                  style={[FullRowStyle, isFifthPage ? jcfe : jcsb]}
                  entering={FadeIn}
                  exiting={FadeOut}
                >
                  {!isFifthPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {},
                        Provider: EvilIcons,
                        name: "gear",
                        size: 42,
                        ...cWhite,
                      }}
                    />
                  )}
                  {isSecondPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleShotsTypesSelect());
                        },
                        Provider: Entypo,
                        name: `chevron-with-circle-${
                          slice?.ShotsTypesSelect ? "up" : "down"
                        }`,
                        size: 42,
                        ...cWhite,
                      }}
                    />
                  )}
                  {(isThirdPage || isFourthPage) && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleFlashSelect());
                        },
                        Provider: MaterialIcons,
                        name: `flash-${
                          isThirdPage
                            ? slice?.FlashMode?.third
                            : slice?.FlashMode?.fourth
                        }`,
                        size: 42,
                        color: RoundedButtonColor(
                          !isEqual(
                            isThirdPage
                              ? slice?.FlashMode?.third
                              : slice?.FlashMode?.fourth,
                            "off",
                          ),
                        ),
                      }}
                    />
                  )}
                  {(isFirstPage || isThirdPage) && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleTimerSelect());
                        },
                        Provider: TimerIcon,
                        name: slice?.TimerText,
                        size: 42,
                        color: RoundedButtonColor(isTimerNotOff),
                        iconProps: {
                          isNumber: isTimerNotOff,
                        },
                      }}
                    />
                  )}
                  {isFourthPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleSuperSteadySelect());
                        },
                        Provider: AntDesign,
                        name: `shake`,
                        size: 42,
                        color: RoundedButtonColor(slice?.SuperSteadySelect),
                      }}
                    />
                  )}
                  {!isSecondPage && !isFifthPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleRatioSelect());
                        },
                        Provider: RatioIcon,
                        name: isFirstPage
                          ? slice?.Ratios?.first
                          : isThirdPage
                          ? slice?.Ratios?.third
                          : slice?.Ratios?.fourth,
                        size: 42,
                        color: RoundedButtonColor(!isFullRatio),
                      }}
                    />
                  )}
                  {isFourthPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleVideoSizeSelect());
                        },
                        Provider: VideoSizeIcon,
                        size: 42,
                        ...cWhite,
                        iconProps: slice?.VideoSize,
                      }}
                    />
                  )}
                  {isThirdPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleMotionSelect());
                        },
                        Provider: MotionIcon,
                        size: 42,
                        color: RoundedButtonColor(slice?.MotionSelect),
                      }}
                    />
                  )}
                  {(isThirdPage || isFourthPage) && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          dis(toggleFilterSelect());
                        },
                        Provider: MaterialCommunityIcons,
                        name: "magic-staff",
                        size: 42,
                        color: RoundedButtonColor(
                          isThirdPage
                            ? slice?.Filters?.third
                            : slice?.Filters?.fourth,
                        ),
                      }}
                    />
                  )}
                  {isFifthPage && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: () => {
                          //   navigate("Question");
                        },
                        Provider: AntDesign,
                        name: "questioncircle",
                        size: 42,
                        ...cWhite,
                      }}
                    />
                  )}
                </Animated.View>
              )}
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[
              fullWidth,
              height(dim.height - (_1_1 + headerHeight)),
              ph20,
              //   bgLightBg,
            ]}
          >
            {!(isSecondPage || isFifthPage) && (
              <>
                <Animated.View
                  style={[
                    fw,
                    height(_1_1 / 3 - 80),
                    center,
                    opacity(
                      slice?.ZoomMode || slice?.MostZoomBtnSelect ? 1 : 0,
                    ),
                  ]}
                >
                  <Animated.Text style={[fontSize(22.5), cWhite]}>
                    {formattedZoom}x
                  </Animated.Text>
                </Animated.View>
                {!slice?.ZoomMode && (
                  <Animated.View
                    style={[
                      fw,
                      height(80),
                      row,
                      slice?.MostZoomBtnSelect || !isThirdPage ? jcc : jcsb,
                      aic,
                      //   bw,
                    ]}
                  >
                    {isThirdPage && !slice?.MostZoomBtnSelect && (
                      <Animated.View
                        style={[squareLayout(50), borderRadius("", 25)]}
                      />
                    )}
                    <Animated.View style={[row, aic, jcse, ph20]}>
                      {mostZoomBtns.map((zoom, i) => {
                        let active = isEqual(
                          isEqual(i, 0) ? zoom : `${zoom}.0`,
                          formattedZoom,
                        );
                        let onPress = () => {
                          setZoom(zoom);
                          cameraZoom.value = withTiming(zoom, duration);
                          if (!slice?.MostZoomBtnSelect)
                            dis(toggleMostZoomBtnSelect());
                        };
                        return (
                          <HeaderIconRoundedBtn
                            {...{
                              key: i,
                              onPress: () => {
                                onPress();
                                dis(toggleIsFocusZoomSlider());
                              },
                              onLongPress: () => {
                                onPress();
                                bottomHeight.value = bottomHeight.value + 80;
                                dis(toggleZoomMode());
                              },
                              Provider: Animated.Text,
                              size: 42,
                              iconProps: {
                                style: [
                                  fontSize(active ? 18 : 14),
                                  fontWeight("4"),
                                  cWhite,
                                ],
                                children: `${zoom}x`,
                              },
                            }}
                          />
                        );
                      })}
                    </Animated.View>
                    {isThirdPage && !slice?.MostZoomBtnSelect && (
                      <HeaderIconRoundedBtn
                        {...{
                          size: 30,
                          bg: bgLightBg,
                          onPress: () => {
                            optimiseRotation.value = slice?.OptimizationSelect
                              ? 0
                              : withTiming(1080, duration);
                            dis(toggleOptimizationSelect());
                          },
                          Provider: AnimatedOcticons,
                          name: "sun",
                          iconProps: {
                            style: [slice?.OptimizationSelect && optimiseStyle],
                          },
                          color: RoundedButtonColor(slice?.OptimizationSelect),
                        }}
                      />
                    )}
                  </Animated.View>
                )}
              </>
            )}
            <Animated.View
              style={[
                fullWidth,
                bottomStyle,
                // center,
                bgLightBg,
                overlay,
                bottom(0),
              ]}
            >
              {slice?.ZoomMode && (
                <Animated.View style={[fullWidth, height(80), jcc]}>
                  <HorizontalRulerSlider
                    {...{
                      bg: "white",
                      active: "yellow",
                      initialValue: Zoom,
                      onChangeValue: (newValue) => {
                        let ilth = gte(0.5, newValue);
                        let fv = (ilth ? 0.5 : 0) + newValue;
                        // fv = ilth ? fv : Math.round(fv);
                        setZoom(fv);
                        cameraZoom.value = fv;
                      },
                      rulerNums,
                      isUpdateFromParent: slice?.IsFocusZoomSlider,
                      toggleIsFocusZoomSlider: () =>
                        dis(toggleIsFocusZoomSlider()),
                    }}
                  />
                </Animated.View>
              )}
              <Animated.View>
                {slice?.ZoomMode || slice?.MostZoomBtnSelect ? (
                  <Animated.View
                    style={[
                      fw,
                      height(60),
                      (slice?.ZoomMode || slice?.MostZoomBtnSelect) && [
                        row,
                        aic,
                        jcse,
                      ],
                    ]}
                    entering={FadeInDown}
                  >
                    {zoomBtns.map((zoom, i) => {
                      let active = isEqual(
                        isEqual(i, 0) ? zoom : `${zoom}.0`,
                        formattedZoom,
                      );
                      let Color = `rgba(255,255,255, ${active ? 1 : 0.65})`;
                      return (
                        <HeaderIconRoundedBtn
                          {...{
                            key: i,
                            size: 36,
                            bg: bgLightBg,
                            brc: Color,
                            onPress: () => {
                              setZoom(zoom);
                              cameraZoom.value = withTiming(zoom, duration);
                              dis(toggleIsFocusZoomSlider());
                            },
                            Provider: Animated.Text,
                            iconProps: {
                              children: `${zoom}x`,
                              style: [
                                fontSize(14),
                                fontWeight("4"),
                                color(Color),
                              ],
                            },
                          }}
                        />
                      );
                    })}
                  </Animated.View>
                ) : (
                  <HorizontalSwitchableRowButtons
                    {...{
                      list: ["FUN", "SINGLE TAKE", "PHOTO", "VIDEO", "MORE"],
                      activeIndex: slice?.activePage,
                      setActiveIndex: (i) => dis(updateActivePage(i)),
                    }}
                  />
                )}
              </Animated.View>
              {!isFifthPage && (
                <Animated.View
                  style={[
                    fw,
                    height(_4_9 - 60),
                    row,
                    aic,
                    slice?.ZoomMode || slice?.MostZoomBtnSelect
                      ? jcc
                      : isFirstPage
                      ? jcsb
                      : jcse,
                    ph20,
                  ]}
                >
                  {!slice?.ZoomMode && !slice?.MostZoomBtnSelect && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: noop,
                        size: 70,
                        Provider: Animated.Image,
                        iconProps: {
                          source: isEmpty(slice?.LatestPhoto)
                            ? null
                            : { uri: slice?.LatestPhoto },
                          style: [
                            squareLayout(60),
                            borderRadius("", 30),
                            bw,
                            bcLightBg,
                          ],
                        },
                      }}
                    />
                  )}
                  <HeaderIconRoundedBtn
                    {...{
                      onPress: () => {
                        bottomHeight.value =
                          bottomHeight.value + 80 * (slice?.ZoomMode ? -1 : 1);
                        dis(toggleZoomMode());
                      },
                      size: 85,
                      Provider: Animated.View,
                      bg: "white",
                    }}
                  />
                  {!slice?.ZoomMode && !slice?.MostZoomBtnSelect && (
                    <HeaderIconRoundedBtn
                      {...{
                        onPress: noop,
                        size: 55,
                        Provider: AntDesign,
                        name: "sync",
                        ...cWhite,
                      }}
                    />
                  )}
                </Animated.View>
              )}
            </Animated.View>
          </Animated.View>
        </AnimatedTouchableOpacity>
      </GestureDetector>
    </Animated.View>
  );
}
