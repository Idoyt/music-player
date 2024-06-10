<script>
import {defineComponent, getCurrentInstance, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import {useRouter} from 'vue-router';
import {ArrowLeftBold, Headset, MessageBox, User} from '@element-plus/icons-vue';
import index from 'vuex';
import UserManager from '@/views/admin_contains/UserManager.vue';
import TaskManager from '@/views/admin_contains/TaskManager.vue';
import MusicManager from '@/views/admin_contains/MusicManager.vue';
import PlaylistManage from '@/views/admin_contains/PlaylistManage.vue';

export default defineComponent({
  name: 'adminEntrance',
  computed: {
    index() {
      return index;
    },
  },
  components: {
    UserManager,
    TaskManager,
    MusicManager,
    PlaylistManage,

    ArrowLeftBold,
    Headset,
    MessageBox,
    User,
  },
  setup() {
    const router = useRouter();
    const nowComponentIndex = ref(0);
    const components = Object.keys(getCurrentInstance().type.components);
    onBeforeMount(async ()=>{
      const response = await axios.get(API_BASE_URL + '/check_is_staff', {withCredentials: true});
      if (response.data.state !== 'success') {
        alert('You are not staff or not login');
        router.push('/login');
      }
    });

    const changeNowComponentIndex = (index)=> nowComponentIndex.value = index;

    return {
      nowComponentIndex,
      components,
      changeNowComponentIndex,
    };
  },
});
</script>

<template>
  <div id="adminPageBody">
    <div id="menuBody">
      <span id="menuTitle">操作栏</span>
      <el-menu active-text-color="#88cccc" class="menu">
        <el-menu-item index="0" @click="changeNowComponentIndex(0)">
          <el-icon><User/></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="1" @click="changeNowComponentIndex(1)">
          <el-icon><MessageBox/></el-icon>
          <span>提交的任务</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Headset/></el-icon>
            <span>音乐管理</span>
          </template>
          <el-menu-item index="2-1" @click="changeNowComponentIndex(2)">
            <span>音乐单曲</span>
          </el-menu-item>
          <el-menu-item index="2-2" @click="changeNowComponentIndex(3)">
            <span>播放列表</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div style="cursor: pointer; text-align: center; width: 100%" @click="$router.push('/')">
        <span>返回主页</span>
      </div>
    </div>

    <component :is = components[nowComponentIndex] style="width: 87vw"></component>
  </div>
</template>

<style scoped>
#adminPageBody
{
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#menuBody
{
  width: 13vw;
  height: 100%;
  background-color: #f0f4f9;
}
#menuTitle
{
  margin-top: 1vh;
  display: block;
  font-weight: 550;
  font-size: 20px;
  width: 100%;
  text-align: center;
}
.menu
{
  margin-top: 1vh;
  height: 80%;
  border-right: #b6b6b6 solid 1px;
  background-color: #f0f4f9;
}
</style>
