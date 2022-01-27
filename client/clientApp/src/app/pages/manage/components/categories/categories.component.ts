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
  public categories: Category[];
  public newCategoryName: string = '';
  public displayedColumns: string[] = ['name', 'isActive'];
  public readonly categoryNameFcName: string = 'name';
  public form: FormGroup;

  public get submitError(): string {
    return this.newCategoryName.length === 0 ? 'Category name can not be empty' : 'Category name must be unique'
  }

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
    this.categoriesService.addCategory(this.newCategoryName);
  }

  public duplicateNameFormValidator = (control: AbstractControl) => {
      return this.categories?.map(category => category.name.toLowerCase())
        .includes(control.value.toLowerCase()) ? { duplicateName: { value: control.value }} : null;
  }
}
