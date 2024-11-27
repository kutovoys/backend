import * as CONTROLLERS from './controllers';

export const ROOT = '/api' as const;

export const REST_API = {
    AUTH: {
        LOGIN: `${ROOT}/${CONTROLLERS.AUTH_CONTROLLER}/${CONTROLLERS.AUTH_ROUTES.LOGIN}`,
    },
    API_TOKENS: {
        CREATE: `${ROOT}/${CONTROLLERS.API_TOKENS_CONTROLLER}/${CONTROLLERS.API_TOKENS_ROUTES.CREATE}`,
        DELETE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.API_TOKENS_CONTROLLER}/${CONTROLLERS.API_TOKENS_ROUTES.DELETE}/${uuid}`,
        GET_ALL: `${ROOT}/${CONTROLLERS.API_TOKENS_CONTROLLER}/${CONTROLLERS.API_TOKENS_ROUTES.GET_ALL}`,
    },
    KEYGEN: {
        GET: `${ROOT}/${CONTROLLERS.KEYGEN_CONTROLLER}/${CONTROLLERS.KEYGEN_ROUTES.GET}`,
    },
    NODES: {
        CREATE: `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.CREATE}`,
        DELETE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.DELETE}/${uuid}`,
        UPDATE: `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.UPDATE}`,
        GET_ALL: `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.GET_ALL}`,
        RESTART: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.RESTART}/${uuid}`,
        GET_ONE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.GET_ONE}/${uuid}`,
        DISABLE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.DISABLE}/${uuid}`,
        ENABLE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.ENABLE}/${uuid}`,
        RESTART_ALL: `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.RESTART_ALL}`,
    },
    XRAY: {
        GET_CONFIG: `${ROOT}/${CONTROLLERS.XRAY_CONTROLLER}/${CONTROLLERS.XRAY_ROUTES.GET_CONFIG}`,
        UPDATE_CONFIG: `${ROOT}/${CONTROLLERS.XRAY_CONTROLLER}/${CONTROLLERS.XRAY_ROUTES.UPDATE_CONFIG}`,
    },
    INBOUNDS: {
        GET_INBOUNDS: `${ROOT}/${CONTROLLERS.INBOUNDS_CONTROLLER}/${CONTROLLERS.INBOUNDS_ROUTES.GET_INBOUNDS}`,
    },
    USERS: {
        CREATE: `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.CREATE}`,
        GET_BY_UUID: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.GET_BY_UUID}${uuid}`,
        GET_BY_SHORT_UUID: (shortUuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.GET_BY_SHORT_UUID}/${shortUuid}`,
        GET_BY_SUBSCRIPTION_UUID: (subscriptionUuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.GET_BY_SUBSCRIPTION_UUID}/${subscriptionUuid}`,
        GET_ALL: `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.GET_ALL}`,
        REVOKE_SUBSCRIPTION: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.REVOKE_SUBSCRIPTION}/${uuid}`,
        DISABLE_USER: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.DISABLE_USER}/${uuid}`,
        ENABLE_USER: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.ENABLE_USER}/${uuid}`,
        DELETE_USER: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.DELETE_USER}/${uuid}`,
        UPDATE: `${ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.UPDATE}`,
    },
    SUBSCRIPTION: {
        GET: (shortUuid: string) =>
            `${ROOT}/${CONTROLLERS.SUBSCRIPTION_CONTROLLER}/${CONTROLLERS.SUBSCRIPTION_ROUTES.GET}/${shortUuid}`,
        GET_INFO: (shortUuid: string) =>
            `${ROOT}/${CONTROLLERS.SUBSCRIPTION_CONTROLLER}/${shortUuid}${CONTROLLERS.SUBSCRIPTION_ROUTES.GET_INFO}`,
    },
    HOSTS: {
        CREATE: `${ROOT}/${CONTROLLERS.HOSTS_CONTROLLER}/${CONTROLLERS.HOSTS_ROUTES.CREATE}`,
        GET_ALL: `${ROOT}/${CONTROLLERS.HOSTS_CONTROLLER}/${CONTROLLERS.HOSTS_ROUTES.GET_ALL}`,
        UPDATE: `${ROOT}/${CONTROLLERS.HOSTS_CONTROLLER}/${CONTROLLERS.HOSTS_ROUTES.UPDATE}`,
        UPDATE_MANY: `${ROOT}/${CONTROLLERS.HOSTS_CONTROLLER}/${CONTROLLERS.HOSTS_ROUTES.UPDATE_MANY}`,
        DELETE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.HOSTS_CONTROLLER}/${CONTROLLERS.HOSTS_ROUTES.DELETE}/${uuid}`,
    },
    SYSTEM: {
        STATS: `${ROOT}/${CONTROLLERS.SYSTEM_CONTROLLER}/${CONTROLLERS.SYSTEM_ROUTES.STATS}`,
    },
} as const;
