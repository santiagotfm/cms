import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents : Document[] = [
    new Document(1, 'Doc1', 'First document', 'URL1', ' '),
    new Document(2, 'Doc2', 'Second document', 'URL2', ' '),
    new Document(3, 'Doc3', 'Third document', 'URL3', ' '),
    new Document(4, 'Doc4', 'Fourth document', 'URL4', ' ')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
