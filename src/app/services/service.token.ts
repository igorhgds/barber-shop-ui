import { InjectionToken } from "@angular/core";
import { IClientsService } from "./api-client/clients/iclients.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";
import { ISchedulesService } from "./api-client/schedules/ischedules.service";

export const SERVICES_TOKEN = {
   HTTP :{ 
      CLIENT: new InjectionToken<IClientsService>('SERVICES_TOKEN.HTTP.CLIENT'),
      SCHEDULE: new InjectionToken<ISchedulesService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
   },
   SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),
   YES_NO_DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.YES_NO_DIALOG')
}