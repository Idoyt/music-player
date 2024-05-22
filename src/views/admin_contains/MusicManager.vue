<script>
import {defineComponent, onBeforeMount, reactive, ref} from 'vue';
import {API_BASE_URL} from '@/assets/constants';
import axios from 'axios';

export default defineComponent({
  name: 'MusicManager',
  setup() {
    const musicData = ref(null);
    const musicListData = ref(null);
    const newMusicInfoDrawer = ref(false);
    const musicForm = ref(null);
    const total = ref(0);
    const pageSize = ref(5);
    const newMusicInfo =reactive({
      title: '',
      artist: '',
      genre: '',
      album: '',
      files: {
        audio: null,
        lyric: null,
        cover: null,
      },
    });


    const showDrawer = ()=>{
      newMusicInfoDrawer.value = true;
    };
    const submitForm = async ()=> {
      console.log('提交表单:', newMusicInfo);
      const formData = new FormData();

      for (const key in newMusicInfo) {
        if (!newMusicInfo.hasOwnProperty(key)) continue;
        if (key === 'files') {
          for (const file in newMusicInfo[key]) {
            if (newMusicInfo[key].hasOwnProperty(file)) {
              formData.append(file, newMusicInfo[key][file]);
            }
          }
        } else {
          formData.append(key, newMusicInfo[key]);
        }
      }

      const response = await axios.post(API_BASE_URL + '/new_music_info/', formData, {withCredentials: true});
      console.log(response);
      // 提交完成后关闭 el-drawer
      newMusicInfoDrawer.value = false;
    };
    const reshapeFiles = (event, type)=>{
      newMusicInfo.files[type] = Array.from(event.target.files)[0];
    };


    onBeforeMount(async ()=>{
      const data = {};
      const response = await axios.get(API_BASE_URL + '/get_music_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        musicData.value = response.data.message;
        total.value = musicData.value.length;
        console.log(musicData.value);
      } else alert('Get music info failed, please try again later');
    });

    return {
      musicData,
      musicListData,
      newMusicInfoDrawer,
      newMusicInfo,
      musicForm,
      submitForm,
      showDrawer,
      total,
      pageSize,
      reshapeFiles,
    };
  },
});
</script>

<template>
  <div id="musicManageBody">
    <el-button @click="showDrawer">新建音乐信息</el-button>

    <el-drawer
        v-model="newMusicInfoDrawer"
        :width="600"
        title="提交音乐信息"
    >
      <!-- el-form 组件，用于输入音乐信息 -->
      <el-form ref="musicForm" :model="newMusicInfo" label-width="100px">
        <el-form-item label="音乐标题" prop="title">
          <el-input v-model="newMusicInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="音乐家" prop="artist">
          <el-input v-model="newMusicInfo.artist"></el-input>
        </el-form-item>
        <el-form-item label="音乐流派" prop="genre">
          <el-input v-model="newMusicInfo.genre"></el-input>
        </el-form-item>
        <el-form-item label="音乐专辑" prop="album">
          <el-input v-model="newMusicInfo.album"></el-input>
        </el-form-item>
        <el-form-item label="音频文件">
          <input accept=".ogg,.mp3,.wav" type="file" @change="reshapeFiles($event, 'audio')"/>
        </el-form-item>
        <el-form-item label="音乐封面">
          <input accept=".png" type="file" @change="reshapeFiles($event, 'cover')"/>
        </el-form-item>
        <el-form-item label="歌词文件">
          <input accept=".lrc" type="file" @change="reshapeFiles($event, 'lyric')"/>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-drawer>


    <div style="display: flex; flex-direction: column">
      <div style="height: 90vh; overflow: hidden">
        <el-table :data="musicData" :fit="true" :row-key="row => row.music_id" stripe style="width: 100%">
          <el-table-column label="Music ID" prop="music_id"></el-table-column>
          <el-table-column label="Title" prop="title"></el-table-column>
          <el-table-column label="Artist" prop="artist"></el-table-column>
          <el-table-column label="Genre" prop="genre"></el-table-column>
          <el-table-column label="Album" prop="album"></el-table-column>
          <el-table-column label="Release Date" prop="release_date"></el-table-column>
          <el-table-column label="Cover" prop="cover_extension"></el-table-column>
          <el-table-column label="Source" prop="source_extension"></el-table-column>
          <el-table-column label="Lyrics" prop="lyrics_extension"></el-table-column>
          <el-table-column label="Likes" prop="likes"></el-table-column>
          <el-table-column label="Shares" prop="shares"></el-table-column>
          <el-table-column label="Search Volume" prop="search_volume"></el-table-column>
          <el-table-column label="Active" prop="is_active"></el-table-column>
          <el-table-column label="Reviewed" prop="is_reviewed"></el-table-column>
        </el-table>
      </div>

      <el-pagination :total="total" layout="prev, pager, next" />
    </div>


  </div>
</template>

<style scoped>

</style>
