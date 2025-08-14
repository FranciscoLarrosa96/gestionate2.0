import { HttpClient, HttpHeaders } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Perfil } from "../interfaces/perfil.interface";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

const API: string = environment.API;

@Injectable({ providedIn: 'root' })
export class UserService {
    perfilLogeado = computed(() => this._profile());
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
        return this._roles();
    }

    clearRoles() {
        this._roles.set([]);
        localStorage.removeItem('roles');
    }

    setProfile(profile: Perfil) {
        this._profile.set(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    clearProfile() {
        this._profile.set(new Perfil({}));
        localStorage.removeItem('profile');
    }

    /**
     * Obtiene la data del perfil logeado.
     */
    getDataProfile(legajo: string): Observable<Perfil> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: httpHeaders };
        const url = API + 'colaborador?legajo=' + legajo;

        return this._httpClient.get<Perfil>(url, options);
    }

    /**
     * Obtiene el rol del usuario logeado.
     */
    getRole(legajo: string): Observable<string[]> {

        const url = API + 'getRoles' + '?legajo=' + legajo;

        return this._httpClient.get<string[]>(url);
    }
}

/**
 * Resuelve perfil de colaborador by legajo
 */
export const perfilResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
    const legajo = route.paramMap.get('id')! || inject(UserService).perfilLogeado().legajo;
    return inject(UserService).getDataProfile(legajo);
};