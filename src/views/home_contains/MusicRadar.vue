<script>
import {computed, defineComponent, onBeforeMount, reactive} from 'vue';
import SingleRecommendation from '@/components/SingleRecommend.vue';
import LittleTile from '@/components/PlaylistTile.vue';

export default defineComponent({
  name: 'musicRadar',
  components: {LittleTile, SingleRecommendation},
  setup() {
    const listData = reactive({
      '热门': ['随心听', '抖音神曲', '深度催眠', '情感治愈站', 'KTV必点歌', '经典', '网络流行', '宝宝胎教', '', '', '', ''],
      '主题': [],
      '情感': [],
      '场景': [],
      '曲风': [],
      '语言': [],
      '人群': [],
      '乐器': [],
    });
    const listDataKeys = computed(()=>Object.keys(listData));
    const coverUrl = [
      'https://y.qq.com/music/common/upload/t_music_radio/1260297.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054458.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/3188826.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2929760.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054525.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054444.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054505.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/4488415.jpeg',
      'https://y.qq.com/music/common/upload/t_music_radio/2054474.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/3171367.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054413.jpg?max_age=2592000',
      'https://y.qq.com/music/common/upload/t_music_radio/2054526.jpg?max_age=2592000',
    ];

    onBeforeMount(()=>{

    });

    return {
      listData,
      listDataKeys,
      coverUrl,
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
          <div v-for="(item, index) in listData[key]" :key="item">
            <div>
              <LittleTile :list_cover="coverUrl[index]" :show-play-volume="false" style="height: 28vh"/>
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
