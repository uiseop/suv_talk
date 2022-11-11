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

const deleteCookie = (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export { setCookie, getCookie, deleteCookie };
