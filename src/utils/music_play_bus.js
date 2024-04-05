import {reactive, ref} from 'vue';
import axios from 'axios';

const domAudio = new Audio();
const audioList = ref([]);
const audioInfo = reactive({
  index: 0,
  tag: '',
  nowLine: 0,
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
  domAudio.addEventListener('loadedmetadata', updateCurrentTime);
  domAudio.addEventListener('timeupdate', updateCurrentTime);
  await getLyric('http://101.201.66.67/assets/audio/lyric/LRC-00001.utf8.lrc');
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
 * @constructor
 */
function updateCurrentTime() {
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
  const time = audioInfo.lyric.lyr[audioInfo.nowLine].time;
  const split = time.indexOf(':');
  let triggerTime = 999999999;
  // console.log('断点:', split, time);
  if (time) {
    triggerTime =
        parseInt(time.substring(0, split)) * 60 +
        parseInt(time.substring(split+1));
  }
  const nowTime = parseFloat(audioInfo.currentTime.value);
  if (triggerTime < nowTime) audioInfo.nowLine++;
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
 * @param {json} data
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
