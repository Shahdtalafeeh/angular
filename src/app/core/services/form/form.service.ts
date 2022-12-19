import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase  } from '@angular/fire/compat/database';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Startups } from '../../interfaces/startups.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  dbPath = '/requests';

  startupsRef!: AngularFireList<Startups>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.startupsRef = angularFireDatabase.list(this.dbPath);
  }
  getAll(): Observable<any> {
    return this.startupsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ id: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }


  getById(id: string) {
    return this.angularFireDatabase.object('/requests/' + id).valueChanges();
  }
  create(startup: Startups) {
    return this.startupsRef.push(startup);
  }
  update(key: string, startup: Startups) {
    return this.startupsRef.update(key, startup);
  }
  delete(key: string) {
    return this.startupsRef.remove(key);
  }
  deleteAll() {
    return this.startupsRef.remove();
  }

}
