// const wrapper = require('@/assets/strophe');
define(['@/assets/strophe'], wrapper => {
  const Strophe = wrapper.Strophe;
  const BOSH_SERVICE = 'http://localhost:5280/http-bind';


  const log = function(msg) {
    console.log(msg);
  }
  const rawInput = function(data) {
    log('RECV: ' + data);
  }

  const rawOutput = function(data) {
    log('SENT: ' + data);
  }


  function onMessage(msg) {
    // const to = msg.getAttribute('to');
    const from = msg.getAttribute('from');
    const type = msg.getAttribute('type');
    const elems = msg.getElementsByTagName('body');

    if ((type === 'chat' || type === 'groupchat') && elems.length > 0) {
      const body = elems[0];
      log('ECHOBOT: I got a message from ' + from + ': ' +
      Strophe.getText(body));
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
  return {
    connect,
    disconnect
  }
});

// export default



