<template>
  <div class="msger">
    <div class="msger-top">
      <div class="person-name">{{toWho.realname}}</div>
    </div>
    <div class="msger-content">
      <template v-for="(item, index) in receivedMessages" >
      <div class="msg-item"  :key="index">
        <div class="avata">
          <div>{{toWho.realname.substr(1)}}</div>
        </div>
        <div class="msgcontent">{{item.msgtext}}</div>
      </div>
       </template>
    </div>

    <div class="msger-menu">
      <li><Icon type="android-happy" title="表情"></Icon></li>
      <li><Icon type="android-folder-open" title="发送文件"></Icon></li>
      <li><Icon type="android-expand" title="截图"></Icon></li>
    </div>
    <div class="msger-input">
      <div class="textarea"><textarea name="message" id="message" v-model="message"></textarea></div>
      <div><button @click="sendMsg">发 送</button></div>




    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import _ from 'lodash/core'
import im from '@/api/im'
export default {
  name: 'Messager',
  data() {
    return {
      messages: im.receivedMessages,
      message: 'Welcome to Your Vue.js App'
    };
  },
  props: [
    'toWho'
  ],
  methods: {
    sendMsg() {
      im.sendMsg(this.toWho.jid, this.user.jid, this.message);
    }
  },
  computed: {
    ...mapGetters(['user']),
    receivedMessages() { return _.filter(this.messages, o => o.from.startsWith(this.toWho.jid)) }
  }
}
</script>
<style scoped>
.msger{
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.msger-top{
  height: 60px;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: #DBDBDB;
  border-bottom-width: 1px;

}
.msger-top .person-name{
  padding-left:40px;
  padding-top: 20px;
  font-size: 1.5em;
}
.msger-content{
  width: 100%;
  flex-grow: 1;
  border-bottom-style: solid;
  border-bottom-color: #DBDBDB;
  border-bottom-width: 1px;
  overflow-y: auto;
}
.msger-content .msg-item{
  max-width: 80%;
  padding: 10px;
  display: flex;
}
.msger-content .msg-item .avata{
  background-color: #99CCFF;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: yellow;
  font-size: 1.3em;
}
.msger-content .msg-item .avata div{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}
.msger-content .msg-item .msgcontent{
  background-color:white;
  margin-left: 10px;
  border-radius: 6px;
  padding: 5px;
  /* flex-grow: 1; */
}
.msger-menu{
  font-size: 20px;
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding-left: 40px;
  color: #808080;

}
.msger-menu li{
  display: block;
  float: left;
  width: 30px;
}
.msger-input{
  width: 100%;
  height: 140px;
  background-color: white;
  display: flex;

}

.msger-input .textarea{
  flex-grow: 1;
  height: 140px;
}
.msger-input textarea{
  border: none;
  padding: 10px;
  flex-grow: 1;
  height: 140px;
  width: 100%;
}
.msger-input button{
  border: none;
  width: 100px;
  height: 140px;
  color: #808080;
  /* background-color: white; */
  font-size: 1.2em;
}
</style>

