import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Service } from 'src/app/core/interfaces/service.interface';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { PreviewService } from 'src/app/core/services/preview/preview.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  centered = false;
sectors: Sectors[]=[]
startups:Service[]=[]
sub:any
sub1:any
list:any
list1:any
  constructor(private _userService: UsersService,  private _startupservice: StartupsService,
    private route: Router, private _sectorservice: SectorsService) {

    }

  ngOnInit(): void {
this.getAllstart()
this.getAllsectors()


  }
  routingToLogin(){
    if(this._userService.isloggedIn){
    this.route.navigate(['/form'])

  }else{
    this.route.navigate(['/users'])
  }
}
getAllstart() {
 this.sub = this._startupservice.getAll().subscribe((result) => {
    this.startups = result;

  });
}
onCardClicked(id:string) {

  this.route.navigate(['/landing/preview'],{
    queryParams:{
      id:id,
    }
    })
}
getAllsectors() {
 this.sub1 = this._sectorservice.getAll().subscribe((result) => {
    this.sectors =result



  });
}
// ngOnDestroy(){
// this.sub.unsubscribe()
// this.sub1.unsubscribe()
// }



}
