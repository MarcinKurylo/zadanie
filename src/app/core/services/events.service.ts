import { EventEmitter, Injectable } from '@angular/core';
import { AppEvent } from 'src/app/types/app-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public event$: EventEmitter<AppEvent> = new EventEmitter()

  constructor() { }

  public emit(event: AppEvent) {
    this.event$.emit(event)
  }
}
