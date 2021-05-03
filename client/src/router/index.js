import {createRouter,createWebHistory} from 'vue-router';
import Home from '../components/Home.vue';
import FilteredNewPage from '../components/Query/FilteredNewPage.vue';
import NotFoundPage from '../components/NotFoundPage.vue'

const routes=[
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/query",
        name:"FilteredNewPage",
        component:FilteredNewPage
    },
    {
        path:"/:pathMatch(.*)*",
        component:NotFoundPage
    }

]

const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router