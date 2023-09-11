import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../../entities/question';
import { catchError, Subject, takeUntil } from 'rxjs';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  questions: any;
  score = 0;
  currentQuestion: Question;
  allAnswers: Question[] = [];
  shuffledIndices: number[];
  totalQuestions: number;
  currentIndex: number = 0;
  gameOver = false;
  notification: string;

  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private quizService: QuizService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.quizService.getQuestions()
      .pipe(
        catchError(error => {
          throw(error);
        }),
        takeUntil(this.onDestroy$))
      .subscribe((data: Question[]) => {
        this.questions = data;
        this.questions.forEach((item: Question, index: number) => {
          this.questions[index].index = index;
        })
        this.totalQuestions = this.questions.length;
        this.startNewGame();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  startNewGame(): void {
    this.gameOver = false;
    this.allAnswers = [];
    this.currentIndex = 0;
    this.shuffledIndices = this.quizService.shuffleQuestionIndices(this.totalQuestions);
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    if (this.currentIndex < this.totalQuestions) {
      const nextIndex = this.shuffledIndices.pop();
      this.currentIndex++;
      this.currentQuestion = this.questions.find((item: Question) => item.index === nextIndex);
      this.allAnswers.push(this.currentQuestion);
    } else {
      this.gameOver = true;
      this.notification = 'Congratulations! You answered for all questions right!'
    }
    this.cd.detectChanges();
  }

  checkAnswer(selectedAnswer: number) {
    if (selectedAnswer === this.currentQuestion.correct) {
      this.score += this.calculateScoreForQuestion();
      const lastMaxScore = Number(localStorage.getItem('maxScore'));
      if ((!lastMaxScore || lastMaxScore < this.score) && this.score) localStorage.setItem('maxScore', this.score.toString());
      this.loadNextQuestion();
      this.cd.detectChanges();
    } else {
      this.score = 0;
      this.gameOver = true;
      this.notification = 'The game is over';
    }
  }

  calculateScoreForQuestion(): number {
    let score = 1;
    const questionsAnsweredCorrectly = this.currentIndex + 1;
    const baseScoreMultiplier = Math.floor(questionsAnsweredCorrectly / 10);

    if (baseScoreMultiplier > 0) {
      score = Math.pow(10, baseScoreMultiplier);
    }

    return score;
  }
}
