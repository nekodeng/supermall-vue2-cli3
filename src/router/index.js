import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'supermall'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: 'supermall-category'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: 'supermall-cart'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: 'supermall-profile'
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      title: 'supermall-detail'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 定义导航路由
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
