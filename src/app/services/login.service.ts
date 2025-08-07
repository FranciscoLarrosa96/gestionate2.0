import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseInterface } from "../interfaces/response.interface";

const URL: string = environment.API_CONTROL;

const API_LOG: string = environment.API_LOG;

@Injectable({ providedIn: 'root' })
export class LoginService {
    errorType = signal<string>('');
    private _httpClient = inject(HttpClient);

    login(username: string, password: string): Observable<ResponseInterface> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const options = { headers: httpHeaders };

        const params = {
            'username': username,
            'password': password
        };
        return this._httpClient.post<ResponseInterface>(`${API_LOG}login`, params, options);
    }
}