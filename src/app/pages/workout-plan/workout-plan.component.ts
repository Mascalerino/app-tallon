import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercicies.service';

interface AddedExercise {
  name: string;
  series: number;
  reps: number;
}

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css'],
})
export class WorkoutPlanComponent implements OnInit {
  exercises: { [key: string]: string[] } = {};
  categories: string[] = [];
  selectedCategory: string = '';
  selectedExercises: string[] = [];
  selectedExercise: string = '';
  series: number | null = null;
  reps: number | null = null;
  addedExercises: AddedExercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe((data) => {
      this.exercises = data;
      this.categories = Object.keys(data);
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.selectedExercises = this.exercises[category] || [];
    this.selectedExercise = '';
  }

  addExercise(): void {
    if (this.selectedExercise && this.series && this.reps) {
      this.addedExercises.push({
        name: this.selectedExercise,
        series: this.series,
        reps: this.reps,
      });

      // Reseteamos los campos
      this.series = null;
      this.reps = null;
      this.selectedExercise = '';
    }
  }

  clearExercises(): void {
    this.addedExercises = [];
  }
}
