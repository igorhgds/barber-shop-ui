import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../schedule.models';
import { SaveScheduleRequest } from '../../services/api-client/schedules/schedule.models';
import { ScheduleCalendar } from '../components/schedule-calendar/schedule-calendar';
import { SchedulesService } from '../../services/api-client/schedules/schedules';
import { Clients } from '../../services/api-client/clients/clients';
import { SnackbarManager } from '../../services/snackbar-manager';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { ISchedulesService } from '../../services/api-client/schedules/ischedules.service';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendar],
  templateUrl: './schedules-month.html',
  styleUrl: './schedules-month.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: Clients },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManager }
  ]
})
export class SchedulesMonth implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  private selectedDate?: Date

  monthSchedule!: ScheduleAppointmentMonthModel
  clients: SelectClientModel[] = []

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: ISchedulesService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly clientHttpService: IClientsService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManage: ISnackbarManagerService
  ) { }

  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(this.clientHttpService.list().subscribe(data => this.clients = data))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onDateChange(date: Date) {
    this.selectedDate = date
    this.fetchSchedules(date)
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe())
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleRequest = { startAt: schedule.startAt, endAt: schedule.endAt, clientId: schedule.clientId }
      this.subscriptions.push(this.httpService.save(request).subscribe(() => {
        this.snackbarManage.show('Agendamento realizado com sucesso')
        if (this.selectedDate) {
          this.fetchSchedules(this.selectedDate)
        }
      }))
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(this.httpService.listInMonth(year, month).subscribe(data => this.monthSchedule = data));
  }
}
