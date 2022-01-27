import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  // TODO: Add edit/delete function, table paging, filtering on isActive
  public categories: Category[];
  public displayedColumns: string[] = ['name', 'isActive'];
  public readonly categoryNameFcName: string = 'name';
  public form: FormGroup;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.categoriesService.getCategories().pipe(
      take(1)
    ).subscribe(res => {
      this.categories = res;
    })

    this.form = this.formBuilder.group({
      [this.categoryNameFcName]: ['', [Validators.required, this.duplicateNameFormValidator]]
    });
  }

  public addCategory() {
    const control = this.form.get(this.categoryNameFcName);
    if (!control) {
      return;
    }
    this.categoriesService.addCategory(control.value).pipe(
      take(1)
    ).subscribe(categories => this.categories = [...categories]);
  }

  public duplicateNameFormValidator = (control: AbstractControl) => {
      return this.categories?.map(category => category.name.toLowerCase())
        .includes(control.value.toLowerCase()) ? { duplicateName: { value: control.value }} : null;
  }
}
