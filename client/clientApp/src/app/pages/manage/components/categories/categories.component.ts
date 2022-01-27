import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  // TODO: Add edit/delete function, table paging, filtering on isActive
  @Input() public categories: Category[];

  @Output() public onAddCategory: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup;
  public displayedColumns: string[] = ['name', 'isActive'];
  public readonly categoryNameFcName: string = 'name';

  constructor(
    private readonly formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      [this.categoryNameFcName]: ['', [Validators.required, this.duplicateNameFormValidator]]
    });
  }

  public addCategory(): void {
    const control = this.form.get(this.categoryNameFcName);
    if (!control) {
      return;
    }

    this.onAddCategory.emit(control.value);
  }

  public duplicateNameFormValidator = (control: AbstractControl) => {
      return this.categories?.map(category => category.name.toLowerCase())
        .includes(control.value.toLowerCase()) ? { duplicateName: { value: control.value }} : null;
  }
}
