import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Merchant } from 'src/app/model/merchant';
import { CategoriesService } from 'src/app/services/categories.service';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public categories: Category[];
  public merchants: Merchant[];

  constructor(
    private categoriesService: CategoriesService,
    private merchantsService: MerchantsService
  ) {}

  public ngOnInit(): void {
    this.categoriesService.getCategories().pipe(
      take(1)
    ).subscribe(res => {
      this.categories = res;
    })
  }

  public addCategory(name: string) {
    this.categoriesService.addCategory(name).pipe(
      take(1)
    ).subscribe(categories => this.categories = [...categories]);
  }

  public addMerchant(merchant: { name: string, categoryId: number }) {
    this.merchantsService.addMerchant(merchant.name, merchant.categoryId).pipe(
      take(1)
    ).subscribe(merchants => this.merchants = [...merchants]);
  }
}
