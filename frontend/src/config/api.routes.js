const BASE_URL = 'http://localhost:8000/';

export default class APIRoutes {
    static auth = {
        login: `${BASE_URL}auth/sign-in/`,
        register: `${BASE_URL}auth/sign-up/`,
        logout: `${BASE_URL}auth/logout/`,
        refresh: `${BASE_URL}auth/refresh_token/`,
        me: `${BASE_URL}users/me/`,
    }

    static todos = {
        list: `${BASE_URL}todos/`,
        create: `${BASE_URL}todos/`,
        detail: (id) => `${BASE_URL}todos/${id}/`,
        update: (id) => `${BASE_URL}todos/${id}/`,
        delete: (id) => `${BASE_URL}todos/${id}/`,
        complete: (id) => `${BASE_URL}todos/${id}/complete/`,
    }
}