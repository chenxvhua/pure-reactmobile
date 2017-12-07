/**
 * Created by chenxuhua on 2017/9/6.
 */

const routes = [
    {
        path: '/',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/LoginContainer").default)
            },"LoginContainer")
        },
    },
    {
        path: '/login',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/LoginContainer").default)
            },"LoginContainer")
        },
    },
    {
        path: '/index',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/IndexContainer").default)
            },"IndexContainer")
        }
    },
    {
        path: '/productDetail/:productId',
        getComponent(location, callback) {
            require.ensure([], function (require) {
                callback(null, require("../container/basic/ProductDetailContainer").default)
            },"ProductDetailContainer")
        }
    },
]

export default routes



