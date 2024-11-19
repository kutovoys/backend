import * as CONTROLLERS from './controllers';

export const ROOT = '/api/v1' as const;

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
        UPDATE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.UPDATE}/${uuid}`,
        GET_ALL: `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.GET_ALL}`,
        GET_ONE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.GET_ONE}/${uuid}`,
        DISABLE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.DISABLE}/${uuid}`,
        ENABLE: (uuid: string) =>
            `${ROOT}/${CONTROLLERS.NODES_CONTROLLER}/${CONTROLLERS.NODES_ROUTES.ENABLE}/${uuid}`,
    },
} as const;
