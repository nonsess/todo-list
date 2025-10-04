const BASE_URL = 'http://localhost:8000/';

export default class APIRoutes {
    static auth = {
        login: `${BASE_URL}auth/login/`,
        register: `${BASE_URL}auth/register/`,
        logout: `${BASE_URL}auth/logout/`,
        refresh: `${BASE_URL}auth/refresh/`,
        me: `${BASE_URL}auth/me/`,
    };

    static todos = {
        list: `${BASE_URL}todos/`,
        create: `${BASE_URL}todos/`,
        detail: (id) => `${BASE_URL}todos/${id}/`,
        update: (id) => `${BASE_URL}todos/${id}/`,
        delete: (id) => `${BASE_URL}todos/${id}/`,
        complete: (id) => `${BASE_URL}todos/${id}/complete/`,
    };

    static users = {
        list: `${BASE_URL}users/`,
        profile: (id) => `${BASE_URL}users/${id}/`,
        updateProfile: (id) => `${BASE_URL}users/${id}/`,
    };
}