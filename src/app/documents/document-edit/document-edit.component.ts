import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  originalDocument: Document;
  document: Document;
  editMode = false;
  id: string;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id === null) {
          this.editMode = false
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);

        if (this.originalDocument === null) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(value.id, value.name, value.description, value.url);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigateByUrl('/documents');
  }

  onCancel() {
    this.router.navigateByUrl('/documents');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

