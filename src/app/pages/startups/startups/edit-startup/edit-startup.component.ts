import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';

@Component({
  selector: 'app-edit-startup',
  templateUrl: './edit-startup.component.html',
  styleUrls: ['./edit-startup.component.css']
})
export class EditStartupComponent extends AppComponentBase implements OnInit {

  formGroup!: FormGroup;
  id: string = '';
  loading=true
  imgSrc: string = '/assets/img/uploadImg.jpg';
  selectedImage: any = null;

  constructor(
    private formBuilder: FormBuilder,
    injector: Injector,
    private _startupsService: StartupsService,
    private activatedRoute: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    super(injector);
  }

  ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((result)=>{
      if(result['id']){
        this.id=result['id']
      }
    })
    this.formGroup = this.formBuilder.group({
      startupName:null,
      logoImage:null,
      city:null,
      sectors:null,
      founderName:null,
      numberOfEmployees:null,
      yearOfEstablishment:null,
      websiteUrl:null,
      emailAddress:null,
    });

    this.getProductById()
  }
  getProductById(){
   this._startupsService.getById(this.id).subscribe((result:any)=>{
      this.formGroup = this.formBuilder.group({
        startupName: result['startupName'],
        logoImage: result['logoImage'],
        city:result['city'],
        sectors: result['sectors'],
        founderName: result['founderName'],
        numberOfEmployees: result['numberOfEmployees'],
        yearOfEstablishment:result['yearOfEstablishment'],
        websiteUrl: result['websiteUrl'],
        emailAddress: result['emailAddress']
    })
    this.loading=false;
  })
  }
  onUpdateClicked() {
 this._uploadService
    .upload(this.selectedImage)
      .pipe(
        finalize(() => {
          this._uploadService.getDownloadURL().subscribe((url) => {
            this._startupsService
            .update(this.id, {
              startupName: this.formGroup.controls['startupName'].value,
              logoImage: this.formGroup.controls['logoImage']=url,
              city:this.formGroup.controls['city'].value,
              sectors: this.formGroup.controls['sectors'].value,
              founderName: this.formGroup.controls['founderName'].value,
              numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
              yearOfEstablishment: this.formGroup.controls['yearOfEstablishment'].value,
              websiteUrl: this.formGroup.controls['websiteUrl'].value,
              emailAddress: this.formGroup.controls['emailAddress'].value,
            })
            .then(() => {
              this.back();
            });
          });
        })
      )
      .subscribe();


  }
  selectImage(event: any) {
    if (event.target.value && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/uploadImg.jpg';
      this.selectedImage = null;
    }
  }


}
