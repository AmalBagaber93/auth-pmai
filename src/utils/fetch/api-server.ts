import ky, { BeforeRequestHook } from 'ky'
import { cookies } from 'next/headers'
import { kyConfigs } from './config';

const authInterceptor: BeforeRequestHook = async (request) => {
    const token = (await cookies()).get('token')?.value

    if (token) {
        request.headers.set('Authorization', `Bearer ${token}`)
    }
    request.headers.set('Accept-Language', 'en');
    request.headers.set('X-Locale', 'en')
}

export const apiServer = ky.create({
    ...kyConfigs,
    hooks: {
        beforeRequest: [authInterceptor],
    }
})