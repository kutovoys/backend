import { NodesEntity } from '../entities/nodes.entity';

export class GetOneNodeResponseModel {
    public uuid: string;
    public name: string;
    public address: string;
    public port: null | number;
    public isConnected: boolean;
    public isConnecting: boolean;
    public isDisabled: boolean;
    public isNodeOnline: boolean;
    public isXrayRunning: boolean;
    public lastStatusChange: Date | null;
    public lastStatusMessage: null | string;
    public xrayVersion: null | string;
    public isTrafficTrackingActive: boolean;
    public trafficResetDay: null | number;
    public usersOnline: null | number;
    public cpuCount: null | number;
    public cpuModel: null | string;
    public totalRam: null | string;

    public trafficLimitBytes: null | number;
    public trafficUsedBytes: null | number;
    public notifyPercent: null | number;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(data: NodesEntity) {
        this.uuid = data.uuid;
        this.name = data.name;
        this.address = data.address;
        this.port = data.port;
        this.isConnected = data.isConnected;
        this.isConnecting = data.isConnecting;
        this.isDisabled = data.isDisabled;
        this.isNodeOnline = data.isNodeOnline;
        this.isXrayRunning = data.isXrayRunning;
        this.lastStatusChange = data.lastStatusChange;
        this.lastStatusMessage = data.lastStatusMessage;
        this.xrayVersion = data.xrayVersion;
        this.isTrafficTrackingActive = data.isTrafficTrackingActive;
        this.trafficResetDay = data.trafficResetDay;
        this.trafficLimitBytes = Number(data.trafficLimitBytes);
        this.trafficUsedBytes = Number(data.trafficUsedBytes);
        this.notifyPercent = data.notifyPercent;
        this.usersOnline = data.usersOnline;
        this.cpuCount = data.cpuCount;
        this.cpuModel = data.cpuModel;
        this.totalRam = data.totalRam;

        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
