<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Little_Tile',
  setup(props) {
    console.log(props.indent);
  },
  props: {
    indent: Object,
    showPlayVolume: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<template>
  <div :style="indent" class="littleTile">
    <span class="tileFilter"></span>
    <span class="playBtn" @click="start_play"/>
    <span v-if="showPlayVolume" class="playVolume">114514</span>
  </div>

</template>

<style scoped>
.littleTile
{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  margin-left: 2vw;
  border-radius: 1.2vh;
  height: 26vh;
  width: 26vh;
  background-image: url("http://101.201.66.67/assets/images/album/IMG-00001.jpg");
  background-size: cover;
  transition-duration: .3s;

  cursor: pointer;
}
.littleTile:hover
{
  transform: scale(1.08);
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

  height: 8.67vh;
  width: 4vw;

  background-image: url("http://101.201.66.67/static/icon/little_tile/play_white.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: background-image .2s ease-in-out;
}
.playBtn:hover
{
  background-image: url("http://101.201.66.67/static/icon/little_tile/play_red.svg");
}

.playVolume
{
  position: absolute;
  padding: .1vh .2vw;
  right: 0;
  bottom: 0;
  margin-right: 1vw;
  margin-bottom: 2vh;
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
