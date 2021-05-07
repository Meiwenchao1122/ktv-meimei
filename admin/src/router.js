import Vue from 'vue'
import Router from 'vue-router'
import { LoadingBar } from 'view-design'

// 路由
import Login from "@/views/login"
import Home from "@/views/Home"
import NotFound from "@/views/404"  // 404页面
import ManageMusic from "@/views/managemusic"   // 歌曲管理
import User_Service from "@/views/user_service"  // 用户前台开机服务
import AllOrders from "@/views/allorders"  // 所有订单
import AdminLikes from "@/views/adminlikes"  // 系统推荐
import DataStatistics from "@/views/dataStatistics"  // 数据统计展示

//解决重复点击 报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



Vue.use(Router)
const vueRouter = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        { path: "/", redirect: "/admin" },
        {
            path: "/admin",
            component: Home,
            children: [
                { path: '/', redirect: "user_service" },
                { path: 'manage/music', name: "managemusic", component: ManageMusic, meta: { title: "歌曲管理" } },
                { path: 'user_service', name: "user_service", component: User_Service, meta: { title: "分配账号密码" } },
                { path: 'allorders', name: "allorders", component: AllOrders, meta: { title: "历史订单" } },
                { path: 'music/likes', name: "adminlikes", component: AdminLikes, meta: { title: "系统推荐歌曲" } },
                { path: 'dataStatistics', name: "dataStatistics", component: DataStatistics, meta: { title: "数据统计展示" } },
            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                title: "音乐后台管理"
            }
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound,
            meta: {
                title: "页面找不到"
            }
        }
    ]
})

// 导航守卫
vueRouter.beforeEach((to, from, next) => {
    LoadingBar.start();
    const adminToken = localStorage.adminToken;
    if (to.path == "/login") {
        if (adminToken) {
            next("/");
        } else {
            next();
        }
    } else {
        // next();
        if (adminToken) {
            next();
        } else {
            next("/login");
        }
    }
})

vueRouter.afterEach((to, next) => {
    LoadingBar.finish();
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "音乐后台管理系统";
    }
})




export default vueRouter