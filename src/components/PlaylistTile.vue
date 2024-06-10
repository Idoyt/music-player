<script>
import {defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'Little_Tile',
  props: {
    showPlayVolume: {
      type: Boolean,
      default: true,
    },
    list_cover: {
      type: String,
      default: 'http://123.57.7.117/assets/images/album/IMG-00001.jpg',
    },
    play_volume: {
      type: Number,
      default: 3481,
    },
    playlist_id: {
      type: String,
      default: 'qwq',
    },
  },
  setup(props, {emit}) {
    const store = useStore();
    const navigateTo = ()=> {
      store.commit('audioModule/updateNavigate', {to: 'playListDetails', data: props.playlist_id});
    };

    return {
      navigateTo,
    };
  },
});
</script>

<template>
  <div id="domTile" class="littleTile" @click="navigateTo">
    <el-image :src="$props.list_cover" style="position: absolute; border-radius: inherit"></el-image>
    <div class="tileFilter"></div>
    <div class="playBtn"/>
    <span v-if="showPlayVolume" class="playVolume">{{$props.play_volume}}</span>
  </div>

</template>

<style scoped>
.littleTile
{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;

  height: 100%;
  aspect-ratio: 1/1;

  background-size: cover;
  transition-duration: .3s;

  cursor: pointer;
}
.littleTile:hover > .playBtn
{
  display: block;
}
.littleTile:hover > .playVolume
{
  display: none;
}
.tileFilter
{
  opacity: 0;
  position: absolute;

  border-radius: inherit;

  height: 100%;
  width: 100%;
  z-index: 1;

  background-color: rgba(0, 0, 0, .3);
}
.littleTile:hover > .tileFilter
{
  opacity: 1;
}
.playBtn
{
  display: none;
  z-index: 2;

  height: 40%;
  width: 40%;

  background-image: url("http://123.57.7.117/static/icon/little_tile/play_white.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: background-image .2s ease-in-out;
}
.playBtn:hover
{
  background-image: url("http://123.57.7.117/static/icon/little_tile/play_red.svg");
}

.playVolume
{
  position: absolute;
  padding: 1px 8px 1px 8px;
  right: 0;
  bottom: 0;
  margin-right: 10px;
  margin-bottom: 8px;
  white-space: nowrap;

  color: white;
  background-color: black;
  border-radius: 1vh;

  user-select: none;
  -moz-user-select: none; /* Firefox 支持的前缀 */
  -ms-user-select: none; /* IE/Edge 支持的前缀 */
  -webkit-user-select: none; /* Chrome 和 Safari 支持的前缀 */
}
</style>
