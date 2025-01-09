import { dump as yamlDump } from 'js-yaml';
import { readFileSync } from 'node:fs';
import nunjucks from 'nunjucks';
import path from 'node:path';

import { isDevelopment } from '@common/utils/startup-app';

import { FormattedHosts } from '../interfaces/formatted-hosts.interface';

const env = nunjucks.configure({ autoescape: false });
env.addFilter('yaml', (obj: any) => yamlDump(obj));
env.addFilter('indent', (str: string, width: number) => {
    return str
        .split('\n')
        .map((line) => ' '.repeat(width) + line)
        .join('\n');
});

const CLASH_TEMPLATE_PATH = isDevelopment()
    ? path.join(__dirname, '../../../../../../configs/clash/clash_template.yml')
    : path.join('/var/lib/remnawave/configs/clash/clash_template.yml');

const STASH_TEMPLATE_PATH = isDevelopment()
    ? path.join(__dirname, '../../../../../../configs/stash/stash_template.yml')
    : path.join('/var/lib/remnawave/configs/stash/stash_template.yml');

export interface ClashData {
    proxies: ProxyNode[];
    'proxy-groups': any[];
    rules: string[];
}

interface NetworkConfig {
    'early-data-header-name'?: string;
    'grpc-service-name'?: string;
    headers?: Record<string, string>;
    Host?: string;
    host?: string[];
    'max-early-data'?: number;
    path?: string | string[];
    smux?: {
        [key: string]: any;
        enabled: boolean;
    };
    'v2ray-http-upgrade'?: boolean;
    'v2ray-http-upgrade-fast-open'?: boolean;
}

interface ProxyNode {
    [key: string]: any;
    alpn?: string[];
    alterId?: number;
    cipher?: string;
    name: string;
    network: string;
    password?: string;
    port: number;
    server: string;
    servername?: string;
    'skip-cert-verify'?: boolean;
    sni?: string;
    tls?: boolean;
    type: string;
    udp: boolean;
    uuid?: string;
}

export class ClashMetaConfiguration {
    protected data: ClashData;
    protected proxyRemarks: string[];
    protected muxTemplate: string;
    protected userAgentList: string[];
    protected settings: any = {};
    protected isStash: boolean;
    private hosts: FormattedHosts[];

    constructor(hosts: FormattedHosts[], isStash = false) {
        this.hosts = hosts;
        this.data = {
            proxies: [],
            'proxy-groups': [],
            rules: [],
        };
        this.proxyRemarks = [];
        this.muxTemplate = '';
        this.userAgentList = [];
        this.isStash = isStash;
    }

    public render(): string {
        const context = {
            proxies: this.data.proxies,
            proxy_remarks: this.proxyRemarks,
        };

        return env.renderString(
            readFileSync(this.isStash ? STASH_TEMPLATE_PATH : CLASH_TEMPLATE_PATH, 'utf8'),
            context,
        );
    }

    private generate(): string {
        for (const host of this.hosts) {
            if (!host) {
                continue;
            }

            this.add(host);
        }

        return this.render();
    }

    public static generateConfig(hosts: FormattedHosts[], isStash = false): string {
        try {
            return new ClashMetaConfiguration(hosts, isStash).generate();
        } catch {
            return '';
        }
    }

    public toString(): string {
        return this.render();
    }

    protected httpConfig(path = '', host = '', randomUserAgent = false): NetworkConfig {
        const config: NetworkConfig = {
            ...(this.settings['http-opts'] || { headers: {} }),
        };

        if (path) {
            config.path = [path];
        }
        if (host) {
            config.Host = host;
        }
        if (randomUserAgent) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['User-Agent'] =
                this.userAgentList[Math.floor(Math.random() * this.userAgentList.length)];
        }

