import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUrl, httpOptions } from "../model/constants";
import { Merchant } from "../model/merchant";

@Injectable()
export class MerchantsService {
    private readonly route: string = 'merchants';

    constructor(private httpClient: HttpClient) {}

    public getMerchants(): Observable<Merchant[]> {
        return this.httpClient.get<Merchant[]>(`${baseUrl}/${this.route}`, httpOptions)
    }

    public addMerchant(name: string, categoryId: number): Observable<Merchant[]> {
        const body = { name, categoryId };
        return this.httpClient.post<Merchant[]>(`${baseUrl}/${this.route}`, body, httpOptions);
    }
}