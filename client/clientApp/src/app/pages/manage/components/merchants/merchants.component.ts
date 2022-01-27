import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take, tap } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Merchant } from 'src/app/model/merchant';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  @Input() public categories: Category[];
  @Input() public merchants: Merchant[];

  @Output() public onAddMerchant: EventEmitter<{ name: string, categoryId: number }> = new EventEmitter<{ name: string, categoryId: number }>();

  public form: FormGroup;
  public displayedColumns: string[] = ['name', 'categoryName'];

  public readonly merchantFcName: string = 'merchant';
  public readonly categoryFcName: string = 'category';

  constructor(
    private merchantsService: MerchantsService,
    private formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.merchantsService.getMerchants().pipe(
      take(1)
    ).subscribe(merchants => this.merchants = [...merchants]);

    this.form = this.formBuilder.group({
      [this.merchantFcName]: ['', Validators.required],
      [this.categoryFcName]: [null, Validators.required]
    },
    {
      validators: [this.uniqueEntryValidator()]
    });

    this.form.addValidators(this.uniqueEntryValidator);
  }

  public uniqueEntryValidator(): ValidatorFn {
      return (formGroup: AbstractControl) => {
      const merchantName: string = formGroup.get(this.merchantFcName)?.value;
      const categoryId: number = formGroup.get(this.categoryFcName)?.value;

      return this.merchants?.some(merchant => merchant.name === merchantName && merchant.categoryId === categoryId) ?
        { duplicateMerchant: 'Merchant name must be unique within category' } : null;
    }
  }

  public addMerchant(): void {
    const name: string = this.form.get(this.merchantFcName)?.value;
    const categoryId: number = this.form.get(this.categoryFcName)?.value;

    if (name === null || categoryId === null) {
      return;
    }
    console.log('submitting: ', name, categoryId);
    this.onAddMerchant.emit({ name, categoryId });
  }
}
