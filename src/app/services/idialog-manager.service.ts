import { ComponentType } from "@angular/cdk/overlay";
import { YesNoDialog } from "../commons/components/yes-no-dialog/yes-no-dialog";
import { Observable } from "rxjs";

export interface IDialogManagerService {

   showYesNoDialog(component: ComponentType<YesNoDialog>, data: { title: string, content: string }): Observable<any>;
}