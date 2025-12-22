import { Routes } from '@angular/router';
import { EditClient } from './clients/edit-client/edit-client';
import { NewClient } from './clients/new-client/new-client';
import { ListClients } from './clients/list-clients/list-clients';
import { SchedulesMonth } from './schedules/schedules-month/schedules-month';

export const routes: Routes = [
   {path: 'clients/edit-client/:id', component: EditClient, data: {title: 'Atualizar Cliente'}},
   {path: 'clients/new-client', component: NewClient, data: {title: 'Cadastrar Clientes'}},
   {path: 'clients/list', component: ListClients, data: {title: 'Clientes Cadastrados'}},
   {path: 'schedules/month', component: SchedulesMonth, data: {title: 'Agendamentos'}},
   {path: '**' , redirectTo: 'schedules/month' }

];
