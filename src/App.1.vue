<template>
  <div id="app">
    <div class="header">
      <div class="logo">ForSURE</div>
      <div class="topmunu"></div>
      <div class="avata">AVATA</div>
    </div>
    <div class="content">
      <div class="left">
        <Menu active-name="1" theme="primary" width="70px">
          <MenuItem name="1">
            <Tooltip content="消息" placement="right">
              <router-link to="/msg"><Icon type="chatbox-working" size="24"></Icon></router-link>
            </Tooltip>
          </MenuItem>
          <MenuItem name="2">
            <Tooltip content="联系人" placement="right">
              <Icon type="person" size="24"></Icon>
            </Tooltip>
          </MenuItem>
          <MenuItem name="3">
            <Tooltip content="工作" placement="right">
               <router-link to="/work"><Icon type="ios-keypad" size="24"></Icon></router-link>
            </Tooltip>
          </MenuItem>
        </Menu>
      </div>
      <div class="center">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
