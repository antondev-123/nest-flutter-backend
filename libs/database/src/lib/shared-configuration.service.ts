import { Injectable } from "@nestjs/common";
import * as fs from 'fs';

@Injectable()
export class SharedConfigurationService {
    constructor() {}

    async getConfiguration(): Promise<ICurrentConfiguration | null> {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV}.json`;
        if (fs.existsSync(configAddress)) {
            const file = await fs.promises.readFile(configAddress, { encoding: 'utf-8' });
            const config: ICurrentConfiguration = JSON.parse(file as string);
            const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
            if (
                config.firebaseProjectPrivateKey != null &&
                fs.existsSync(firebaseKeyFileAddress)
            ) {
                return {
                    adminPanelAPIKey: config.adminPanelAPIKey,
                    backendMapsAPIKey: config.backendMapsAPIKey,
                    purchaseCode: 'RESTRICTED',
                    firebaseProjectPrivateKey: 'RESTRICTED'
                };
            }
            return config;
        } else {
            return {};
        }
    }
}

interface ICurrentConfiguration {
    purchaseCode?: string;
    backendMapsAPIKey?: string;
    adminPanelAPIKey?: string;
    firebaseProjectPrivateKey?: string;
}