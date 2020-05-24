import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit, OnDestroy {

  @Output() public readonly filterChange = new EventEmitter<string | undefined>();

  public readonly filterControl: FormControl;

  private readonly ngDestroy = new Subject<void>();

  public constructor(formBuilder: FormBuilder) {
    this.filterControl = formBuilder.control(undefined);
  }

  @Input()
  public set filter(value: string) {
    this.filterControl.setValue(value);
  }

  public ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        takeUntil(this.ngDestroy),
        debounceTime(200),
      )
      .subscribe(payload => this.filterChange.next(payload ? payload.trim() : undefined));
  }

  public ngOnDestroy(): void {
    this.ngDestroy.next();
  }

}
