import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuperHero } from '../models/interfaces/SuperHero';
import { Observable, map } from 'rxjs';
import { Superpower } from '../models/interfaces/superpower';

interface ApiListResponse<T> {
    isSuccess: boolean;
    message: string;
    type: number;
    models: T[];
}

interface ApiSingleResponse<T> {
    isSuccess: boolean;
    message: string;
    type: number;
    model: T;
}

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private apiUrl = 'https://localhost:7195/api/v1';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<SuperHero[]> {
        return this.http.get<ApiListResponse<SuperHero>>(`${this.apiUrl}/SuperHero`)
            .pipe(
                map(response => response.models)
            );
    }

    getHeroById(id: number): Observable<SuperHero> {
        return this.http.get<ApiSingleResponse<SuperHero>>(`${this.apiUrl}/SuperHero/${id}`)
            .pipe(
                map(response => response.model)
            );
    }

    createHero(hero: SuperHero): Observable<SuperHero> {
        return this.http.post<ApiSingleResponse<SuperHero>>(`${this.apiUrl}/SuperHero`, hero)
            .pipe(
                map(response => response.model)
            );
    }

    updateHero(id: number, hero: SuperHero): Observable<SuperHero> {
        return this.http.put<ApiSingleResponse<SuperHero>>(`${this.apiUrl}/SuperHero/${id}`, hero)
            .pipe(
                map(response => response.model)
            );
    }

    deleteHero(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/SuperHero/${id}`);
    }

    getSuperpowers(): Observable<Superpower[]> {
        return this.http.get<ApiListResponse<Superpower>>(`${this.apiUrl}/superpowers`)
            .pipe(
                map(response => response.models)
            );
    }
}