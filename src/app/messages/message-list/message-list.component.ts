import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  messages: Message[] = [
    new Message(1, 'Hello', 'I just wanted to say hi.', 'Juan'),
    new Message(2, 'Hi', 'I just wanted to say hello.', 'Pedro'),
    new Message(3, 'Good morning', 'How are you doing today?', 'Mateo'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
