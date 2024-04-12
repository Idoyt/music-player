<script>
import {computed, defineComponent, onBeforeMount, onBeforeUnmount, ref, watch} from 'vue';
import audioPlayBar from '@/components/AUDIO_PLAY_BAR.vue';
import {getAudioInfo, getCurrentTime, setCurrentTime} from '@/utils/music_play_bus/private';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'audioPlay',
  components: {
    audioPlayBar,
  },
  setup() {
    const audioInfo = computed(()=>getAudioInfo());
    const finishLoadLyric = ref(audioInfo.value);
    const domLyric = ref(null);
    const nowLine = computed(()=>audioInfo.value.nowLine);
    let lastLine = -1;
    const store = useStore();

    onBeforeMount(()=>{
      setCurrentTime('currentTime', store.state['audioModule/audioCurrentTime']);
    });
    onBeforeUnmount(()=>{
      store.commit('audioModule/updateAudioInfo', getCurrentTime());
    });

    watch(nowLine, ()=>{
      const domNowLine =
          document.getElementById((audioInfo.value.nowLine).toString());
      let domLastLine = null;

      domLyric.value.style.marginTop =
          'calc(50% - ' + (nowLine.value * 8).toString() + 'vh' + ')';
      if (domNowLine) domNowLine.style.color = '#88cccc';
      if (lastLine !== -1) {
        domLastLine =
            document.getElementById((lastLine).toString());
        if (domLastLine) domLastLine.style.color = 'white';
      }
      lastLine = nowLine.value;
    });

    return {finishLoadLyric, domLyric, audioInfo};
  },
});
</script>

<template>
  <div id="componentBody">
    <div id="background">
      <div id="filter"></div>
      <img id="background_image" alt="background" src="http://101.201.66.67/assets/images/album/IMG-00001.jpg">
    </div>
    <div id="mainContent">
      <div id="albumCover"></div>
      <div id="lyricDisplayArea">
        <div id="audioInfo">
          <div v-if="finishLoadLyric">
            <p id="title" style="font-size: 4vh; margin-bottom: 0; color: white">{{audioInfo.lyric.ti}}</p>
            <div style="margin-top: 1vh;font-size: 2vh;color: #b6b6b6">
              <p id="artist" style="margin: 0">歌手： {{audioInfo.lyric.ar}}</p>
              <p id="album">专辑： {{audioInfo.lyric.al}}</p>
            </div>

          </div>
          <div v-else>
            <span>loading</span>
            <span>loading</span>
            <span>loading</span>
          </div>
        </div>

        <div id="lyricBox">
          <div id="lyric" ref="domLyric" style="transition: .5s; margin-top: 50%">
            <div v-if="finishLoadLyric">
              <p v-for="(line, index) in audioInfo.lyric.lyr" :key="index" style="margin: 0;height: 8vh">
                <span :id=index style="color: white; font-size: 2vh; user-select: none;">{{line.text}}</span>
              </p>
            </div>
            <div v-else>loading lyric</div>
          </div>
        </div>
      </div>
    </div>

    <div id="audioPlayBar">
      <audio-play-bar :isDetail=true></audio-play-bar>
    </div>
  </div>
</template>

<style scoped>
#componentBody
{
  height: 100vh;
  width: 100vw;
}
#filter
{
  position: absolute;
  z-index: 0;
  background-color: #1c1c1c;
  height: inherit;
  width: inherit;

  opacity: 0.7;
}
#background
{
  z-index: -1;
  position: absolute;
  height: inherit;
  width: inherit;
}
#background_image
{
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  filter: blur(25px);
  object-fit: cover;
}
#audioPlayBar
{
  width: inherit;
  position: absolute;
  bottom: 0;
}

#mainContent
{
  z-index: 1;
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
#albumCover
{
  height: 50vh;
  width: 50vh;
  background-image: url("http://101.201.66.67/assets/images/album/IMG-00001.jpg");
  background-size: cover;
}
#lyricDisplayArea
{
  margin-left: 22vw;

  height: 65vh;
  overflow: hidden;
  text-align: center;
}
#lyricBox
{
  height: 70vh;
  overflow: hidden;
  pointer-events: none;
}
</style>
