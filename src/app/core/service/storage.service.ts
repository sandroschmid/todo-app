import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { QueryFn } from '@angular/fire/firestore/interfaces';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { BaseEntity } from '../model/base-entity';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private readonly collections = new Map<string, AngularFirestoreCollection<any>>();

  public constructor(private readonly fireAuth: AngularFireAuth,
                     private readonly firestore: AngularFirestore) {
  }

  public resetQueries(type: string): void {
    this.collections.delete(type);
  }

  public getAll<T extends BaseEntity>(type: string, queryFn?: QueryFn): Observable<T[]> {
    return this.collection<T>(type, queryFn).valueChanges({ idField: 'id' });
  }

  public findById<T extends BaseEntity>(type: string, id: string, queryFn?: QueryFn): Observable<T | undefined> {
    return this.collection<T>(type, queryFn).doc<T>(id).valueChanges();
  }

  public create<T extends BaseEntity>(type: string, value: T, queryFn?: QueryFn): Observable<void> {
    const id = this.firestore.createId();
    return fromPromise(this.document(type, queryFn, id).set({ ...value, id }));
  }

  public partialUpdate<T>(type: string, id: string, value: T, queryFn?: QueryFn): Observable<void> {
    return fromPromise(this.document(type, queryFn, id).update(value));
  }

  public update<T extends BaseEntity>(type: string, value: T, queryFn?: QueryFn): Observable<void> {
    return fromPromise(this.document(type, queryFn, value.id).set(value));
  }

  public delete(type: string, id: string, queryFn?: QueryFn): Observable<void> {
    return fromPromise(this.document(type, queryFn, id).delete());
  }

  private collection<T>(type: string, queryFn: QueryFn): AngularFirestoreCollection<T> {
    return this.firestore.collection(type, queryFn);

    // let collection = this.collections.get(type);
    // if (!collection) {
    //   collection = this.firestore.collection(type, queryFn);
    //   this.collections.set(type, collection);
    // }
    //
    // return collection;
  }

  private document<T>(type: string, queryFn: QueryFn, id: string): AngularFirestoreDocument<T> {
    return this.collection(type, queryFn).doc(id);
  }

}
