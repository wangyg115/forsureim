<template>
  <div class="msg">
    <div class="msgmenu">
      <div class="search">
        <input type="text" placeholder="搜索">
        <input type="button" value="断开连接" @click="disConnct">
      </div>
      <div class="menuitem">
      <Menu active-name="1" width="240px" @on-select="setCR" style="overflow-y">
        <template v-for="(item, index) in rosters" >
        <MenuItem :name="index" :key="index"  class="p-item">
          <Badge :count="item.notReadedMsg" :key="index">
            <div class="p-item-pic" :key="index"><div>{{item.sortName()}}</div></div>
          </Badge>
          <div class="p-item-content" :key="index">
            <div style="display: flex">
            <div class="p-i-c-title">{{item.realname}}</div>

            <div class="p-item-msgtime" >{{item.lastMsgTime}}</div>
            </div>
            <div class="p-i-c-msg" :key="index">{{item.lastMsg}}</div>
          </div>

       </MenuItem>
        </template>
      </Menu>
      </div>
    </div>
    <div class="msgcontent">
      <msger :to-who="crPerson"></msger>
    </div>

  </div>
</template>

</script>

<script>
// import { mapGetters } from 'vuex';
import msger from '@/components/messager'
import im from '@/api/im'
export default {
  name: 'work',
  data() {
    return {
      rosters: im.rosters,
      msg: '',
      crp: 2
    };
  },
  computed: {
    // ...mapGetters(['rosters']),
    crPerson() {
      return this.rosters[this.crp];
    }
  },
  methods: {
    setCR(i) {
      this.crp = i;
      im.info.totalNotReadMsg -= this.crPerson.notReadedMsg
      this.crPerson.notReadedMsg = 0;
    },
    disConnct() {
      im.disconnect()
    }
  },
  components: { msger }
};
</script>
<style scoped>
.msg {
  width: 100%;
  height: 100%;
  display: flex;
}

.msgmenu {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right-style: solid;
  border-right-color: #dbdbdb;
  border-right-width: 1px;
}

.search {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menuitem{
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.p-item {
  padding: 5px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}

.p-item-pic {
  width: 42px;
  height: 42px;
  background: #3399ff;
  border-radius: 6px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  color: yellow;
}

.p-item-content {
  padding: 5px;
  width: 190px;
  height: 42px;
  float: left;
}

.p-i-c-title {
  width: 145px;
  color: black;
}

.p-i-c-msg {
  color: black;
  font-size: 12px;
}

.p-item-msgtime {
  padding-top: 5px;
  float: right;
  font-size: 12px;
}

.msgcontent {
  flex-grow: 1;
}

.ivu-menu-item-selected {
  background-color: #ccf;
}
::-webkit-scrollbar {
  width: 2px;
  /* height: 1px; */
}
::-webkit-scrollbar-thumb
{
  border-radius: 2px;
  background-color: #cf9;
}
</style>


</style>


