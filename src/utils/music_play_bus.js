import {reactive, ref} from 'vue';
import axios from 'axios';

const domAudio = new Audio();
const audioList = ref([]);
const audioInfo = reactive({
  index: 0,
  tag: '',
  nowLine: -1,
  lyric: {},
  url: 'http://101.201.66.67/assets/audio/MSC-00001.ogg',
  title: 'audio title',
  status: 0,
  duration: {min: '00', sec: '00', value: ''},
  currentTime: {min: '00', sec: '00', value: ''},
});


/**
 * 初始化播放器
 * @return {Promise<void>}
 */
export async function initPlayer() {
  domAudio.src = audioInfo.url;
  getLyric('http://101.201.66.67/assets/audio/lyric/LRC-00001.utf8.lrc');
  domAudio.addEventListener('loadedmetadata', updateCurrentTime);
  domAudio.addEventListener('timeupdate', updateCurrentTime);
}

/**
 * 切换播放器状态
 * @constructor
 */
export function togglePlayStatus() {
  if (audioInfo.status) domAudio.pause();
  else domAudio.play();
  audioInfo.status = 1 ^ audioInfo.status;
}

/**
 * 更新播放器时间
 * @param {boolean} needPassiveUpdateNowLine 需要通过时间更新now line
 */
function updateCurrentTime(needPassiveUpdateNowLine = true) {
  // update time
  audioInfo.duration.value = domAudio.duration.toFixed(2);
  audioInfo.currentTime.value = domAudio.currentTime.toFixed(2);

  let tempMin = Math.floor(domAudio.currentTime / 60).toString();
  let tempSec = Math.floor(domAudio.currentTime % 60).toString();

  audioInfo.currentTime.min = (tempMin.length > 1 ? '' : '0') + tempMin;
  audioInfo.currentTime.sec = (tempSec.length > 1 ? '' : '0') + tempSec;

  tempMin = Math.floor(domAudio.duration / 60).toString();
  tempSec = Math.floor(domAudio.duration % 60).toString();
  audioInfo.duration.min = (tempMin.length > 1 ? '' : '0') + tempMin;
  audioInfo.duration.sec = (tempSec.length > 1 ? '' : '0') + tempSec;

  // update the value of nowLine

  if (needPassiveUpdateNowLine && audioInfo.nowLine < audioInfo.lyric.lyr.length-1) {
    // console.log(audioInfo.nowLine, audioInfo.lyric.lyr.length);
    const nextLineTime = audioInfo.lyric.lyr[audioInfo.nowLine+1].time;
    let nextLineTriggerTime = 999999999;
    if (nextLineTime) {
      nextLineTriggerTime =
          parseInt(nextLineTime.substring(0, 2)) * 60 + parseFloat(nextLineTime.substring(3));
    }
    const nowTime = parseFloat(audioInfo.currentTime.value);
    if (nextLineTriggerTime <= nowTime && audioInfo.nowLine < audioInfo.lyric.lyr.length-1) audioInfo.nowLine++;
  }
}

/**
 * 返回播放器的详细信息
 * @return {UnwrapNestedRefs<{duration: {sec: string, min: string, value: string}, currentTime: {sec: string, min: string, value: string}, nowLine: number, lyric: {}, index: number, tag: string, title: string, url: string, status: number}>}
 * @constructor
 */
export function getAudioInfo() {
  return audioInfo;
}

/**
 * 获取播放列表
 * @return {ref}
 * @constructor
 */
export function getAudioList() {
  return audioList;
}

/**
 * user use this function to set current time
 * @param {string} method
 * @param {number} value has two value, line for drag lyric and ratio for drag process bar
 * @return {number} temp, I will change it soon
 */
export function setCurrentTime(method= 'none', value= -1) {
  if (method === 'none' || value === -1) return;

  if (method === 'ratio') {
    domAudio.currentTime = domAudio.duration * value;
    const selectedTime = domAudio.currentTime;

    for (let i = 0; i < audioInfo.lyric.lyr.length; i++) {
      const tempItemTime = audioInfo.lyric.lyr[i].time;
      const itemTime = parseInt(tempItemTime.substring(0, 2)) * 60 + parseFloat(tempItemTime.substring(3));

      if (itemTime >= selectedTime) {
        audioInfo.nowLine = i-1;
        break;
      }
      if (i === audioInfo.lyric.lyr.length-1) {
        audioInfo.nowLine = i;
      }
    }
  }
  if (method === 'line') {
    return 2;
  }
  if (method === 'currentTime') {

  }
  updateCurrentTime(false);
}

/**
 * get lyric from server
 * @return {Promise<void>}
 * @param {string} url
 */
export async function getLyric(url) {
  let response = null;
  try {
    response = await axios.get(url);
    audioInfo.lyric = parseLyric(response.data);
  } catch (error) {
    console.log(error);
  }
}

/**
 * to parse the lrc to json
 * @param {string} data
 * @return {{ar: string, au: string, offset: string, lyr: *[], ti: string, by: string, al: string}}
 */
function parseLyric(data) {
  const metaData = data.split('\n');
  const lyric = {
    ti: '',
    ar: '',
    al: '',
    au: '',
    by: '',
    offset: '',
    lyr: [],
  };
  for (let i=0; i<metaData.length; i++) {
    const thisLine = metaData[i];
    const length = thisLine.length;
    let split = -1;
    if (thisLine[length-1] === ']' && /^[a-z]+$/.test(thisLine[1])) {
      split = thisLine.indexOf(':');
      const time = thisLine.substring(1, split);
      lyric[time] = thisLine.substring(split + 1, length - 1);
    } else {
      split = thisLine.indexOf(']');
      lyric.lyr.push({
        time: thisLine.substring(1, split).trim(),
        text: thisLine.substring(split+1, length).trim(),
      });
    }
  }
  return lyric;
}
