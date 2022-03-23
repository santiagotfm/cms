import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.getContactshttp();
  }

  getContactshttp(): void {
    this.http
      .get<Contact[]>(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[] ) => {
           this.contacts = contacts;
           this.maxContactId = this.getMaxId();
           const contactsList = this.contacts.slice();
           this.contactChangedEvent.next(contactsList);
        },
       
        (error: any) => {
           console.log(error);
        } 
      )
  }

  storeContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    this.http
      .put(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/contacts.json',
        this.contacts, 
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .subscribe(response => {
        const contactsList = this.contacts.slice();
        this.contactChangedEvent.next(contactsList);
      });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!document) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    let newId = this.maxContactId.toString();
    newContact.id = newId;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

}
