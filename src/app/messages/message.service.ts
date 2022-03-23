import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) { 
    this.getMessageshttp();
  }

  getMessageshttp(): void {
    this.http
      .get<Message[]>(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[] ) => {
           this.messages = messages;
           this.maxMessageId = this.getMaxId();
           const messagesList = this.messages.slice();
           this.messageChangedEvent.next(messagesList);
        },
       
        (error: any) => {
           console.log(error);
        } 
      )
  }

  storeMessages() {
    this.messages = JSON.parse(JSON.stringify(this.messages));
    this.http
      .put(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/messages.json',
        this.messages, 
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .subscribe(response => {
        const messagesList = this.messages.slice();
        this.messageChangedEvent.next(messagesList);
      });
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }
}
