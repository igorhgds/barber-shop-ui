import { InjectionToken } from "@angular/core";
import { IClientsService } from "./api-client/clients/iclients.service";

export const SERVICES_TOKEN = {
   HTTP :{ 
      CLIENT: new InjectionToken<IClientsService>('SERVICES_TOKEN.HTTP.CLIENT'),
      //SCHEDULE: new InjectionToken<ScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
   }
}