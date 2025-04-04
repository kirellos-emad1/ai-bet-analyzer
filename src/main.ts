import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from './components/navigation/Navbar.vue'
import Footer from './components/navigation/Footer.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiSolidMenu, MdArrowdropdowncircleSharp } from "oh-vue-icons/icons";
import { HiSolidTrendingUp } from "oh-vue-icons/icons";
import { BiBarChart } from "oh-vue-icons/icons";
import { IoSend } from "oh-vue-icons/icons";
import { BiFileEarmarkFill } from "oh-vue-icons/icons";
import { PrStarFill } from "oh-vue-icons/icons";
import { BiClouds } from "oh-vue-icons/icons";
import { HiCheck, HiCamera, HiSolidCalendar } from "oh-vue-icons/icons";
import { IoClose } from "oh-vue-icons/icons";













addIcons(MdArrowdropdowncircleSharp,
    HiCamera, HiCheck, HiSolidTrendingUp,
    BiBarChart, IoSend, BiFileEarmarkFill,
    PrStarFill, HiSolidCalendar, BiClouds, HiSolidMenu, IoClose);

const app = createApp(App)

app.use(router)
app.component('navbar', Navbar)
app.component('app-footer', Footer)
app.component('v-icon', OhVueIcon)
app.mount('#app')
