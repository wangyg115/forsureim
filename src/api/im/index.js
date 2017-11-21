// const wrapper = require('@/assets/strophe');
import _ from 'lodash/core'
// const Strophe = wrapper.Strophe;
const BOSH_SERVICE = 'ws://10.68.50.54:5290/sure.im';
// const BOSH_SERVICE = 'ws://localhost:5290/sure.im';


const log = function(msg) {
  console.log(msg);
}
const rawInput = function(data) {
  log('RECV: ' + data)
}

const rawOutput = function(data) {
  log('SENT: ' + data);
}
const info = { totalNotReadMsg: 0 };
// const receivedMessages = [];
const sortName = function(index) {
  if (typeof index === 'undefined') {
    return this.realname.substr(this.realname.length - 2)
  } else if (this.jid.includes('muc')) {
    const fromjid = this.msgfrom[index].from;
    return fromjid.substr(fromjid.length - 2)
  } else {
    return this.realname.substr(this.realname.length - 2)
  }
}
const rosters = [
  { realname: '软件研发部群组', jid: 'myroom1@muc.localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'groupchat' },
  { realname: '王飞总', jid: 'wangfei@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '高毅总', jid: 'gaoyi@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  // { realname: '侯永岗总', jid: 'houyg@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  // { realname: '石晓慧总', jid: 'shixh@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  // { realname: '祁贵宝总', jid: 'qigb@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '包连开', jid: 'baolk@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '施利君', jid: 'shilj@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '王玉贵', jid: 'wangyg@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '王宇', jid: 'wangyu@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '王金龙', jid: 'wangjl@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '高健', jid: 'gaojian@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '袁乐', jid: 'yuanle@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '李祯', jid: 'lizhen@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '胡月', jid: 'huyue@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '章鑫', jid: 'zhangxin@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' },
  { realname: '李娜', jid: 'lina@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName, chatType: 'chat' }
]
const rooms = [
  { realname: '软研', jid: 'myroom1@muc.localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '', sortName }
]
let cruser = {};
function onMessage(msg) {
  const to = msg.getAttribute('to');
  const from = msg.getAttribute('from');
  const type = msg.getAttribute('type');
  const elems = msg.getElementsByTagName('body');

  if ((type === 'chat' || type === 'groupchat') && elems.length > 0) {
    if (type === 'groupchat' && from.endsWith(cruser.realname)) {
      log('ECHOBOT: I got a message from ' + from);
      return true;
    }
    const body = elems[0];
    const msgtext = Strophe.getText(body);
    // receivedMessages.push({ from, to, msgtext });
    const fromperson = _.find(rosters, o => from.startsWith(o.jid));
    fromperson.msgfrom.push({ send: false, from, to, msgtext });
    fromperson.lastMsg = msgtext.length > 10 ? msgtext.substr(0, 10) + '...' : msgtext;
    const d1 = new Date();
    fromperson.lastMsgTime = d1.getHours() + ':' + d1.getMinutes()
    fromperson.notReadedMsg++;
    info.totalNotReadMsg++;
    log('ECHOBOT: I got a message from ' + from + ': ' + msgtext);
  }
  return true;
}
function getUser(jid) {
  cruser = _.find(this.rosters, o => o.jid === jid)
  return cruser;
}
const connection = new Strophe.Connection(BOSH_SERVICE);
connection.rawInput = rawInput;
connection.rawOutput = rawOutput;
// function onConnect(status) {
//   if (status === Strophe.Status.CONNECTING) {
//     log('Strophe is connecting.');
//   } else if (status === Strophe.Status.CONNFAIL) {
//     onConnFail();
//   } else if (status === Strophe.Status.DISCONNECTING) {
//     log('Strophe is disconnecting.');
//   } else if (status === Strophe.Status.DISCONNECTED) {
//     log('Strophe is disconnected.');
//   } else if (status === Strophe.Status.CONNECTED) {
//     connection.addHandler(onMessage, null, 'message', null, null, null);
//     connection.send($pres().tree());
//     connectSuccess();
//   } else if (status === Strophe.Status.AUTHFAIL) {
//     this.onFail('用户验证失败');
//   } else if (status === Strophe.Status.CONNTIMEOUT) {
//     this.onFail('连接超时');
//   }
// }

function connect(jid, pass, onConnect) {
  // return new Promise((resolve, reject)=>{
  //   connection.connect(jid, pass, onConnect);
  // });
  connection.connect(jid, pass, onConnect);
}

function present(from, roomjid, nickname) {
  connection.send($pres({
    from,
    to: roomjid + '/' + nickname }).c('x', { xmlns: 'http://jabber.org/protocol/muc' }).tree());
}

function roomPresent(user) {
  _.each(this.rooms, r => present(user.jid, r.jid, user.realname))
  // for (room in this.rooms) {
  //   console.info(room)
  //   present(user.jid, room.jid, user.realname);
  // }
}

function disconnect() {
  connection.disconnect();
}
function sendMsg(to, from, msgtext, type) {
  const reply = $msg({ to, from, type }).cnode(Strophe.xmlElement('body', '', msgtext));
  connection.send(reply.tree());
  log('ECHOBOT: I sent ' + to + ': ' + msgtext);
  _.find(rosters, o => o.jid === to).msgfrom.push({ send: true, from, to, msgtext });
}


export default {
  addHandler(handler, type) {
    if (!handler) {
      connection.addHandler(onMessage, null, 'message', null, null, null);
    } else {
      connection.addHandler(handler, null, type, null, null, null);
    }
  },
  send(msg) {
    connection.send(msg);
  },
  info,
  rosters,
  rooms,
  connect,
  disconnect,
  sendMsg,
  getUser,
  roomPresent
  //  receivedMessages
}
