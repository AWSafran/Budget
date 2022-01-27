import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { Merchant } from 'src/app/model/merchant';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  public merchants: Merchant[];
  public displayedColumns: string[] = ['name', 'categoryName'];

  constructor(private merchantsService: MerchantsService) { }

  public ngOnInit(): void {
    this.merchantsService.getMerchants().pipe(
      take(1)
    ).subscribe(merchants => this.merchants = [...merchants]);
  }

}
