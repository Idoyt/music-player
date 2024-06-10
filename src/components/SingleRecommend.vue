<script>
import {defineComponent, onBeforeMount, reactive} from 'vue';
import LITTLE_TILE from '@/components/PlaylistTile.vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'singleRecommendation',
  components: {LITTLE_TILE},
  setup() {
    const store = useStore();
    const nowMusicInfo = reactive({
      musicId: '',
      musicName: '花之塔',
      artist: '酸欠少女(Sayuri)',
    });

    onBeforeMount(()=>{
      // get music id
      const pointer = store.state.audioModule.busPlaylistPointer;
      console.log(pointer);
      nowMusicInfo.musicId = store.state.audioModule.busPlaylist;
      console.log(nowMusicInfo.musicId);

      // get music details
      // .....
    });

    return {
      nowMusicInfo,
    };
  },
});
</script>

<template>
  <div id="singleRecommend">
    <div style="height: 120px;margin-left: 30px">
      <LITTLE_TILE :show-play-volume="false" list_cover="http://123.57.7.117/assets/images/album/IMG-00002.jpg"></LITTLE_TILE>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div id="recommendTitle">{{nowMusicInfo.musicName}}</div>
      <div id="recommendArtist">{{nowMusicInfo.artist}}</div>
      <div style="margin-top: 20px">
        <el-image src="http://123.57.7.117/static/icon/play_bar/next_red.svg" style="height: 3vh; margin-right: 1vw"></el-image>
        <el-image src="http://123.57.7.117/static/icon/play_bar/dislike.svg" style="height: 3vh; margin-right: 1vw"></el-image>
        <el-image fit="cover" src="http://123.57.7.117/static/icon/play_bar/comment.svg" style="height: 3vh; margin-right: 1vw"></el-image>
      </div>
    </div>
  </div>
</template>

<style scoped>
#singleRecommend
{
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #75afaf;
  border-radius: 26px;
  align-items: center;
  gap: 10px;
}
</style>
