import { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { isEqual, sum, isEmpty, isBoolean, isString, isFunction } from "lodash";
import {
  aic,
  aife,
  backgroundColor,
  borderColor,
  borderRadius,
  bottom,
  bw,
  bwh,
  center,
  color,
  dim,
  fh,
  fontSize,
  fontWeight,
  full,
  fullWidth,
  fw,
  height,
  jcc,
  jcse,
  layout,
  lightBlack,
  margin,
  overlay,
  padding,
  right,
  row,
  squareLayout,
  thuc,
  tr,
  width,
} from "../styles";
import { Camera } from "expo-camera";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cBlack } from "../src/features/main/statics";
export let CAC = Animated.createAnimatedComponent;
export let AnimatedCamera = CAC(Camera);
export let AnimatedTouchableOpacity = CAC(TouchableOpacity);
export let AnimatedOcticons = CAC(Octicons);
export let clamp = (value = 0, lower = 0, upper = 0) => {
  "worklet";
  return Math.max(Math.min(value, upper), lower);
};
export let duration = {
  duration: 500,
};
export let TimerIcon = ({
  name,
  size = 10,
  color,
  isClockRotation = null,
  isNumber = true,
}) => {
  let rotation = useSharedValue(0);
  let brs = size / 2;
  useEffect(() => {
    if (isBoolean(isClockRotation))
      rotation.value = withTiming(
        (isClockRotation ? 1 : -1) * 360 + rotation.value,
        duration,
      );
  }, []);
  let rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));
  return (
    <Animated.View
      style={[
        squareLayout(size),
        borderRadius("l", brs),
        borderRadius("b", brs),
        borderRadius("t", brs),
        bw,
        borderColor("l", color),
        borderColor("b", color),
        borderColor("t", color),
        borderColor("r", tr),
        {
          transform: [
            {
              rotate: `45deg`,
            },
          ],
        },
        center,
      ]}
    >
      <Animated.View
        style={[layout(brs, 1), backgroundColor(color), rotationStyle]}
      />
      <Animated.View
        style={[
          overlay,
          right(-size / (isNumber ? 4 : 2)),
          bottom(size / (isNumber ? 4 : 3)),
          {
            transform: [
              {
                rotate: `-45deg`,
              },
            ],
          },
          center,
        ]}
      >
        <Animated.Text style={[{ color }, fontSize(size * 0.4)]}>
          {name}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};
