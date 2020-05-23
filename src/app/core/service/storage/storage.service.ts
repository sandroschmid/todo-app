import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { BaseEntity } from '../../model/base-entity';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private readonly collections = new Map<string, AngularFirestoreCollection<any>>();

  public constructor(private readonly firestore: AngularFirestore) {
  }

  public getAll<T extends BaseEntity>(type: string): Observable<T[]> {
    return this.collection<T>(type)
      .valueChanges({ idField: 'id' });
  }

  public findById<T extends BaseEntity>(type: string, id: string): Observable<T | undefined> {
    return this.firestore.doc<T>(`${type}/${id}`).valueChanges();
  }

  public create<T extends BaseEntity>(type: string, value: T): Observable<void> {
    const id = this.firestore.createId();
    const document = this.collection<T>(type).doc(id);
    return fromPromise(document.set({ ...value, id }));
  }

  public partialUpdate<T>(type: string, id: string, value: T): Observable<void> {
    const document = this.firestore.doc<T>(`${type}/${id}`);
    return fromPromise(document.update(value));
  }

  public update<T extends BaseEntity>(type: string, value: T): Observable<void> {
    const document = this.firestore.doc<T>(`${type}/${value.id}`);
    return fromPromise(document.set(value));
  }

  public delete(type: string, id: string): Observable<void> {
    const document = this.firestore.doc(`${type}/${id}`);
    return fromPromise(document.delete());
  }

  private collection<T>(type: string): AngularFirestoreCollection<T> {
    let collection = this.collections.get(type);
    if (!collection) {
      collection = this.firestore.collection(type);
      this.collections.set(type, collection);
    }

    return collection;
  }

}
