import { AfterResponseHook, BeforeErrorHook, Options } from "ky";

export const afterResponseInterceptor: AfterResponseHook = async (_input: Request, _options: any, response: Response) => {
    if (response.ok) return;

  const body = await response.clone().json();

       if (
            response.status !== 200 &&
            response.status !== 201 &&
            response.status !== 204 &&
            response.status !== 403
          ) {
            throw new Error(JSON.stringify(body));
          }
}

const beforeErrorInterceptor: BeforeErrorHook = async (error) => {
    const { response } = error;
    
    if (response) {
        const body = await response.clone().json();
        error.message = JSON.stringify({ status: response.status, ...body });
    }
    
    return error;
};

export const kyConfigs: Options = {
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
    },
    hooks: {
        afterResponse: [afterResponseInterceptor],
        beforeError: [beforeErrorInterceptor],

    },
}
