<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL, STATIC_BASE_URL} from '@/assets/constants';
// import {useStore} from 'vuex';
import {Select, VideoPlay} from '@element-plus/icons-vue';
import MusicList from '@/views/separate/MusicList.vue';
import CommentsList from '@/views/separate/CommentsList.vue';

export default defineComponent({
  name: 'PlayListDetails',
  components: {
    Selected: Select,
    VideoPlay,
    MusicList,
    CommentsList,
  },
  props: {
    music_list_id: String,
    list_creator: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const playlistInfo = ref({
      music_id: 'MSC-0001',
      playlist_name: 'Default List Name',
      cover_url: 'http://123.57.7.117/assets/images/album/IMG-00002.jpg',
      playlist: [1, 1, 1, 1, 1, 1, 1],
      rootComment: [1, 1, 1, 1, 1, 1],
    });
    const userInfo = ref({
      username: 'Default Username',
      avatar_url: STATIC_BASE_URL + '/assets/images/avatar/default.jpg',
    });
    // const store = useStore();
    const usingComponent = ref('MusicList');

    const changeItem = (dom, component)=> {
      dom = dom.target;
      const siblings = dom.parentNode.parentNode.childNodes;
      siblings.forEach((each) => {
        each.childNodes[0].classList.remove('is-active');
      });
      dom.classList.add('is-active');
      usingComponent.value = component;
    };

    onBeforeMount(async ()=>{
      let data = {};
      let response = {};
      // 这里的注释记得改成代码
      // userInfo.value = store.state.audioModule.userInfo;

      data = {playlist_id: props.music_list_id};
      response = await axios.get(API_BASE_URL+'/get_playlist_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        // playlistInfo.value = response.data.message;
      }
    });

    return {
      playlistInfo,
      userInfo,
      changeItem,
      usingComponent,
    };
  },
});
</script>

<template>
  <div id="PlaylistBody">
    <div id="topInfo">
      <el-image :lazy="true" :src="playlistInfo.cover_url" class="playlist_cover" fit="fill"></el-image>
      <div id="leftTopInfo">
        <div style="font-size: 26px; font-weight: 700">
          <div v-if="$props.list_creator">{{userInfo.username}}的{{playlistInfo.playlist_name}}</div>
          <div v-if="!$props.list_creator">{{playlistInfo.playlist_name}}</div>
        </div>
        <div style="display: flex; margin-top: 2vh; ">
          <el-image :src="userInfo.avatar_url" style="height: 3vh; aspect-ratio: 1/1;margin-right: 1vw; border-radius: 999vh"></el-image>
          <span>{{userInfo.username}}</span>
        </div>

        <div style="margin-top: 2vh; display: flex">
          <el-button class="buttonCommon" style="color: white; background-color: #f3263f">
            <el-icon><VideoPlay></VideoPlay> </el-icon>
            <span>播放全部</span>
          </el-button>

          <el-button class="buttonCommon">
            <el-icon><Selected></Selected></el-icon>
            <span>收藏歌单</span>
          </el-button>
        </div>

      </div>
    </div>

    <div id="playlist">
      <div style="display: flex; gap: 3vw; position: sticky; top: 0; background-color: #88cccc; padding-bottom: 3vh">
        <div class="itemCommon" @click="changeItem($event, 'MusicList')">
          <span>歌曲{{playlistInfo.playlist.length}}</span>
        </div>
        <div class="itemCommon" @click="changeItem($event, 'CommentsList')">
          <span>评论{{playlistInfo.rootComment.length}}</span>
        </div>
      </div>
      <component :is="usingComponent" style="margin: 2vh 0 0 1vw"></component>
    </div>
  </div>
</template>

<style scoped>
#PlaylistBody
{
  height: 100%;
  width: 100%;
}
#topInfo
{
  padding: 3vh 0 0 3vw;
  height: 20vh;
  display: flex;
}
.playlist_cover
{
  height: inherit;
  border-radius: 1vh;
  aspect-ratio: 1/1;
}
#leftTopInfo
{
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
}
.buttonCommon
{
  padding: 0;
  width: 16vw;
  height: 5vh;
  border: none;
  border-radius: 999vh;
  color: black;
  background-color: rgba(0, 0, 0, .2);
}
#playlist
{
  position: sticky;
  top: 0;
  margin-top: 6vh;
}
.itemCommon
{
  height: 3vh;
  width: 5vw;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  white-space: nowrap;

  font-size: 16px;
  cursor: pointer;

  .is-active
  {
    color: #f3263f;
    border-bottom: solid #f3263f;
  }
}
</style>
