import { Component, OnInit } from '@angular/core';
import { DocumentModel } from 'app/models/DocumentModel';
import { DmsService } from 'app/service/dms.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent implements OnInit {

  mappingId : String;
  docs: DocumentModel[];
  constructor(private dmsService: DmsService) { }

  ngOnInit(): void {
    console.log("in NgOninit");
    this.mappingId = this.dmsService.mappingId;
    this.dmsService.getAllDocsForPoe(this.mappingId).subscribe(
      (res)=>{ console.log(res); this.docs = JSON.parse(res)}, (error)=> console.log(error)
    );
    console.log(this.mappingId);
  }
  

  Download(mappingId: String, docType: String){
    console.log("in DMS get data");
    this.dmsService.downloadDocument(mappingId, docType).subscribe(blob => saveAs(blob, "example.pdf"));
  }

}
