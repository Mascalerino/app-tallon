import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private exercisesUrl = '../../assets/workout-plan/exercices.json'; // Ruta al archivo JSON

  constructor(private http: HttpClient) {}

  getExercises(): Observable<{ [key: string]: string[] }> {
    return this.http.get<{ [key: string]: string[] }>(this.exercisesUrl);
  }
}