export let RatioIcon = ({ name, size = 10, color }) => {
  let sameStyle = [width(size), height(0.3 * size), bw];
  return (
    <Animated.View style={[squareLayout(size), jcse, aic]}>
      <Animated.View
        style={[
          sameStyle,
          borderColor("ht", color),
          borderRadius("t", 6),
          borderColor("b", tr),
        ]}
      />
      <Animated.Text style={[fontSize(size * 0.5), { color }]}>
        {name}
      </Animated.Text>
      <Animated.View
        style={[
          sameStyle,
          borderColor("hb", color),
          borderRadius("b", 6),
          borderColor("t", tr),
        ]}
      />
    </Animated.View>
  );
};
export let MotionIcon = ({ size = 10, color, nameBg }) => {
  return (
    <Animated.View
      style={[
        squareLayout(size),
        bw,
        borderColor("vl", color),
        borderColor("r", tr),
        borderRadius("vl", 8),
        jcc,
      ]}
    >
      <Animated.View
        style={[
          squareLayout(0.6 * size),
          isString(nameBg) && backgroundColor(nameBg),
          overlay,
          center,
          right(-size * 0.25),
        ]}
      >
        <Ionicons name="play-outline" color={color} size={size * 0.6} />
      </Animated.View>
    </Animated.View>
  );
};
export let VideoSizeIcon = ({ title, subtitle, size, color, nameBg }) => {
  let fs = fontSize(size * 0.45);
  return (
    <Animated.View style={[squareLayout(size), center]}>
      <Animated.Text style={[fs, { color }]}>{title}</Animated.Text>
      <Animated.View
        style={[
          layout(0.8 * size, 0.5 * size),
          backgroundColor(color),
          center,
          borderRadius("", size * 0.1),
          margin("t", size * 0.1),
          // right(-size * 0.3),
        ]}
      >
        <Animated.Text
          style={[fs, isString(nameBg) ? { color: nameBg } : cBlack]}
        >
          {subtitle}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};
export let Pager = ({
  list = [],
  initialIndex = 0,
  Width = 1,
  Height = 1,
  horizontal = false,
  scrollable = false,
}) => {
  let asr = useAnimatedRef();
  let ll = list.length;
  let [activeIndex, setActiveIndex] = useState(initialIndex);
  let onScroll = useAnimatedScrollHandler(({ contentOffset: { x, y } }) => {
    let n = 0;
    if (horizontal) n = Math.floor(x / Width);
    else n = Math.floor(y / Height);
    if (n > -1 && n < ll) runOnJS(setActiveIndex)(n);
  });
  let pageNames = list.map((p) => p.name);
  return (
    <Animated.View style={[full]}>
      <Animated.ScrollView
        ref={asr}
        onScroll={onScroll}
        horizontal={horizontal}
        pagingEnabled
        scrollEnabled={scrollable}
        contentContainerStyle={{
          width: (horizontal ? ll : 1) * Width,
          height: (horizontal ? 1 : ll) * Height,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {list.map((P, i) => (
          <Animated.View
            key={i}
            style={[layout(Width, Height), bw, borderColor("", "white")]}
          >
            <P.Page
              {...{
                switchPage: (j) => {
                  let obj = {
                    animated: scrollable,
                  };
                  if (horizontal) obj.x = (horizontal ? j : 1) * Width;
                  else obj.y = (horizontal ? 1 : j) * Height;
                  asr.current.scrollTo(obj);
                  setActiveIndex(j);
                },
                activeIndex,
                pageNames,
              }}
            />
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};
export let Button = ({ parentStyle, btnStyle, en, ex, children, ...props }) => {
  return (
    <Animated.View style={[parentStyle]} entering={en} exiting={ex}>
      <TouchableHighlight
        style={[full, center, btnStyle]}
        activeOpacity={0.75}
        underlayColor={lightBlack}
        {...props}
      >
        <>{children}</>
      </TouchableHighlight>
    </Animated.View>
  );
};
export let RoundedButton = ({
  size = 100,
  bg,
  brc,
  children,
  disabled,
  ...props
}) => {
  let br = borderRadius("", size / 2);
  return (
    <Button
      parentStyle={[
        squareLayout(size),
        br,
        backgroundColor(bg),
        isString(brc) && [bwh, borderColor("", brc)],
      ]}
      btnStyle={[br]}
      disabled={disabled}
      {...props}
    >
      {children}
      {disabled && (
        <Animated.View style={[full, overlay, br, backgroundColor(thuc)]} />
      )}
    </Button>
  );
};
export let HeaderBtn = ({ onPress, disabled, children }) => (
  <RoundedButton
    size={50}
    onPress={onPress}
    en={FadeIn}
    ex={FadeOut}
    disabled={disabled}
  >
    {children}
  </RoundedButton>
);
export let HeaderBtnProps = {
  color: "white",
  size: 24,
  nameBg: "black",
};
export let RoundedButtonColor = (isYellow = false) =>
  isYellow ? "yellow" : "white";
export let HorizontalRulerSlider = ({
  bg,
  active,
  rulerNums = [
    {
      nums: 5,
      start: 0,
      end: 10,
    },
    {
      nums: 7,
      start: 10,
      end: 30,
    },
  ],
  initialValue = 0,
  onChangeValue,
  isUpdateFromParent = false,
  toggleIsFocusZoomSlider,
}) => {
  let MAX = dim.width * 0.5;
  let rulerNumsValues = rulerNums.map(({ nums }) => nums);
  let starts = rulerNums.map(({ start }) => start);
  let srn = sum(rulerNumsValues) - 1;
  let twoLineDistance = 1 / srn;
  let spaceBetween = (2 * MAX) / srn;
  let rulerParts = rulerNums.map(
    ({ nums, start, end }) => (end - start) / nums,
  );
  let tx = useSharedValue(MAX);
  let htx = useSharedValue(MAX);
  let arrayOfSums = [];
  for (let i = 0; i < rulerNumsValues.length; i++) {
    arrayOfSums.push(sum(rulerNumsValues.slice(0, i + 1)));
  }
  let l = arrayOfSums.length;
  let onUpdate = (value = 0) => {
    let nv = 0;
    for (let i = 0; i < l; i++) {
      if (isEqual(i, 0) && value <= arrayOfSums[0]) nv = value * rulerParts[0];
      else if (isEqual(i, l - 1) && isEqual(value, arrayOfSums[l - 1] - 1))
        nv = rulerNums[l - 1].end;
      else if (value > arrayOfSums[i - 1] && value < arrayOfSums[i]) {
        let a = rulerNums[i - 1].end;
        let b = arrayOfSums[i - 1];
        let c = value - b;
        let d = rulerParts[i];
        nv = a + c * d;
      }
    }
    if (isFunction(onChangeValue)) onChangeValue(nv);
  };
  let pan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      tx.value = clamp(translationX + htx.value, -MAX, MAX);
      let ntx = 0.5 - tx.value / (2 * MAX);
      runOnJS(onUpdate)(ntx / twoLineDistance);
    })
    .onEnd(() => {
      htx.value = tx.value;
    });
  let sliderStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tx.value,
      },
    ],
  }));
  useEffect(() => {
    if (isUpdateFromParent) {
      let index = starts.indexOf(initialValue);
      let distance = 0;
      if (isEqual(index, l - 1)) distance = srn;
      else if (!isEqual(index, 0)) distance = arrayOfSums[index - 1];
      let mtx = MAX - distance * spaceBetween;
      htx.value = mtx;
      tx.value = withTiming(mtx, duration);
      if (isFunction(toggleIsFocusZoomSlider)) toggleIsFocusZoomSlider();
    }
    let range = 0;
    let l1 = starts.length;
    for (let i = 0; i < l1; i++) {
      if (isEqual(i, 0) && initialValue <= starts[0]) range = starts[0];
      else if (isEqual(i, l - 1) && isEqual(initialValue, starts[l - 1]))
        range = starts[l - 1];
      else if (initialValue > starts[i - 1] && initialValue <= starts[i])
        range = starts[i - 1];
    }
    let distance = initialValue - range;
    let index = starts.indexOf(range);
    if (!isEqual(index, -1)) {
      let extra = distance / rulerParts[index];
      let s = 0;
      if (isEqual(index, l1 - 1)) s = srn;
      else if (!isEqual(index, 0)) s = arrayOfSums[index - 1];
      let res = s + extra;
      let mtx = MAX - spaceBetween * res;
      htx.value = mtx;
      tx.value = withTiming(mtx, duration);
    }
  }, [isUpdateFromParent]);
  return (
    <Animated.View style={[fw, height(60), jcc]}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[fullWidth, height(42), jcc]}>
          <Animated.View style={[fullWidth, height(36), sliderStyle, row, aic]}>
            {rulerNums.map(({ nums }, i) => (
              <RulerPart
                {...{
                  key: i,
                  numOfParts: nums,
                  bg,
                  spaceBetween,
                }}
              />
            ))}
          </Animated.View>
          <Animated.View style={[full, overlay, center]}>
            <Animated.View
              style={[
                layout(1, 36),
                // backgroundColor(RoundedButtonColor(1)),
                isString(active) && backgroundColor(active),
                overlay,
              ]}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
let RulerPart = ({ numOfParts = 4, bg, spaceBetween = 0 }) => {
  return (
    <Animated.View style={[width(numOfParts * spaceBetween), fh, row, aife]}>
      {Array(numOfParts)
        .fill("")
        .map((_, i) => (
          <Animated.View
            key={i}
            style={[
              width(1),
              height(`${isEqual(i, 0) ? 100 : 64}%`),
              isString(bg) && backgroundColor(bg),
              margin("r", spaceBetween - 1),
            ]}
          />
        ))}
    </Animated.View>
  );
};
// todo : edit this
export let HorizontalSwitchableRowButtons = ({
  list = [],
  activeIndex = 2,
  setActiveIndex,
  style,
  activeStyle,
}) => {
  let [ActiveWidths, setActiveWidths] = useState(list.map(() => 0));
  let [DeactiveWidths, setDeactiveWidths] = useState(list.map(() => 0));
  if (!isEmpty(ActiveWidths.filter((n) => isEqual(n, 0))))
    return list.map((label, i) => {
      return (
        <Animated.View key={i} style={[fw, height(42), center]}>
          <Button
            disabled
            parentStyle={[height(36), br]}
            btnStyle={[padding("h", 15), br]}
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }) => {
              setActiveWidths((aw) =>
                aw.map((w, j) => (isEqual(i, j) ? width : w)),
              );
            }}
          >
            <Animated.Text style={[fontSize(20), fontWeight("5")]}>
              {label}
            </Animated.Text>
          </Button>
        </Animated.View>
      );
    });
  if (!isEmpty(DeactiveWidths.filter((n) => isEqual(n, 0))))
    return (
      <Animated.View style={[fw, fh, row, aic]}>
        {list.map((label, i) => {
          // let active = isEqual(activeIndex, i);
          return (
            <Button
              key={i}
              disabled
              parentStyle={[height(36), br]}
              btnStyle={[padding("h", 15), br]}
              onLayout={({
                nativeEvent: {
                  layout: { width },
                },
              }) => {
                setDeactiveWidths((ilw) =>
                  ilw.map((w, j) => (isEqual(i, j) ? width : w)),
                );
              }}
            >
              <Animated.Text>{label}</Animated.Text>
            </Button>
          );
        })}
      </Animated.View>
    );
  let br = borderRadius("", 18);
  return (
    <HorizontalSwitchableBottomTab
      {...{
        ActiveWidths,
        DeactiveWidths,
        tabs: list,
        activeIndex,
        setActiveIndex,
        style,
        activeStyle,
      }}
    />
  );
  // return (
  //   <HorizontalSwitchableRowButtonsRenderer
  //     {...{
  //       ActiveWidths,
  //       DeactiveWidths,
  //       list,
  //       initialIndex,
  //     }}
  //   />
  // );
};
export let HeaderIconRoundedBtn = ({
  size,
  bg,
  onPress,
  Provider,
  name,
  color,
  iconProps,
  ...props
}) => {
  return (
    <RoundedButton
      {...{
        size,
        onPress,
        bg,
        ...props,
      }}
    >
      <Provider
        {...{
          name,
          size: size * 0.87,
          color,
          ...iconProps,
        }}
      />
    </RoundedButton>
  );
};
export let FullRowStyle = [full, row, aic];
export let FullRowSEView = ({ children }) => (
  <Animated.View
    style={[FullRowStyle, jcse]}
    entering={FadeIn}
    exiting={FadeOut}
  >
    {children}
  </Animated.View>
);
export let HorizontalSwitchableBottomTab = ({
  tabs = [],
  ActiveWidths = [],
  DeactiveWidths = [],
  activeIndex = 0,
  setActiveIndex,
}) => {
  let tabsLength = tabs.length;
  let Calc = (index = 0) => {
    let active = ActiveWidths[index];
    let deactive = DeactiveWidths[index];
    let diff = active - deactive;
    let fromCenter = (dim.width - active) / 2;
    let max = Math.floor(fromCenter + diff);
    let min =
      max - Math.floor(sum(DeactiveWidths?.slice(0, index)) + index * 10);
    return {
      active,
      max,
      min,
      deactive,
      mean: (active - deactive) / 2,
    };
  };
  let { active, max, min } = Calc(activeIndex);
  let tx = useSharedValue(min);
  let htx = useSharedValue(min);
  let activeWidth = useSharedValue(active);
  let pan = Gesture.Pan()
    .onUpdate(({ translationX }) => {
      tx.value = clamp(translationX + htx.value, -max, max);
      for (let i = 0; i < tabsLength; i++) {
        let item = Calc(i);
        let mMax = item.min;
        let mMin = mMax - item.deactive / 2 - item.mean;
        if (tx.value < mMax + item.mean && tx.value > mMin) {
          if (isFunction(setActiveIndex)) runOnJS(setActiveIndex)(i);
          activeWidth.value = withTiming(item.active, duration);
        }
      }
    })
    .onEnd(() => {
      let ACTIVE = Calc(activeIndex);
      let v = ACTIVE.min - ACTIVE.mean + 4;
      htx.value = v;
      tx.value = withTiming(v, duration);
    });
  let panStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tx.value,
      },
    ],
  }));
  let activeWidthStyle = useAnimatedStyle(() => ({
    width: activeWidth.value,
  }));
  let br = borderRadius("", 18);
  return (
    <Animated.View style={[fullWidth, height(60), jcc]}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[fullWidth, height(42), center]}>
          <Animated.View
            style={[
              height(36),
              activeWidthStyle,
              borderRadius("", 18),
              bw,
              borderColor("", "white"),
              overlay,
            ]}
          />
          <Animated.View style={[fh, row, aic, panStyle]}>
            {tabs.map((tab, i) => {
              let active = isEqual(activeIndex, i);
              return (
                <Button
                  key={i}
                  parentStyle={[height(36), margin("h", 5), center, br]}
                  btnStyle={[padding("h", 15), br]}
                  onPress={() => {
                    if (isFunction(setActiveIndex)) setActiveIndex(i);
                    let ACTIVE = Calc(i);
                    let n = ACTIVE.min - ACTIVE.mean + 4;
                    htx.value = n;
                    tx.value = withTiming(n, duration);
                    activeWidth.value = withTiming(ACTIVE.active, duration);
                  }}
                >
                  <Animated.Text
                    style={[
                      active && [fontSize(20), fontWeight("5")],
                      color("white"),
                    ]}
                  >
                    {tab}
                  </Animated.Text>
                </Button>
              );
            })}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
