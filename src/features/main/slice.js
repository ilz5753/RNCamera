import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
let slice = createSlice({
  name: "slice",
  initialState: {
    activePage: 0,
    ZoomMode: false,
    IsFocusZoomSlider: false,
    cameraType: "back",
    TimerSelect: false,
    TimerText: "OFF",
    RatioSelect: false,
    Ratios: {
      first: "9:16",
      third: "3:4",
      fourth: "9:16",
    },
    FlashSelect: false,
    FlashMode: {
      third: "off",
      fourth: "off",
    },
    MotionSelect: false,
    Filters: {
      third: false,
      fourth: false,
    },
    ActiveFilterTopTab: {
      third: 0,
      fourth: 0,
    },
    VideoSize: {
      title: "UHD",
      subtitle: "30",
    },
    VideoSizeSelect: false,
    FilterSelect: false,
    ShotsTypesSelect: false,
    SuperSteadySelect: false,
    OptimizationSelect: false,
    MostZoomBtnSelect: false,
    LatestPhoto: "",
  },
  reducers: {
    updateActivePage(state, { payload }) {
      state.activePage = payload;
    },
    toggleZoomMode(state) {
      state.ZoomMode = !state.ZoomMode;
    },
    ActiveZoomMode(state) {
      state.ZoomMode = true;
    },
    toggleIsFocusZoomSlider(state) {
      state.IsFocusZoomSlider = !state.IsFocusZoomSlider;
    },
    toggleCameraType(state) {
      state.cameraType = isEqual(state.cameraType, "back") ? "front" : "back";
    },
    toggleTimerSelect(state) {
      state.TimerSelect = !state.TimerSelect;
    },
    updateTimerText(state, { payload }) {
      state.TimerText = payload;
    },
    toggleRatioSelect(state) {
      state.RatioSelect = !state.RatioSelect;
    },
    updateRatios(state, { payload }) {
      state.Ratios = { ...state.Ratios, ...payload };
    },
    toggleFlashSelect(state) {
      state.FlashSelect = !state.FlashSelect;
    },
    updateFlashMode(state, { payload }) {
      state.FlashMode = { ...state.FlashMode, ...payload };
    },
    toggleMotionSelect(state) {
      state.MotionSelect = !state.MotionSelect;
    },
    toggleVideoSizeSelect(state) {
      state.VideoSizeSelect = !state.VideoSizeSelect;
    },
    toggleFilterSelect(state) {
      state.FilterSelect = !state.FilterSelect;
    },
    updateFilters(state, { payload }) {
      state.Filters = { ...state.Filters, ...payload };
    },
    updateActiveFilterTopTab(state, { payload }) {
      state.ActiveFilterTopTab = { ...state.ActiveFilterTopTab, ...payload };
    },
    updateVideoSize(state, { payload }) {
      state.VideoSize = { ...state.VideoSize, ...payload };
    },
    toggleShotsTypesSelect(state) {
      state.ShotsTypesSelect = !state.ShotsTypesSelect;
    },
    toggleSuperSteadySelect(state) {
      state.SuperSteadySelect = !state.SuperSteadySelect;
    },
    toggleOptimizationSelect(state) {
      state.OptimizationSelect = !state.OptimizationSelect;
    },
    toggleMostZoomBtnSelect(state) {
      state.MostZoomBtnSelect = !state.MostZoomBtnSelect;
    },
    updateLatestPhoto(state, { payload }) {
      state.LatestPhoto = payload;
    },
    reset(state) {
      state.ZoomMode = false;
      state.IsFocusZoomSlider = false;
      state.TimerSelect = false;
      state.RatioSelect = false;
      state.FlashSelect = false;
      // state.MotionSelect = false;
      state.VideoSizeSelect = false;
      state.FilterSelect = false;
      state.ShotsTypesSelect = false;
      state.SuperSteadySelect = false;
      // state.OptimizationSelect = false;
      state.MostZoomBtnSelect = false;
    },
  },
});
export let {
  updateActiveFilterTopTab,
  updateActivePage,
  updateFilters,
  updateFlashMode,
  updateLatestPhoto,
  updateRatios,
  updateTimerText,
  updateVideoSize,
  toggleCameraType,
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
  ActiveZoomMode,
  reset
} = slice.actions;
export let _slice = ({ slice }) => slice;
export default slice.reducer;
