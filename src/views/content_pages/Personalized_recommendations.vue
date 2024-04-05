<script>
import {defineComponent, ref} from 'vue';
import Little_Tile from '@/components/LITTLE_TILE.vue';

export default defineComponent({
  name: 'Recommend_page',
  setup() {
    const user_id = ref('Idoyt_');
    const indent = ref({'margin-left': 0});

    return {user_id, indent};
  },
  components: {
    Little_Tile,
  },
});
</script>

<template>
  <div id="body">
    <div id="today" class="recommend_unit">
      <span class="recommend_title">Hi {{user_id}},今日为你推荐</span>
      <div style="display: flex;padding-right: 1vw">
        <div id="infinite_songs"  class="big_tile"></div>
        <Little_Tile :showPlayVolume="false"></Little_Tile>
        <Little_Tile :showPlayVolume="false"></Little_Tile>
        <Little_Tile :showPlayVolume="false"></Little_Tile>
        <Little_Tile :showPlayVolume="false"></Little_Tile>
      </div>
    </div>
    <div id="single" class="recommend_unit">
      <span class="recommend_title">推荐歌单</span>
      <div style="display: flex;padding-right: 1vw">
        <Little_Tile :style="indent"></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
      </div>

      <div style="display: flex;padding-right: 1vw;margin-top: 5vh">
        <Little_Tile :style="indent"></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
        <Little_Tile></Little_Tile>
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
