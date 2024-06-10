<script>
import {defineComponent, onBeforeMount, reactive, ref} from 'vue';
import {useStore} from 'vuex';
import LITTLE_TILE from '@/components/PlaylistTile.vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import {useRouter} from 'vue-router';
import {Files, FolderOpened} from '@element-plus/icons-vue';

export default defineComponent({
  name: 'spacePage',
  components: {Files, FolderOpened, LITTLE_TILE},
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfo = store.state.audioModule.userInfo;
    const tabData = ref('first');
    const listData = reactive({
      music: [],
      playlist: [],
      createdPlaylist: [],
    });

    onBeforeMount(async ()=> {
      let response = null;
      // check login
      let data = {'email': store.state.audioModule.userInfo.email};
      response = await axios.get(API_BASE_URL + '/check_login/', {params: data, withCredentials: true});
      if (response.data.state !== 'success') await router.push('/login');

      // get play list info
      data = {};
      response = await axios.get(API_BASE_URL + '/get_playlist_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        listData.playlist = response.data.message;
      }
      userInfo.avatar_url = 'http://123.57.7.117/assets/images/avatar/default.jpg';
    });


    return {
      userInfo,
      tabData,
      listData,
    };
  },
});
</script>

<template>
  <div id="spaceBody">
    <div id="userInfo">
      <el-avatar :size="100" :src="userInfo.avatar_url">
        <span>user</span>
      </el-avatar>
      <div id="infoArea">
        <div id="username" class="infoAreaItem" style="font-weight: 600; font-size: 20px">{{userInfo.username}}</div>
        <div>
          <span>设为公开</span>
          <el-switch></el-switch>
        </div>
        <div style="display: flex; margin-top: 5vh">
          <div id="follower">粉丝: 331</div>
          <div id="following" style="margin-left: 1vw">关注: 2</div>
        </div>
      </div>
    </div>

    <el-tabs  v-model="tabData" style="padding: 2vh 2vw 0 2vw">
      <el-tab-pane name="first">
        <template #label>
          <span style="font-size: 20px">Likes</span>
        </template>
        <div v-if="listData.music.length">
          <el-table :data="listData.music">
            <el-table-column label="Title"></el-table-column>
            <el-table-column label="Artist"></el-table-column>
            <el-table-column label="Album"></el-table-column>
          </el-table>
        </div>
        <div  v-if="!listData.music.length" class="emptyContainer">
          <el-icon  color="#f3263f" size="15vh"><Files></Files></el-icon>
          <span>用户设置为了隐私</span>
        </div>

      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span style="font-size: 20px">Playlist</span>
        </template>
        <div v-if="listData.playlist.length" id="playlistContainer">
          <div  v-for="(item) in listData.playlist" :key="item">
            <LITTLE_TILE :showPlayVolume="false" class="tile"></LITTLE_TILE>
            <span>{{item}}</span>
          </div>
        </div>

        <div v-if="!listData.playlist.length" class="emptyContainer">
          <el-icon  color="#f3263f" size="15vh"><FolderOpened></FolderOpened></el-icon>
          <span>You Have Not Created Playlist Before</span>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<style scoped>
#spaceBody
{
  position: relative;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 100%;
  width: 100%;
}
#userInfo
{
  padding: 3vh 0 0 2vw;
  display: flex;
  height: auto;
}
#infoArea
{
  padding: 2vh;
  display: flex;
  flex-direction: column;
}
#playlistContainer
{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 3vw;
}
.emptyContainer
{
  padding-top: 10vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 27px;
}
.tile
{
  height: 30vh;
  width: auto;
}

</style>
