<template>
  <div id="app">
    <div class="left">
      <div class="avata">

        <img src="static/3.png" class="ava-photo"></img>

      </div>
      <div class="icon-item">
        <Badge :count="iminfo.totalNotReadMsg">
          <router-link to="/msg" title="消息">
            <Icon type="chatbox-working" size="26"></Icon>
          </router-link>
        </Badge>
      </div>
      <div class="icon-item">
        <router-link to="/roster" title="联系人">
          <Icon type="person" size="26"></Icon>
        </router-link>
      </div>
      <div class="icon-item">
        <router-link to="/work" title="工作">
          <Icon type="ios-keypad" size="26"></Icon>
        </router-link>
      </div>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import im from '@/api/im';
export default {
  name: 'app',
  data() {
    return {
      iminfo: im.info
    };
  }
};
</script>
<style scoped>
#app {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  width: 70px;
  height: 100%;
  background-color: #495060;
}

.left a {
  color: #dbdbdb;
}

.left a.router-link-active {
  color: #18cf6b;
}

.avata {
  width: 70px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-item {
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center {
  flex-grow: 1;
  height: 100%;
  background-color: whitesmoke;
}

.ava-photo {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>

