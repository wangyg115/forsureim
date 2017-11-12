
const user = {
  state: {
    realname: '王玉贵',
    jid: 'wangyg@localhost',
    password: ''
  },

  mutations: {
    SET_NAME: (state, realname) => {
      state.realname = realname
    },
    SET_JID: (state, jid) => {
      state.jid = jid
    }
  },

  actions: {
    setRealname({ commit }, realname) {
      commit('SET_NAME', realname);
    },
    setJid({ commit }, jid) {
      commit('SET_JID', jid);
    }
  }
}

export default user
