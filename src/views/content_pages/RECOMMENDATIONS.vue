<script>
import {defineComponent, ref} from 'vue';
import LITTLE_TILE from '@/components/LITTLE_TILE.vue';

export default defineComponent({
  name: 'recommendationPage',
  setup() {
    const uid = ref('Idoyt_');
    const indent = ref({'margin-left': 0});

    return {uid, indent};
  },
  components: {
    LITTLE_TILE,
  },
});
</script>

<template>
  <div id="body">
    <div id="today" class="recommend_unit">
      <span class="recommend_title">Hi {{uid}},今日为你推荐</span>
      <div style="display: flex;padding-right: 1vw">
        <div id="infinite_songs"  class="big_tile"></div>
        <LITTLE_TILE :showPlayVolume="false"></LITTLE_TILE>
        <LITTLE_TILE :showPlayVolume="false"></LITTLE_TILE>
        <LITTLE_TILE :showPlayVolume="false"></LITTLE_TILE>
        <LITTLE_TILE :showPlayVolume="false"></LITTLE_TILE>
      </div>
    </div>
    <div id="single" class="recommend_unit">
      <span class="recommend_title">推荐歌单</span>
      <div style="display: flex;padding-right: 1vw">
        <LITTLE_TILE :style="indent"></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
      </div>

      <div style="display: flex;padding-right: 1vw;margin-top: 5vh">
        <LITTLE_TILE :style="indent"></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
        <LITTLE_TILE></LITTLE_TILE>
      </div>
    </div>
    <div id="list" class="recommend_unit">
      <span class="recommend_title">推荐歌单</span>

    </div>
  </div>

</template>

<style scoped>
#body
{
  margin-left: 2.8vw;
}
#today
{
  margin-top: 3vh;
}
.recommend_unit
{
  margin-top: 5vh;
}
.recommend_title
{
  font-size: 3vh;
}
.big_tile
{
  display: flex;
  margin-top: 3vh;
  border-radius: 1.2vh;
  height: 26vh;
  width: 26vw;

  background-color: #575757;
  transition-duration: .3s;
}

.big_tile:hover:hover
{
  transform: scale(1.08);
}
</style>


<!--
图片获取策略：在Recommend_page中获取图片的urls，然后把urls分发给各个Little_tiles，由little_tile向图床申请图片
-->
