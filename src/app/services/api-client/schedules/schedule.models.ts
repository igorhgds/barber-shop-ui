export interface ScheduleAppointmentMonthResponse {
   year: number;
   month: number;
   scheduledAppointments: ClientScheduleAppointmentResponse[];
}

export interface ClientScheduleAppointmentResponse{
   id: number;
   day: number;
   startAt: Date;
   endAt: Date;
   clientId: number;
   clientName: string;
}

export interface SaveScheduleResponse{
   id: number;
   clientId: number;
   startAt: Date;
   endAt: Date;
}

export interface SaveScheduleRequest{
   clientId: number;
   startAt: Date;
   endAt: Date;
}