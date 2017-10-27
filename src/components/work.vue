<template>
  <div class="msg">
    <div class="msgmenu">
      <div class="search">
        <input type="text" placeholder="搜索">
      </div>
      <Menu active-name="1-2" width="240px" :open-names="['1']">
        <MenuItem name="1-1" class="p-item">
        <router-link to="/work/msger">
          <div class="p-item-pic"></div>
          <div class="p-item-content">
            <div class="p-i-c-title">王玉贵</div>
            <div class="p-i-c-msg">有消息dfasfdfd</div>
          </div>
          <div class="p-item-msgtime">10-10</div>
        </router-link>
        </MenuItem>
        <MenuItem name="1-2"  class="p-item">
        <div class="p-item-pic"></div>
        <div class="p-item-content">
          <div class="p-i-c-title">王金龙</div>
          <div class="p-i-c-msg">地方撒地方</div>
        </div>
        <div class="p-item-msgtime">10-10</div>
        </MenuItem>
      </Menu>
    </div>
    <div class="msgcontent">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
export default {
  name: 'work',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
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
  background-color: white;
  border-right-style: solid;
  border-right-color: #DBDBDB;
  border-right-width: 1px;
}

.search {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.p-item-content {
  padding: 5px;
  width: 130px;
  height: 42px;
  float: left;
}

.p-i-c-title {
  color: black;
}

.p-i-c-msg {
  color: black;
  font-size: 12px;
}

.p-item-msgtime {
  padding-top: 5px;
  width: 40px;
  height: 42px;
  float: right;
  font-size: 12px;
}

.msgcontent {
  flex-grow: 1;
}

.ivu-menu-item-selected {
  background-color: #DBDBDB;
}
</style>


</style>


