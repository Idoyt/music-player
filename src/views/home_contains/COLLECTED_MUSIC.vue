<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';

export default defineComponent({
  name: 'collectedMusic',
  components: {
  },
  setup() {
    const collectedMusic = ref([]);

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
    };
  },
});
</script>

<template>
  <div id="likeBody">
    <span>Collected Music</span>
    <el-affix :offset="30">
      <div>233</div>
    </el-affix>
  </div>
</template>

<style scoped>
#likeBody
{
  width: 100%;
  height: 100vh;
}
</style>
