import { Injectable } from '@angular/core';
import { Question } from "../entities/question";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export const JsonPath = '../../assets/questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(JsonPath);
  }

  shuffleQuestionIndices(totalQuestions: number): number[] {
    const shuffledIndices = Array.from({ length: totalQuestions }, (_, i) => i);

    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    return shuffledIndices;
  }
}
