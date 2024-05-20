<script>
import {defineComponent, onBeforeMount, ref, watch} from 'vue';
import audioPlayBar from '@/components/AduioPlayBar.vue';
import topBar from '@/components/TopBar.vue';

import recommendationPage from '@/views/home_contains/MusicRecommend.vue';
import audioHall from '@/views/home_contains/MusicHall.vue';
import audioRadar from '@/views/home_contains/MusicRadar.vue';

import audioCollected from '@/views/home_contains/MusicUserLike.vue';
import usersFollowed from '@/views/home_contains/FollowedUsers.vue';
import recordPlayed from '@/views/home_contains/MusicPlayHistory.vue';
import userSpace from '@/views/UserSpace.vue';
import playListDetails from '@/views/PlayListDetails.vue';

import {useStore} from 'vuex';
import {getCurrentTime} from '@/utils/music_play_bus';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';


export default defineComponent({
  name: 'homePage',
  // 工具类Component需要放在组件Personalized之前
  components: {
    audioPlayBar,
    topBar,

    recommendationPage,
    audioHall,
    audioRadar,
    audioCollected,
    usersFollowed,
    recordPlayed,
    userSpace,
    playListDetails,
  },
  setup() {
    const playlist = ref([]);
    const store = useStore();
    const usingComponent = ref(store.state.audioModule.navigateTo.component);
    const componentData = ref(store.state.audioModule.navigateTo.data);
    const navigate = (component)=> {
      store.commit('audioModule/updateNavigate', {to: component, data: {}});
    };

    onBeforeMount(async ()=>{
      const store = useStore();
      const router = useRouter();
      let data = null;
      let response = null;

      // get music current time
      store.commit('audioModule/updateAudioCurrentTime', getCurrentTime());


      // check login status
      data = {'email': store.state.audioModule.userInfo.email};
      response = await axios.get(API_BASE_URL + '/check_login/', {params: data, withCredentials: true});
      if (response.data.state !== 'success') await router.push('/login');


      // get playlist user created
      data = {};
      response = await axios.get(API_BASE_URL + '/get_playlist_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        playlist.value = response.data.message;
      }
    });

    watch(store.state.audioModule.navigateTo, (value)=>{
      usingComponent.value = value.component;
      componentData.value = value.data;
    });

    return {
      usingComponent,
      componentData,
      playlist,
      navigate,
    };
  },
});
</script>

<template>
  <div id="appBody">
    <div id="menuBar">
      <el-menu v-model="usingComponent" style="height: 100%">
        <span style="padding: 1vh 20px 0 20px; font-size: 30px; white-space: nowrap">Miku Music</span>
        <el-menu-item-group title="Online Music">
          <el-menu-item index="0" @click="navigate('recommendationPage')">
            <span class="menuItem">Recommendation</span>
          </el-menu-item>
          <el-menu-item index="1" @click="navigate('audioHall')">
            <span class="menuItem">Music Hall</span>
          </el-menu-item>
          <el-menu-item index="2" @click="navigate('audioRadar')">
            <span class="menuItem">Music Radar</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="My Music">
          <el-menu-item index="3" @click="navigate('audioCollected')">
            <span class="menuItem">Collected Music</span>
          </el-menu-item>
          <el-menu-item index="4" @click="navigate('usersFollowed')">
            <span class="menuItem">My Followings</span>
          </el-menu-item>
          <el-menu-item index="5" @click="navigate('recordPlayed')">
            <span class="menuItem">Recently Play</span>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Created List">
          <div style="min-height: 3vh">
            <div v-for="item in playlist" :key="item">
              <span>{{item.list_name}}</span>
            </div>
          </div>
        </el-menu-item-group>

        <el-menu-item-group title="Selected List">
          <div style="min-height: 3vh">
            <div v-for="item in playlist" :key="item">
              <span>{{item.list_name}}</span>
            </div>
          </div>
        </el-menu-item-group>
      </el-menu>
    </div>

    <div id="mainContent">
      <div id="topBar">
        <top-bar @navigate="navigate('userSpace')"/>
      </div>
      <div id="content">
        <component :is="usingComponent"/>
      </div>
      <div id="audioPlayBar">
        <audio-play-bar/>
      </div>
    </div>
  </div>
</template>

<style scoped>

@font-face {
  font-family: "miku_font";
  src: url("http://123.57.7.117/static/font/zaozigongfangziti.otf");
}
#appBody
{
  position: relative;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: auto 1fr;
  background-color: #88cccc;
}
#mainContent
{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: miku_font, serif;
}
#menuBar
{
  z-index: 3;
  font-family: miku_font, serif;
}
#content
{
  z-index: 1;
  margin-top: 10vh;
  margin-bottom: 12vh;
  height: 78vh;
  overflow: auto;
}
#content::-webkit-scrollbar
{
  width: 0;
}
#audioPlayBar
{
  position: fixed;
  bottom: 0;
  z-index:2;
  height: 12vh;
  width: 90%;
}
#topBar
{
  position: fixed;
  top: 0;
  z-index: 2;
  height: 10vh;
  width: 90%;
}
.el-menu
{
  background-color: rgba(255, 255, 255, .5);
}
.el-menu-item-group
{
  margin-bottom: 3vh;
}
.el-menu-item
{
  font-size: 18px;
  padding-right: 0;
  border-right: 0 solid #f3263f;
}
.el-menu-item.is-active
{
  color: #f3263f;
}
.el-menu-item:hover
{
  border-right: 6px solid #f3263f;
}
</style>
