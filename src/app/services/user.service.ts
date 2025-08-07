import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Perfil } from "../interfaces/perfil.interface";

const API: string = environment.API;

@Injectable({ providedIn: 'root' })
export class UserService {
    private _roles = signal<string[]>(JSON.parse(localStorage.getItem('roles') || '[]'));
    private _profile = signal<Perfil>(JSON.parse(localStorage.getItem('profile') || '{}'));
    private _httpClient = inject(HttpClient);

    constructor() {

    }

    setRoles(roles: string[]) {
        this._roles.set(roles);
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    getRoles() {
        return this._roles.asReadonly();
    }

    clearRoles() {
        this._roles.set([]);
        localStorage.removeItem('roles');
    }

    setProfile(profile: Perfil) {
        this._profile.set(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    getProfile() {
        return this._profile.asReadonly();
    }

    clearProfile() {
        this._profile.set(new Perfil({}));
        localStorage.removeItem('profile');
    }

    /**
     * Obtiene la data del perfil logeado.
     */
    getDataProfile(legajo: string, token: string):Observable<any> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };
        const url = API + 'colaborador?legajo=' + legajo;

        return this._httpClient.get(url, options);
    }
}