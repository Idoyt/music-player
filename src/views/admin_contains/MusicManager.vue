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
    });
    const file = reactive({
      audio: null,
      lyric: null,
      cover: null,
    });


    const showDrawer = ()=>{
      newMusicInfoDrawer.value = true;
      console.log(newMusicInfoDrawer.value);
    };
    const submit = ()=> {
      console.log(newMusicInfo.value);
      console.log(file);
    };

    const beforeDrawerClose = (done) => {
      // 清空表单数据
      musicForm.value.resetFields();
      done();
    };
    const submitForm = ()=> {
      console.log('提交表单:', newMusicInfo);

      // 提交完成后关闭 el-drawer
      newMusicInfoDrawer.value = false;
    };


    onBeforeMount(async ()=>{
      const data = {};
      const response = await axios.get(API_BASE_URL + '/get_music_info/', {params: data, withCredentials: true});
      console.log(response);
      if (response.data.state === 'success') {
        musicData.value = response.data.message;
        total.value = musicData.value.length;
      } else alert('Get music info failed, please try again later');
    });

    return {
      musicData,
      musicListData,
      newMusicInfoDrawer,
      newMusicInfo,
      submit,
      file,
      musicForm,
      beforeDrawerClose,
      submitForm,
      showDrawer,
      total,
      pageSize,
    };
  },
});
</script>

<template>
  <div id="musicManageBody">
    <el-button @click="showDrawer">New Music</el-button>

    <el-drawer
        v-model="newMusicInfoDrawer"
        :before-close="beforeDrawerClose"
        :width="400"
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
          <el-upload
              :before-upload="beforeAudioUpload"
              action="/upload_audio"
              class="upload-demo"
              drag
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="音乐封面">
          <el-upload
              :before-upload="beforeCoverUpload"
              action="/upload_cover"
              class="upload-demo"
              drag
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌词文件">
          <el-upload
              :before-upload="beforeLyricsUpload"
              action="/upload_lyrics"
              class="upload-demo"
              drag
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-drawer>


    <div style="display: flex; flex-direction: column">
      <div style="height: 90vh; overflow: hidden">
        <el-table :data="musicData" :row-key="row => row.music_id" stripe style="width: 100%">
          <el-table-column label="Title" prop="title"></el-table-column>
          <el-table-column label="Artist" prop="artist"></el-table-column>
          <el-table-column label="Genre" prop="genre"></el-table-column>
          <el-table-column label="Album" prop="album"></el-table-column>
          <el-table-column label="Release Date" prop="release_date"></el-table-column>
          <el-table-column label="Cover" prop="cover_url"></el-table-column>
          <el-table-column label="Source" prop="source_url"></el-table-column>
          <el-table-column label="Lyrics" prop="lyrics_url"></el-table-column>
          <el-table-column label="Likes" prop="likes"></el-table-column>
          <el-table-column label="Shares" prop="shares"></el-table-column>
          <el-table-column label="Search Volume" prop="search_volume"></el-table-column>
          <el-table-column label="Extension" prop="extension"></el-table-column>
          <el-table-column label="Active" prop="is_active"></el-table-column>
          <el-table-column label="Reviewed" prop="is_reviewed"></el-table-column>
        </el-table>
      </div>

      <el-pagination :total="1000" layout="prev, pager, next" />
    </div>


  </div>
</template>

<style scoped>

</style>
