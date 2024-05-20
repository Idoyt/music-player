<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import {Star} from '@element-plus/icons-vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'CommentsList',
  components: {Star},
  setup() {
    const store = useStore();
    const commentData = ref([]);
    const tempCommentData = {
      'username': 'Temp Username',
      'uuid': '1',
      'avatar_url': '',
      'date': '2024-11-28 13:14',
      'content': 'Temp Comment Content...................................',
      'likes': 23,
      'commentId': 'CMT-2001',
      'sonCommentsIdList': [
        {'commentId': 'CMT-2002', 'username': 'Temp Username1', 'content': 'QAQ', 'likes': 123},
        {'commentId': 'CMT-2002', 'username': 'Temp Username2', 'content': 'QwQ', 'likes': 123},
        {'commentId': 'CMT-2002', 'username': 'Temp Username3', 'content': 'OvO', 'likes': 123},
      ],
    };

    const navigateToUserSpace = (uuid)=>{
      store.commit('audioModule/updateNavigate', {to: 'userSpace', data: {uuid: uuid}});
    };

    onBeforeMount(()=>{
      for (let i=0; i<10; i++) commentData.value.push(tempCommentData);
    });
    return {
      commentData,
      navigateToUserSpace,
    };
  },
});
</script>

<template>
  <div id="commentBody">
    <div v-for="(data, index) in commentData" :key="index" class="commentBox">
      <el-avatar :src="data.avatar_url" style="cursor: pointer" @click="navigateToUserSpace(data.uuid)"></el-avatar>
      <div class="textArea">
        <span style="cursor: pointer" @click="navigateToUserSpace(data.uuid)">{{data.username}}</span>
        <span>{{data.date}}</span>
        <span style="color: black; margin-top: 1vh">{{data.content}}</span>
        <div style="display: flex; gap: 1vw; margin-top: 1vh">
          <div class="commentLikesBtn funcBtn">
            <el-icon><Star/></el-icon>
            <span>{{data.likes}}</span>
          </div>
          <div id="reply" class="funcBtn">回复</div>
          <div id="report" class="funcBtn">举报</div>
        </div>

        <div v-if="data.sonCommentsIdList.length !==0" style="margin-top: 2vh">
          <span class="funcBtn">查看{{data.sonCommentsIdList.length}}条回复</span>
          <div class="firstComment">
            <span style="color: #f3263f">{{data.sonCommentsIdList[0].username}}:  </span>
            <span style="color: black">{{data.sonCommentsIdList[0].content}}</span>
          </div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<style scoped>
#commentBody
{
  font-family: "Microsoft YaHei", serif;
}
.commentBox
{
  display: flex;
  margin-top: 4vh;
  color: #737373;
}
.textArea
{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1vw;
}
#report
{
  display: none;
}
.commentBox:hover > .textArea > div > #report
{
  display: block;
}
.firstComment
{
  margin-top: 1vh;
  background-color: rgba(0, 0, 0, .1);
  width: 90%;
  border-radius: 1vh;
  height: 4vh;
  display: flex;
  align-items: center;
  gap: 1vw;
}
.commentLikesBtn
{
  display: flex;
  gap: .3vw;
  align-items: center;
}
.funcBtn
{
  cursor: pointer;
}
.funcBtn:hover
{
  color: #f3263f;
  filter: sepia(1) saturate(10000%) hue-rotate(0deg);
}
</style>
