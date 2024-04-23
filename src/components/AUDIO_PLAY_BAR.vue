<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import FFT from 'fft-js';
import {
  getAudioDom,
  getAudioInfo,
  getAudioList,
  setCurrentTime,
  togglePlayStatus,
} from '@/utils/music_play_bus/private';

export default defineComponent({
  name: 'Music_Play_Bar',
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const playIconUrl = ref(['http://101.201.66.67/static/icon/play_bar/play.svg', 'http://101.201.66.67/static/icon/play_bar/pause.svg']);

    const audioInfo = computed(()=> getAudioInfo());
    const audioList = computed(()=> getAudioList());
    const dragging = ref(false);


    // eslint-disable-next-line max-len
    const busRatio = computed(()=>(audioInfo.value.currentTime.value / audioInfo.value.duration.value * 100).toString() + '%');
    const localRatio = ref('0%');

    const toggleAudioPlayStatus = ()=>{
      togglePlayStatus();
      draw();
    };

    const clickProcess = (event)=>{
      setCurrentTime('ratio', parseFloat((event.clientX / document.body.clientWidth).toFixed(2)));
    };
    const mouseDown = (event)=> {
      // document.getElementById('processBox').classList.add('hover');
      event.preventDefault();
      dragging.value = true;
      document.getElementById('processPoint').classList.add('processPointHover');
      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUp);
    };
    const mouseUp = (event)=> {
      setCurrentTime('ratio', parseFloat(localRatio.value.substring(0, localRatio.value.length-1))/100);
      dragging.value = false;
      document.getElementById('processPoint').classList.remove('processPointHover');
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUp);
    };
    const mouseMoveListener = (event)=> {
      const domBody = document.getElementById('audioPlayBarBody');
      const diff = document.body.clientWidth - domBody.clientWidth;
      const clientX = event.clientX - diff > 0 ? event.clientX - diff : 0;
      localRatio.value= ((clientX / domBody.clientWidth) * 100).toFixed(2) + '%';
    };
    watch(busRatio, (value)=>{
      if (!dragging.value) localRatio.value = value;
    });

    let ctx = null;
    let dataArray = null;
    let fft = null;
    let bufferLength = null;
    let analyser = null;
    const domCanvas = document.getElementById('frequencyPlot');

    onMounted(()=>{
      // const domCanvas = ref(null);
      ctx = domCanvas.getContext('2d');
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      fft = new FFT(bufferLength);
      const audioElement = getAudioDom();
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
    });
    const draw = ()=>{
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      fft.forward(dataArray);
      ctx.clearRect(0, 0, domCanvas.width, domCanvas.height);
      for (let i = 0; i < bufferLength; i++) {
        const x = i;
        const y = domCanvas.height - dataArray[i] * domCanvas.height / 255;
        ctx.fillRect(x, y, 1, domCanvas.height - y);
      }
    };


    return {
      playIconUrl,
      audioInfo,
      audioList,
      localRatio,

      toggleAudioPlayStatus,
      clickProcess,
      mouseDown,
      domCanvas,
    };
  },
});
</script>

