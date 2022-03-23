import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocumentshttp();
  }

  getDocumentshttp(): void {
    this.http
      .get<Document[]>(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[] ) => {
           this.documents = documents;
           this.maxDocumentId = this.getMaxId();
           const documentsList = this.documents.slice();
           this.documentListChangedEvent.next(documentsList);
        },
       
        (error: any) => {
           console.log(error);
        } 
      )
  }

  storeDocuments() {
    this.documents = JSON.parse(JSON.stringify(this.documents));
    this.http
      .put(
        'https://cmssantiago-2e759-default-rtdb.firebaseio.com/documents.json',
        this.documents, 
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .subscribe(response => {
        const documentsList = this.documents.slice();
        this.documentListChangedEvent.next(documentsList);
      });
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    let newId = this.maxDocumentId.toString();
    newDocument.id = newId;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

}
