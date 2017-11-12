const msger = {
  state: {
    rosters: [
      { realname: '王玉贵', jid: 'wangyg@localhost' },
      { realname: '王玉贵1', jid: 'wyg@localhost' },
      { realname: 'admin', jid: 'admin@localhost' }
    ],
    crtRoster: 0,
    visitedViews: []
  },
  mutations: {
    ADD_ROSTER: (state, rs) => {
      state.rosters.push(rs);
    },
    SET_CRTROST: (state, i) => {
      state.crtRoster = i;
    }
  },
  actions: {
    addRouster({ commit }, rs) {
      commit('ADD_ROSTER', rs);
    },
    setCrtRouster({ commit }, i) {
      commit('SET_CRTROST', i);
    }
  }
}
export default msger;
