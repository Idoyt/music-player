<script>
import {defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
import LITTLE_TILE from '@/components/PlaylistTile.vue';
import SingleRecommendation from '@/components/SingleRecommend.vue';

export default defineComponent({
  name: 'recommendationPage',
  setup(props) {
    const store = useStore();
    const userInfo = store.state.audioModule.userInfo;
    const recommendedList = ref([]);
    const coverList = [
      'https://y.qq.com/music/photo_new/T002R300x300M000003Wk9Ph2g7ZJR.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000001VR9gE10UZ39.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T001R300x300M000003HK9132IEj2d_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000000riHYi2APddA_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000001Rk44t1hSzPu_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000001vAHgw0TiyYx_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000000dnaql1Ts459_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000001v1sdu0GH8I9_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M0000024Fv4w21jHt9_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M0000010WdYN0I3n3l_1.jpg?max_age=2592000',
      'https://y.qq.com/music/photo_new/T002R300x300M000002prafW3LmfnU_1.jpg?max_age=2592000',
    ];

    for (let i=0; i<=90; i++) {
      recommendedList.value.push(i);
    }


    return {
      userInfo,
      recommendedList,
      cover_list: coverList,
    };
  },
  components: {
    SingleRecommendation,
    LITTLE_TILE,
  },
});
</script>

<template>
  <div id="recommendBody">
    <div>
      <span class="title">Hi {{userInfo.username}}! 今日为你推荐</span>
      <div id="today">
        <div style="height: 90%">
          <SingleRecommendation></SingleRecommendation>
        </div>
        <div>
          <LITTLE_TILE :show-play-volume="false" class="tile" list_cover="https://qpic.y.qq.com/music_cover/gibZPCScqib8gWAEDI6ttxmibx21CttUUxfNr2XVyK2C7FRia9SFkdm7FA/300?n=1"></LITTLE_TILE>
          <div>今日30首</div>
        </div>
        <div>
          <LITTLE_TILE :show-play-volume="false" class="tile" list_cover="https://qpic.y.qq.com/music_cover/qI7ibfmZc5Mfsnm4yNE6ficIWPhgQ1hb5FGP3aLvhIZxP8YBU7xh8NSw/300?n=1"></LITTLE_TILE>
          <div>新歌推荐</div>
        </div>
        <div>
          <LITTLE_TILE :show-play-volume="false" class="tile" list_cover="https://music-file.y.qq.com/songlist/5bef2d9a8606f9ae54e18aabe152a732cc615e27_50f17.jpg?imageView2/4/w/300/h/300"></LITTLE_TILE>
          <div>miku专区</div>
        </div>
        <div>
          <LITTLE_TILE :show-play-volume="false" class="tile" list_cover="https://p.qpic.cn/music_cover/PiajxSqBRaELU4F9LZbYqibTSTMo5iaISfCqIqiaAOn6mf4/600?n=1"></LITTLE_TILE>
          <div>百万收藏</div>
        </div>

      </div>
    </div>


    <div style="margin-top: 5vh">
      <span class="title">歌单推荐</span>
      <div id="playlistRecommend">
        <div v-for="item in recommendedList" :key="item">
          <LITTLE_TILE :list_cover="cover_list[item]" :play_volume="Math.floor(Math.random() *8000 + 1000)" class="tile"></LITTLE_TILE>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#recommendBody
{
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
.title
{
  font-size: 24px;
}
#today
{
  display: grid;
  width: 100%;
  grid-template-columns: 2fr repeat(4, 1fr);
  grid-gap: 20px;
}
.tile
{
  height: 200px;
}
.tile:hover
{
  transform: scale(1.08);
}
#playlistRecommend
{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}
</style>


<!--
图片获取策略：在Recommend_page中获取图片的urls，然后把urls分发给各个Little_tiles，由little_tile向图床申请图片
-->
