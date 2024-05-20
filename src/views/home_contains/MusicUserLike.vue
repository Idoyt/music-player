<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import MusicList from '@/views/separate/MusicList.vue';

export default defineComponent({
  name: 'collectedMusic',
  components: {
    MusicList,
  },
  setup() {
    const collectedMusic = ref([]);
    const collectedList = ref([]);
    const collectedAlbum = ref([]);

    onBeforeMount(async ()=>{
      const data = {'list_type': 'like'};
      const response =
            await axios.get(API_BASE_URL + '/get_playlist_info/', {params: data, withCredentials: true});

      if (response.data.state === 'success') {
        collectedMusic.value = response.data.message;
      }
    });

    return {
      collectedMusic,
      collectedList,
      collectedAlbum,
    };
  },
});
</script>

<template>
  <div id="likeBody">
    <span style="font-weight: 600; font-size: 28px">我喜欢</span>
    <div>
      <div class="funcArea">
        <div class="itemTitles">
          <span>歌曲{{collectedMusic.length}}</span>
          <span>歌单{{collectedList.length}}</span>
          <span>专辑{{collectedAlbum.length}}</span>
        </div>
        <div class="funcButtons">
          <button class="funcBtn" style="background-color: #f3263f">播放全部</button>
          <button class="funcBtn">批量操作</button>
        </div>
      </div>

      <div style="margin-top: 3vh">
        <MusicList></MusicList>
      </div>
    </div>
  </div>
</template>

<style scoped>
#likeBody
{
  margin-left: 2vw;
  font-family: "Microsoft YaHei", serif;
  width: 100%;
  height: 100%;
}
.itemTitles
{
  margin-top: 3vh;
  display: flex;
  gap: 4vw;
  font-weight: 600;
}
.funcButtons
{
  display: flex;
  gap: 2vw;
  margin-top: 2vh;
}
.funcBtn
{
  height: 4vh;
  width: 8vw;
  border-radius: 2vh;
  border: none;
  padding: 0;
  cursor: pointer;
}
.funcBtn:hover
{
  filter: brightness(.9);
}
.funcArea
{
  position: sticky;
  top: 0;
  background-color: #88cccc;
}
</style>
