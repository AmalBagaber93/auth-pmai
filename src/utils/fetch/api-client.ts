import ky, { BeforeRequestHook } from "ky"
import merge from "lodash/merge"
import { afterResponseInterceptor, kyConfigs } from "./config"
import Cookies from "js-cookie"


const cookieInterceptor: BeforeRequestHook = async (request) => {
    const token = Cookies.get("token");

    if (token) {
        request.headers.set("Authorization", `Bearer ${token}`);
    }
    request.headers.set('X-Locale', 'en')
request.headers.set('Accept-Language', 'en');
    request.headers.set("Accept", "application/json, text/plain, */*");
};


// export const apiClient = ky.create(merge(JSON.parse(JSON.stringify(kyConfigs)), {
//     throwHttpErrors: false,
//     hooks: {
//         beforeRequest: [cookieInterceptor],
//     }
// }))



export const apiClient = ky.create({
    ...kyConfigs,
    throwHttpErrors: false,
    hooks: {
        ...kyConfigs.hooks,
        beforeRequest: [cookieInterceptor],
    },
})