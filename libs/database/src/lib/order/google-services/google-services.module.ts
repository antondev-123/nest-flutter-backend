import { Module } from '@nestjs/common';
import { SharedConfigurationService } from '../../shared-configuration.service';
import { GoogleServicesService } from './google-services.service';

@Module({
    providers: [GoogleServicesService, SharedConfigurationService],
    exports: [GoogleServicesService]
})
export class GoogleServicesModule {}
