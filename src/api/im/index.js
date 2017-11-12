// const wrapper = require('@/assets/strophe');
import _ from 'lodash/core'
// const Strophe = wrapper.Strophe;
// const BOSH_SERVICE = 'ws://10.68.50.54:5290/sure.im';
const BOSH_SERVICE = 'ws://localhost:5290/sure.im';


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
const receivedMessages = [];
const rosters = [
  { realname: '高总', jid: 'gaoyi@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '' },
  { realname: '施利君', jid: 'shilj@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '' },
  { realname: '王玉贵', jid: 'wangyg@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '' },
  { realname: '王金龙', jid: 'wangjl@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '' },
  { realname: '高健', jid: 'gaojian@localhost', msgto: [], msgfrom: [], lastMsg: '', notReadedMsg: 0, lastMsgTime: '' }
]
function onMessage(msg) {
  const to = msg.getAttribute('to');
  const from = msg.getAttribute('from');
  const type = msg.getAttribute('type');
  const elems = msg.getElementsByTagName('body');

  if ((type === 'chat' || type === 'groupchat') && elems.length > 0) {
    const body = elems[0];
    const msgtext = Strophe.getText(body);
    receivedMessages.push({ from, to, msgtext });
    const fromperson = _.find(rosters, o => from.startsWith(o.jid));
    fromperson.msgfrom.push({ from, to, msgtext });
    fromperson.lastMsg = msgtext.length > 10 ? msgtext.substr(0, 10) + '...' : msgtext;
    const d1 = new Date();
    fromperson.lastMsgTime = d1.getHours() + ':' + d1.getMinutes()
    fromperson.notReadedMsg++;
    info.totalNotReadMsg++;
    log('ECHOBOT: I got a message from ' + from + ': ' + msgtext);
  }
  return true;
}

const connection = new Strophe.Connection(BOSH_SERVICE);
connection.rawInput = rawInput;
connection.rawOutput = rawOutput;
function onConnect(status) {
  if (status === Strophe.Status.CONNECTING) {
    log('Strophe is connecting.');
  } else if (status === Strophe.Status.CONNFAIL) {
    log('Strophe failed to connect.');
  } else if (status === Strophe.Status.DISCONNECTING) {
    log('Strophe is disconnecting.');
  } else if (status === Strophe.Status.DISCONNECTED) {
    log('Strophe is disconnected.');
  } else if (status === Strophe.Status.CONNECTED) {
    log('Strophe is connected.');
    connection.addHandler(onMessage, null, 'message', null, null, null);
    connection.send($pres().tree());
  }
}

function connect(jid, pass) {
  connection.connect(jid, pass, onConnect);
}
function disconnect() {
  connection.disconnect();
}
function sendMsg(to, from, msgtext) {
  const reply = $msg({ to, from, type: 'chat' }).cnode(Strophe.xmlElement('body', '', msgtext));
  connection.send(reply.tree());
  log('ECHOBOT: I sent ' + to + ': ' + msgtext);
  _.find(rosters, o => o.jid === to).msgto.push({ from, to, msgtext });
}

export default {
  info,
  rosters,
  connect,
  disconnect,
  sendMsg,
  receivedMessages
}
