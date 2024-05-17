<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'PlayListDetails',
  components: {
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
    });
    const userInfo = ref({
      username: 'Default Username',
      avatar_url: '',
    });
    const store = useStore();

    onBeforeMount(async ()=>{
      let data = {};
      let response = {};
      userInfo.value = store.state.audioModule.userInfo;
      console.log(userInfo);

      onBeforeMount(async ()=>{
        data = {playlist_id: props.music_list_id};
        response = await axios.get(API_BASE_URL+'/get_playlist_info/', {params: data, withCredentials: true});
        if (response.data.state === 'success') {
          // playlistInfo.value = response.data.message;
        }
        console.log(response);
      });
    });


    return {
      playlistInfo,
      userInfo,
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
        <div>
          <el-image ></el-image>
        </div>

      </div>
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
</style>