<template>
  <div id="audioPlayBarBody">
    <div id="fftVisibleArea">
      <canvas id="frequencyPlot" ref="domCanvas"></canvas>
    </div>

    <div id="processBox" @click="clickProcess" @mousedown="mouseDown">
      <div id="processBar">
        <div id="processRedBar" :style="{width: localRatio}">
          <div id="processPoint"></div>
        </div>
      </div>
    </div>


    <div id="playBarBody">
      <div id="leftArea">
        <div v-show=!isDetail id="cover">
          <router-link id="coverMask" to="/player"></router-link>
        </div>
        <div style="display: flex; flex-direction: column; height: inherit; margin-left: 1vw; justify-content: center">
          <div v-show=!isDetail id="audioTitle">
            <span style="white-space: nowrap; font-size: 2vh">{{audioInfo.title}}</span>
          </div>
          <div id="userBtnArea">
            <span id="like" class="userBtn"></span>
            <span id="comment" class="userBtn"></span>
            <span id="append" class="userBtn"></span>
            <span id="share" class="userBtn"></span>
          </div>
        </div>
        <span v-show=isDetail id="timestamp" style="color: white">
        {{audioInfo.currentTime.min}}:{{audioInfo.currentTime.sec}} /
        {{audioInfo.duration.min}}:{{audioInfo.duration.sec}}
        </span>
      </div>


      <div id="middleArea">
        <span id="play_method"></span>
        <span id="prevBigBtn"></span>
        <div id="playBigBtn" :style="{'background-image':`url('${playIconUrl[audioInfo.status]}')`}" @click="toggleAudioPlayStatus">

        </div>
        <span id="nxtBigBtn"></span>
        <span id="volume"></span>
      </div>

      <div id="rightArea">
      <span v-show=!isDetail id="timestamp">
        {{audioInfo.currentTime.min}}:{{audioInfo.currentTime.sec}} /
        {{audioInfo.duration.min}}:{{audioInfo.duration.sec}}
      </span>
        <span id="toggle_lyrics"></span>
        <div id="playlist">
          <span id="listIcon"></span>
          <span id="listLength">{{audioList.length}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#playBarBody
{
  position: relative;
  z-index: 0;
  display: flex;
  width: 100%;
  height: 10vh;
  justify-content: space-between;

  --bottom_bar-height: 10vh;
}
/* fft音频可视化 */
#fftVisibleArea
{

  position: absolute;
  z-index: 0;
  top: -9vh;

  display: flex;
  justify-content: center;

  height: 10vh;
  width: 100%;
}
#frequencyPlot
{
  height: inherit;
  width: 50%;

  background-color: black;
}

/* 顶部进度条 */
#processBox
{
  display: flex;
  align-items: center;
  height: 2vh;

  overflow: hidden;
}
#processBar
{
  z-index: 1;
  display: inline-flex;
  height: var(--processBar-height);
  width: 100%;
  background-color: #b6b6b6;

  --processBar-height: .6vh;
}
#processRedBar
{
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f3263f;
}
#processPoint
{
  position: absolute;
  right: calc(-1 * var(--processBar-height));
  border-radius: calc(999 * var(--processBar-height));
  height: 0;
  width: 0;
  background-color: #f3263f;

  transition-duration: .2s;
}
#processBox:hover > #processBar > #processRedBar > #processPoint, #processPoint.processPointHover
{
  height: calc(2 * var(--processBar-height));
  width: calc(2 * var(--processBar-height));
}


/* 左侧信息区 */
#leftArea
{
  display: flex;
  align-items: center;
  height: var(--bottom_bar-height);
  width: 30%;
}
#cover
{
  margin-left: 3vw;
  height: 7vh;
  width: 7vh;
  border-radius: 1vh;

  background-image: url("http://101.201.66.67/assets/images/album/IMG-00001.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
#cover:hover > #coverMask
{
  display: block;
}
#coverMask
{
  display: none;

  height: inherit;
  width: inherit;
  border-radius: inherit;

  background-color: rgba(0, 0, 0, .5);
  background-image: url("http://101.201.66.67/static/icon/play_bar/arrows_up_line 1.svg");
  background-size: 60% 60%;
  background-position: center;
  background-repeat: no-repeat;
}
#audioTitle
{
  overflow: hidden;
  width: 10vw;
  font-size: 2.5vh;
}
#userBtnArea
{
  display: flex;
  margin-top: 1vh;
}
.userBtn
{
  margin-right: .8vw;
  height: 3vh;
  width: 3vh;

  background-size: cover;
}
#like
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/dislike.svg");
}
#comment
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/comment.svg");
}
#append
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/append.svg");
}
#share
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/share.svg");
}

/* 右侧信息区 */
#rightArea
{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: var(--bottom_bar-height);
  width: 30%;
}
#timestamp
{
  margin-left: 2vw;
  color: #4b4a4a;
  font-size: 2vh;
}
#playlist
{
  margin-left: 1vw;
  display: flex;
  align-items: center;
}
#listIcon
{
  height: 3.6vh;
  width: 3.6vh;
  background-size: cover;
  background-image: url("http://101.201.66.67/static/icon/play_bar/play_list.svg");
}
#listLength
{
  margin-right: 4vw;
  color: #4b4a4a;
  font-size: 2.3vh;
}


/* 中间按钮区 */
#middleArea
{
  display: flex;
  flex: 0;
  justify-content: center;
  align-items: center;
}
#playBigBtn
{
  display: inline-block;
  margin-left: .7vw;
  margin-right: .7vw;
  height: 7vh;
  width: 7vh;
  background-size: contain;

  cursor: pointer;
}
#prevBigBtn, #nxtBigBtn
{
  display: inline-block;
  height: 4.8vh;
  width: 4.8vh;
  background-size: contain;
  transition-duration: .1s;

  cursor: pointer;
}
#prevBigBtn
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/prev_black.svg");
}
#nxtBigBtn
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/next_black.svg");
}
#prevBigBtn:hover
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/prev_red.svg");
}
#nxtBigBtn:hover
{
  background-image: url("http://101.201.66.67/static/icon/play_bar/next_red.svg");
}

</style>
