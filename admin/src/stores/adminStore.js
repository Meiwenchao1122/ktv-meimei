const state = {
    // 电子验证是否通过
    isAdminAuthorization:false,
    // 管理员信息
    adminInfo:[]
};
const getters = {
    isAdminAuthorization:state => state.isAdminAuthorization,
    adminInfo:state => state.adminInfo,
};
const mutations = {
    isAdminAuthorization:(state, authorization) => {
        state.isAdminAuthorization = authorization;
    },
    setAdminInfo:(state, info) => {
        state.adminInfo = info;
    }
};
const actions = {
    isAdminAuthorization:({commit}, authorization) => {
        commit("isAdminAuthorization", authorization);
    },
    setAdminInfo:({commit}, info) => {
        commit("setAdminInfo", info);
    },
    clearAdminAuthorization:({commit}) => {
        localStorage.removeItem("adminToken");
        commit("isAdminAuthorization", false);
    }
};

const adminStore = {
    state,
    getters,
    mutations,
    actions
}

export default adminStore;