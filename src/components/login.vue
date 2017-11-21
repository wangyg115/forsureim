<template>
  <!-- <transition name="slide-up"> -->
  <div class="logincontainer" id="logincontainer">
    <div class="logincenter">
    <div class="apptitle">
      <img src="static/logo.png" class="applogo"></img>
      <div>内蒙联通系统集成即时通讯演示</div>

    </div>
    <div class="formdiv">
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="username">
      <Input type="text" v-model="formInline.username" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')" :loading="loading" style="width:100%">
        <span v-if="!loading">连 接</span>
        <span v-else>正在连接...</span>
      </Button>
    </FormItem>
  </Form>

  </div>
  <div class="appinfo">Powered by&nbsp; <a href="http://www.tigase.net/" target="_blank">Tigase</a>&nbsp;&nbsp;
    <a href="http://strophe.im/strophejs/" target="_blank">Strophe.js</a>&nbsp;&nbsp;
    <a href="https://cn.vuejs.org/" target="_blank">vuejs</a>&nbsp;&nbsp;
    <a href="https://www.iviewui.com/" target="_blank">iview</a>&nbsp;&nbsp;   内蒙联通系统集成软研部</div>
  </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import im from '@/api/im'
const log = function(msg) {
  console.log(msg);
}
function changeBackgound() {
  const msgdiv = document.getElementById('logincontainer');

  console.log(msgdiv)
  const bg = 'url("https://images.unsplash.com/photo-1435783099294-283725c37230?auto=format&fit=crop&w=1400&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D") 50% 50% / cover';
  msgdiv.style.backgroundImage = bg;
}
export default {
  data() {
    return {
      loading: false,
      formInline: {
        username: '',
        password: ''
      },
      connect: false,
      ruleInline: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度最少6位',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.loading = true;
      this.$refs[name].validate(valid => {
        if (valid) {
          im.connect(this.formInline.username + '@localhost', this.formInline.password, this.onConnect);
          // this.$Message.success('Success!');
        } else {
          this.$Message.error('请输入用户名和密码');
          this.loading = false;
        }
      });
    },
    onConnect(status) {
      if (status === Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
      } else if (status === Strophe.Status.CONNFAIL) {
        this.onFail('连接失败');
      } else if (status === Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.');
      } else if (status === Strophe.Status.DISCONNECTED) {
        this.onFail('连接已经断开');
        this.$store.dispatch('setUser', { realname: '', jid: '' });
        this.$router.push('/');
      } else if (status === Strophe.Status.CONNECTED) {
        this.connect = true;
        im.addHandler();
        im.send($pres().tree());
        this.$store.dispatch('setUser', im.getUser(this.formInline.username + '@localhost'))
        im.roomPresent(this.$store.state.user);
        this.$router.push('/msg');
      } else if (status === Strophe.Status.AUTHFAIL) {
        this.onFail('用户验证失败');
      } else if (status === Strophe.Status.CONNTIMEOUT) {
        this.onFail('连接超时');
      }
                // this.connect = true;
    },
    activated() {
      //changeBackgound();
      // im.onConnected = this.onConnect;
    },
    onFail(msg) {
      this.connect = false;
      this.loading = false;
      this.$Message.error(msg);
    }
  }
};
</script>


<style scoped>
.logincontainer {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1435783099294-283725c37230?auto=format&fit=crop&w=1400&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")
    /* 50% 50% / cover; */
}
.logincenter{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
}
.apptitle{
  color:white;
  height: 70px;
  font-size: 2.5em;
  display: flex;
  justify-content: center;
}
.applogo{
  width: 85px;
  height: 60px;
}
.apptitle>div{
  padding-left: 10px;
}
.formdiv{
  width: 300px;
  height: 220px;
  padding: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
}
.appinfo{
  font-size: 1em;
  color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
