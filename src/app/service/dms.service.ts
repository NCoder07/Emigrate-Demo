import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DmsService {
  mappingId: String;
  constructor(private http:HttpClient) {
    this.http=http;
  }
  
   saveDataToDms(dmsData:FormData):Observable<any>{
    console.log("In DMS Service")
    for (var value of dmsData.values()){
      console.log(value);
    }
    console.log("calling dms service");
      return this.http.post("http://10.210.7.121:9191/dms/saveDocument", dmsData, {  responseType: 'text' });
   }

   downloadDocument(mappingId: String, docType: String):Observable<any>{
    console.log("Downloading file from DMS");
    return this.http.get(`http://10.210.8.153:9393/dms/downloadDocumentLatestByMappingIdDocType/${mappingId}/${docType}`, {responseType: 'blob'})
   }

   viewDocument(mappingId: String, docType: String):Observable<any>{
    console.log("Viewing file from DMS");
    return this.http.get(`http://10.210.8.153:9393/dms/viewDocumentLatestByMappingIdDocType/${mappingId}/${docType}`)
   }

   getAllDocsForPoe(mappingId: String):Observable<any>{
    console.log("Getting docs as per mapping Id");
    return this.http.get(`http://10.210.8.153:9393/dms/listAllDocumentsForMappingId/${mappingId}`, {responseType: 'text'})
   }
}
