<script>
import {computed, defineComponent, onBeforeMount, reactive} from 'vue';
import SingleRecommendation from '@/components/SingleRecommend.vue';
import Little_Tile from '@/components/PlaylistTile.vue';

export default defineComponent({
  name: 'musicRadar',
  components: {Little_Tile, SingleRecommendation},
  setup() {
    const listData = reactive({
      '热门': [],
      '主题': [],
      '情感': [],
      '场景': [],
      '曲风': [],
      '语言': [],
      '人群': [],
      '乐器': [],
    });
    const listDataKeys = computed(()=>Object.keys(listData));

    onBeforeMount(()=>{
      for (const key in listData) {
        if (!listData.hasOwnProperty(key)) continue;
        for (let i=0; i<20; i++) {
          listData[key].push(i);
        }
      }
    });

    return {
      listData,
      listDataKeys,
    };
  },
});
</script>

<template>
  <div id="musicRadarBody">
    <div style="height: 25vh; width: 25vw">
      <SingleRecommendation/>
    </div>
    <div style="width: 100%">
      <div v-for="(key) in listDataKeys" :key="key">
        <span style="font-weight: 600; font-size: 20px">{{key}}</span>
        <div class="tileContainer">
          <div v-for="(item) in listData[key]" :key="item">
            <div>
              <Little_Tile :show-play-volume="false"/>
              <span>{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
#musicRadarBody
{
  margin-left: 2vw;
  margin-right: 2vw;
  font-family: "Microsoft YaHei", serif;
  display: flex;
  flex-direction: column;
  gap: 5vh;
}
.tileContainer
{
  margin-top: 2vh;
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 1vw;
}
</style>
