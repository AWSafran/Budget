import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../model/category";
import { baseUrl, httpOptions } from "../model/constants";

@Injectable()
export class CategoriesService {
    private readonly route: string = 'categories';

    constructor(private httpClient: HttpClient) { }

    public getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`${baseUrl}/${this.route}`, httpOptions);
    }

    public addCategory(name: string): Observable<Category[]> {
        const body = { name };
        return this.httpClient.post<Category[]>(`${baseUrl}/${this.route}`, body, httpOptions);
    }
}