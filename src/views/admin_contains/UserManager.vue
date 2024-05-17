<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import {API_BASE_URL} from '@/assets/constants';
import axios from 'axios';
import {CloseBold, Select} from '@element-plus/icons-vue';
import {ElNotification} from 'element-plus';

export default defineComponent({
  name: 'UserManager',
  components: {CloseBold, SelectIcon: Select},
  setup() {
    const userInfo = ref([]);
    const data = {'quantity': '0'};

    const staffFilter = [{text: '是', value: true}, {text: '否', value: false}];

    const getUserInfo = async ()=>{
      const response = await axios.get(API_BASE_URL + '/get_user_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        userInfo.value = response.data.message;
      } else alert('Get User Info fail, try again later');
    };

    onBeforeMount(()=>getUserInfo());

    const updateRow = (item)=> {
      console.log(item);
    };
    const deleteRow = async (item)=> {
      console.log(item);
      const data = {'email': item.email};
      const response =
          await axios.get(API_BASE_URL + '/delete_user_info/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        // eslint-disable-next-line new-cap
        ElNotification({
          title: 'Success',
          message: 'Delete User Successfully',
          type: 'success',
        });
        await getUserInfo();
      } else {
        // eslint-disable-next-line new-cap
        ElNotification({
          title: 'Error',
          message: 'Something Go Wrong',
          type: 'error',
        });
      }
    };

    return {
      userInfo,
      staffFilter,
      updateRow,
      deleteRow,
    };
  },
});
</script>

<template>
  <div id="userManagerBody">
    <span style="font-size: 20px; font-weight: 500;margin-top: 1vh">User Information Table (Max for 100)</span>
    <el-table :data = userInfo stripe style="width: 100%">
      <el-table-column label="UUID" prop="uuid" sortable />
      <el-table-column label="Email" prop="email" sortable />
      <el-table-column label="Username" prop="username" sortable />
      <el-table-column label="Creator" prop="is_creator">
        <template #default="creatorData">
          <el-icon>
            <SelectIcon v-if="creatorData.row.is_creator"></SelectIcon>
            <CloseBold v-if="!creatorData.row.is_creator"></CloseBold>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="Active" prop="is_active">
        <template #default="activeData">
          <el-icon>
            <SelectIcon v-if="activeData.row.is_active"></SelectIcon>
            <CloseBold v-if="!activeData.row.is_active"></CloseBold>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column label="Staff" prop="is_staff">
        <template #default="staffData">
          <el-icon>
            <SelectIcon v-if="staffData.row.is_staff"></SelectIcon>
            <CloseBold v-if="!staffData.row.is_staff"></CloseBold>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button class="updateBtn" size="small" @click="updateRow(scope.row)">Update</el-button>
          <el-button class="deleteBtn" size="small" @click="deleteRow(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.updateBtn
{
  color: black;
}
.deleteBtn
{
  color: white;
  background-color: #f3263f;
  border: inherit;
}
.deleteBtn:hover
{
  background-color: #af1c2d;
}
</style>
