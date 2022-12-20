import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponentBase } from 'src/app/core/base/app-component-base';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Startups } from 'src/app/core/interfaces/startups.interface';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent extends AppComponentBase
implements OnInit, AfterViewInit
{
isLoggedIn$!: Observable<boolean>;
@ViewChild(MatPaginator)
paginator!: MatPaginator;
displayedColumns: string[] = [
  'select',
  'sectors',
  'sectorLogo',
  'designColor',
  'parentCategoryName',
  'action',
];
dataSource = new MatTableDataSource<Startups>([]);
selection = new SelectionModel<any>(true, []);
value: any;

filterData = {
  sectorName:''
};
constructor(
  private router: Router,
  injector: Injector,
  private _sectorservice: SectorsService,
  private _usersService: UsersService
) {
  super(injector);
}

ngOnInit(): void {
  this.getAllstart();
  this.isLoggedIn$ = this._usersService.isLoggedIn$;


}
getAllstart() {
  this._sectorservice.getAll().subscribe((result) => {
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  });
}


onDeleteRowClicked(id: string) {
  this._sectorservice.delete(id);
}
onEditRowClicked(id: string) {
  this.router.navigate(['/sectors/edit-sector'], {
    queryParams: {
      id: id,
    },
  });
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}
onAddClicked() {
  this.router.navigate(['/sectors/add-sector']);
}
onRowClicked(id:string) {
  this.router.navigate(['/sectors/preview-sector'],{
    queryParams:{
      id:id,
    }
    })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
}