        return config;
    }

    protected wsConfig(
        path = '',
        host = '',
        maxEarlyData?: number,
        earlyDataHeaderName = '',
        isHttpupgrade = false,
        randomUserAgent = false,
    ): NetworkConfig {
        const config: NetworkConfig = {
            ...(this.settings['ws-opts'] || {}),
        };

        if (!config.headers && (host || randomUserAgent)) {
            config.headers = {};
        }

        if (path) {
            config.path = path;
        }
        if (host && config.headers) {
            config.headers.Host = host;
        }
        if (randomUserAgent && config.headers) {
            config.headers['User-Agent'] =
                this.userAgentList[Math.floor(Math.random() * this.userAgentList.length)];
        }
        if (maxEarlyData) {
            config['max-early-data'] = maxEarlyData;
            config['early-data-header-name'] = earlyDataHeaderName;
        }
        if (isHttpupgrade) {
            config['v2ray-http-upgrade'] = true;
            if (maxEarlyData) {
                config['v2ray-http-upgrade-fast-open'] = true;
            }
        }

        return config;
    }

    protected grpcConfig(path = ''): NetworkConfig {
        const config: NetworkConfig = {
            ...(this.settings['grpc-opts'] || {}),
        };

        if (path) {
            config['grpc-service-name'] = path;
        }

        return config;
    }

    protected h2Config(path = '', host = ''): NetworkConfig {
        const config: NetworkConfig = {
            ...(this.settings['h2-opts'] || {}),
        };

        if (path) {
            config.path = path;
        }
        if (host) {
            config.host = [host];
        }

        return config;
    }

    protected tcpConfig(path = '', host = ''): NetworkConfig {
        const config: NetworkConfig = {
            ...(this.settings['tcp-opts'] || {}),
        };

        if (path) {
            config.path = [path];
        }
        if (host) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Host = host;
        }

        return config;
    }

    protected makeNode(params: {
        ais?: boolean;
        alpn?: string;
        fp?: string;
        headers?: string;
        host: string;
        muxEnable?: boolean;
        name: string;
        network: string;
        path: string;
        pbk?: string;
        port: number;
        randomUserAgent?: boolean;
        remark: string;
        server: string;
        sid?: string;
        sni: string;
        tls: boolean;
        type: string;
        udp?: boolean;
    }): ProxyNode {
        const {
            remark,
            server,
            port,
            tls,
            sni,
            host,
            headers = '',
            udp = true,
            alpn = '',
            ais = false,
            muxEnable = false,
            randomUserAgent = false,
        } = params;

        let { type, network, path } = params;

        // if (network === 'grpc' || network === 'gun') {
        //     path = getGrpcGun(path);
        // }

        if (type === 'shadowsocks') {
            type = 'ss';
        }
        if ((network === 'tcp' || network === 'raw') && headers === 'http') {
            network = 'http';
        }

        let isHttpupgrade = false;
        if (network === 'httpupgrade') {
            network = 'ws';
            isHttpupgrade = true;
        }

        const node: ProxyNode = {
            name: remark,
            type,
            server,
            port,
            network,
            udp,
        };

        let maxEarlyData: number | undefined;
        let earlyDataHeaderName = '';

        if (path.includes('?ed=')) {
            const [pathPart, edPart] = path.split('?ed=');
            path = pathPart;
            maxEarlyData = parseInt(edPart.split('/')[0]);
            earlyDataHeaderName = 'Sec-WebSocket-Protocol';
        }

        if (tls) {
            node.tls = true;
            if (type === 'trojan') {
                node.sni = sni;
            } else {
                node.servername = sni;
            }
            if (alpn) {
                node.alpn = alpn.split(',');
            }
            if (ais) {
                node['skip-cert-verify'] = ais;
            }
        }

        let netOpts: NetworkConfig = {};

        switch (network) {
            case 'http':
                netOpts = this.httpConfig(path, host, randomUserAgent);
                break;
            case 'ws':
                netOpts = this.wsConfig(
                    path,
                    host,
                    maxEarlyData,
                    earlyDataHeaderName,
                    isHttpupgrade,
                    randomUserAgent,
                );
                break;
            case 'grpc':
            case 'gun':
                netOpts = this.grpcConfig(path);
                break;
            case 'h2':
                netOpts = this.h2Config(path, host);
                break;
            case 'tcp':
            case 'raw':
                netOpts = this.tcpConfig(path, host);
                break;
        }

        if (Object.keys(netOpts).length > 0) {
            node[`${network}-opts`] = netOpts;
        }

        if (muxEnable) {
            const muxJson = JSON.parse(this.muxTemplate);
            const muxConfig = muxJson.clash;
            netOpts.smux = {
                ...muxConfig,
                enabled: true,
            };
        }

        if (params.fp) {
            node['client-fingerprint'] = params.fp;
        }
        if (params.pbk) {
            node['reality-opts'] = {
                'public-key': params.pbk,
                'short-id': params.sid,
            };
        }

        return node;
    }

    public add(host: FormattedHosts): void {
        if (['kcp', 'splithttp'].includes(host.network || '') || host.network === 'quic') {
            return;
        }

        const proxyRemark = host.remark;

        const node = this.makeNode({
            name: host.remark,
            remark: proxyRemark,
            type: host.protocol,
            server: host.address,
            port: host.port,
            network: host.network || 'tcp',
            tls: ['reality', 'tls'].includes(host.tls),
            sni: host.sni,
            host: host.host[0],
            path: host.path,
            headers: '',
            udp: true,
            alpn: host.alpn,
            fp: host.fp,
            pbk: host.pbk,
            sid: host.sid,
            ais: host.ais,
            muxEnable: false,
            randomUserAgent: false,
        });

        switch (host.protocol) {
            case 'vless':
                node.uuid = host.password.vlessPassword;
                node.flow = 'xtls-rprx-vision';
                // !TODO add flow

                // if (
                //     ['tcp', 'raw', 'kcp'].includes(host.network) &&
                //     host.headerType !== 'http' &&
                //     inbound.tls !== 'none'
                // ) {
                //     node.flow = settings.flow || '';
                // }
                break;
            case 'trojan':
                node.password = host.password.trojanPassword;
                break;
            case 'shadowsocks':
                node.password = host.password.ssPassword;
                node.cipher = 'chacha20-ietf-poly1305';
                break;
            default:
                return;
        }

        this.data.proxies.push(node);
        this.proxyRemarks.push(proxyRemark);
    }
}
