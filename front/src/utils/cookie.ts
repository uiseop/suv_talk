import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

const setCookie = (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
) => {
    return cookies.set(name, value, { ...options });
};

const getCookie = (name: string) => {
    return cookies.get(name);
};

export { setCookie, getCookie };
