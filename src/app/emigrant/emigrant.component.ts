import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Emigrant } from '../models/emigrant';
import { DmsService } from '../service/dms.service';
import { EmigrantService } from '../service/emigrant.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-emigrant',
  templateUrl: './emigrant.component.html',
  styleUrls: ['./emigrant.component.css'],
})
export class EmigrantComponent implements OnInit {
  emigrantFrom: any = FormGroup;
  public userFile: any = File;
  flag: boolean = true;
  emigrant: Emigrant = new Emigrant();

  dms = {
    mappingId: '',
    processName: 'Registration process',
    docType: 'passport',
    uploadedBy: 'neil',
  };

  constructor(
    private fb: FormBuilder,
    private emigrantService: EmigrantService,
    private dmsService: DmsService
  ) {
    this.emigrantFrom = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      profession: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      //mappingId: [''],
      passport: this.fb.group({
        passportNumber: [''],
        passportType: [''],
        placeOfIssue: [''],
        issueDate: [''],
        expiryDate: [''],
      }),
      visa: this.fb.group({
        visaNumber: [''],
        visaType: [''],
        visaIssueDate: [''],
        visaExpiryDate: [''],
      })
    });
  }
  onSelectFile(event) {
    // console.log('****On file select***');
     const file = event.target.files[0];
     this.userFile = file;
    // console.log(event.target.files[0]);
  }

  onSubmit() {
    console.log('Emigrant form submitted');
    //console.log(this.emigrantFrom.value);
    const emigrantUser = this.emigrantFrom.value;

    var newMappingId;
    var formData = new FormData();
    formData.append('emigrant', JSON.stringify(emigrantUser));
    //formData.append('file', this.userFile);

    var dmsFromData = new FormData();
    dmsFromData.append('dmsData', JSON.stringify(this.dms));
    dmsFromData.append('file', this.userFile);

    // this.dmsService.saveDataToDms(dmsFromData).subscribe(
    //   (response) => {
    //     console.log("Response received from DMS: ");
    //     console.log(response);
    //     if(response != null){

    //       alert("form submitted to Backend");
    //        newMappingId = this.emigrantFrom.mappingId = response;
    //       //console.log("*****************************"+newMappingId)
    //       this.emigrant.mappingId = newMappingId;
    //       console.log(this.emigrant);
          
    //       console.log("New Mapping id is: ")
    //       console.log(newMappingId);
    //       // for (var val of formData.keys()){
    //       //   console.log("form values --"+val);

    //       // }
    //       // for (var value of formData.values()){
    //       //   console.log("form values --"+value);
    //       // }
         
          
    //       this.flag = true;
          
    //     }
    //     else{
    //       console.log("response is null!!");
    //       console.log("Not calling emigrant service!!");
    //     }
    //   },
    //   (error) => console.log(error)
    // );

    //if (this.flag === true) {
      console.log('true returned from DMS service');
      console.log('forwarding data to Backend...');

      this.emigrantService.saveUserProfile(this.emigrant).subscribe((response) => {
        console.log(response);
      });
    //}

    //this.emigrantFrom.reset();
  }

  onLoadDataClick(): void {
    this.emigrantFrom.patchValue({
      firstName: 'Jack',
      middleName: 'P',
      lastName: 'Sparrow',
      profession: 'Pirate',
      education: 'underqualified',
      address: 'Unknown',
      contactNumber: '9999999999',
      gender: 'Male',
      dateOfBirth: '2001-01-01',
      passport: {
        passportNumber: '1',
        passportType: 'Type-1',
        placeOfIssue: 'Mumbai',
        visaIssueDate: '2022-06-12',
        visaExpiryDate: '2022-06-30',
      },
      visa: {
        visaNumber: '12',
        visaType: 'type-1',
        issueDate: '2022-06-11',
        expiryDate: '2022-06-20',
      },
    });
  }

  
  ngOnInit(): void {}
}
