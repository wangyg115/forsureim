<template>
  <div class="msg">
    <div class="msgmenu">
      <div class="search">
        <input type="text" placeholder="搜索">
      </div>
      <Menu active-name="1-2" width="200px" :open-names="['1']" @on-select="onSelect">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
           软件研发部
          </template>
          <MenuItem name="1-1">人员 1</MenuItem>
          <MenuItem name="1-2">人员 2</MenuItem>
          <MenuItem name="1-3">人员 3</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            客户服务部
          </template>
          <MenuItem name="2-1">人员 1</MenuItem>
          <MenuItem name="2-2">人员 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
           其他部门
          </template>
          <MenuItem name="3-1">人员 1</MenuItem>
          <MenuItem name="3-2">人员 2</MenuItem>
        </Submenu>
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
  },
  methods: {
    onSelect(name) {
      console.log(name);
    }
  }
}
</script>
<style scoped>
.msg {
  width: 100%;
  height: 100%;
}

.msgmenu {
  width: 200px;
  height: 100%;
  background-color: white;
  border-right-style: solid;
  border-right-color: #DBDBDB;
  border-right-width: 1px;
}
.search{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.msgcontent {
  flex-grow: 1;
}
.ivu-menu-item-selected{
  background-color: #ccf;
}
</style>


</style>


