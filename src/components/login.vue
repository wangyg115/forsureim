<template>
  <div class="logincontainer">
    <div class="formdiv">
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')"  :loading="loading" style="width:100%">
        <span v-if="!loading">连 接</span>
        <span v-else>正在连接...</span>
      </Button>
    </FormItem>
  </Form>
  </div>
  </div>
</template>
<script>
import im from '@/api/im'
const log = function(msg) {
  console.log(msg);
}
export default {
  data() {
    return {
      loading: false,
      formInline: {
        user: '',
        password: ''
      },
      connect: false,
      ruleInline: {
        user: [
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
          im.connect(this.formInline.user + '@localhost', this.formInline.password, this.onConnect);
          // this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
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
        this.$router.push('/');
      } else if (status === Strophe.Status.CONNECTED) {
        this.connect = true;
        im.addHandler()
        im.send($pres().tree())
        this.$router.push('/msg');
      } else if (status === Strophe.Status.AUTHFAIL) {
        this.onFail('用户验证失败');
      } else if (status === Strophe.Status.CONNTIMEOUT) {
        this.onFail('连接超时');
      }
                // this.connect = true;
    },
    mounted() {
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
  background: url("https://images.unsplash.com/photo-1448794363755-de84d6a770bc?w=2200")
    50% 50% / cover;
}
.formdiv{
  width: 300px;
  height: 220px;
  padding: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
}
</style>
