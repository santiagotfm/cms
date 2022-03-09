import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '1';
  @ViewChild('subject', { static: false }) subjectRef: ElementRef;
  @ViewChild('message', { static: false }) messageRef: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const message = this.messageRef.nativeElement.value;
    const newMessage = new Message('1', subject, message, this.currentSender);
    this.messageService.addMessage(newMessage);
    console.log(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = ' ';
    this.messageRef.nativeElement.value = ' ';
  }

}
