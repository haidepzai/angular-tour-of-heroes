import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = []; //array if strings

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = []; //array resetten
  }
}