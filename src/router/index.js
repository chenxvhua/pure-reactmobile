/**
 * Created by chenxuhua on 2017/9/6.
 */
import {
    LoginContainer,
    IndexContainer,
    ProductDetailContainer,
} from "./InitContainer"



const routes = [
    {
        path: '/',
        component: LoginContainer,

    },
    {
        path: '/login',
        component: LoginContainer,
    },
    {
        path: '/index',
        component: IndexContainer,
    },
    {
        path: '/productDetail/:productId',
        component: ProductDetailContainer,
    },
]

export default routes



