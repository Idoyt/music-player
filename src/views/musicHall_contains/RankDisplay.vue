<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import LITTLE_TILE from '@/components/PlaylistTile.vue';

export default defineComponent({
  name: 'rankDisplay',
  components: {
    LITTLE_TILE,
  },
  setup() {
    const rankTile = ['飙升榜', '热歌榜', '新歌榜', '原创榜'];
    const rankInfo = ref([]);
    // temp rank information for test
    const tempInfo = {
      title: 'Temp Rank Title',
      playVolume: 23333,
      musicList: [
        {title: 'temp music title in list', artist: 'temp artist in list'},
        {title: 'temp music title in list', artist: 'temp artist in list'},
        {title: 'temp music title in list', artist: 'temp artist in list'}],
    };
    const areaRankInfo = ref([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    onBeforeMount(()=>{
      // 模拟获取rankInfo
      for (let i=0; i<6; i++) {
        rankInfo.value.push(tempInfo);
      }
    });

    return {
      rankTile,
      rankInfo,
      areaRankInfo,
    };
  },
});
</script>

<template>
  <div id="rankDisplayBody">
    <div id="bigRanks">
      <div v-for="(item, index) in rankInfo" :key = index class="rankUniteCover">
        <div class="rankUnite">
          <div class="rankCover">
            <LITTLE_TILE :showPlayVolume=false></LITTLE_TILE>
          </div>

          <div class="rankPreview">
            <span style="font-size: 18px; font-weight: 600;margin: 1vh 0 2vh 0">{{item.title}}</span>
            <div v-for="(music, musicIndex) in item.musicList" :key="musicIndex" class="music">
              <span style="margin-right: .3vw">{{musicIndex}}.</span>
              <span>{{music.title}} - {{music.artist}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="areaRank">
      <div style="font-size: 20px; font-weight: 600; margin-bottom: 2vh">
        <span>地区榜</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(7, auto); grid-gap: 1vw">
        <div v-for="(item) in areaRankInfo" :key="item" class="areaRankUniteCover">
          <div class="areaRankCover">
            <LITTLE_TILE></LITTLE_TILE>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
#rankDisplayBody
{
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei", serif;
}
#bigRanks
{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vw;
}
.rankUnite
{
  display: flex;
  height: 20vh;
  max-width: 25vw;
  border-radius: 1.2vh;
  background-color: rgba(0, 0, 0, .1);
  transition-duration: .1s;
}
.rankUniteCover:hover
{
  margin-top: -1vh;
}
.rankCover
{
  aspect-ratio: 1/1;
  max-height: 25vh;
  border-radius: 1.2vh;
}
.rankPreview
{
  display: flex;
  margin-left: 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-direction: column;
  height: inherit;
  flex: 1;
}
.music
{
  flex: 1;
  font-size: 13px;
  color: #737373;
}
#areaRank
{
  margin-top: 5vh;
}
.areaRankCover
{
  min-height: 5vh;
  aspect-ratio: 1/1;
  transition-duration: .1s;
}
.areaRankUniteCover:hover
{
  margin-top: -1vh;
}
</style>
