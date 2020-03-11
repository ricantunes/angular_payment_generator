import { Injectable } from '@angular/core';
import { Square } from '../models/square';
import { timer, Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  matrix$: Observable<Square[]>;
  code$: Observable<string>;
  matrixSubject: Subject<Square[]>;
  codeSubject: Subject<string>;

  matrix: Square[];
  nRows = 10;
  nColumns = 10;

  code: string;
  fixedChar: string;

  constructor() {
    this.matrix = [];
    this.matrixSubject = new Subject<Square[]>();
    this.codeSubject = new Subject<string>();

    this.matrix$ = this.matrixSubject.asObservable();
    this.code$ = this.codeSubject.asObservable();

    timer(0, 2000).subscribe(() => { this.generateGrid(); });
  }

  updateMatrix(): void {
    this.matrixSubject.next(this.matrix);
  }

  getCode(): string {
    return this.code;
  }

  setFixedChar(char: string) {
    this.fixedChar = char;
  }

  generateGrid() {
    this.matrix = [];

    for (let i = 0; i < this.nRows; i++) {
      for (let k = 0; k < this.nColumns; k++) {
        const newSquare: Square = new Square();
        newSquare.xValue = i;
        newSquare.yValue = k;
        newSquare.value = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        this.matrix.push(newSquare);
      }
    }

    if (this.fixedChar) {
      this.forceChar(this.fixedChar);
    }

    this.updateMatrix();
    this.generateCode();
  }

  private forceChar(char: string) {
    if (char) {
      while (this.matrix.filter(x => x.value === char).length < ((this.nColumns * this.nRows) * 0.2)) {
        const xvalue = Math.floor(Math.random() * this.nColumns);
        const yvalue = Math.floor(Math.random() * this.nRows);
        this.matrix.find(c => c.xValue === xvalue && c.yValue === yvalue).value = char;
      }
    }
  }

  private generateCode() {
    const dateTime = new Date();
    const seconds = (dateTime.getSeconds() / 10).toFixed(1).toString().split('.');

    const var1 = this.matrix.find(c => c.xValue.toString() === seconds[0] && c.yValue.toString() === seconds[1]).value;
    const var2 = this.matrix.find(c => c.xValue.toString() === seconds[1] && c.yValue.toString() === seconds[0]).value;

    const var1Count = this.validateIfSingleDigit(this.matrix.filter(x => x.value === var1).length);
    const var2Count = this.validateIfSingleDigit(this.matrix.filter(x => x.value === var2).length);

    this.code = var1Count.toString() + var2Count.toString();

    this.codeSubject.next(this.code);
  }

  private validateIfSingleDigit(value: number): number {
    if (value <= 9) {
      return value;
    }

    for (let i = 1; i < value; i++) {
      if (value / i < 9) {
        return Math.round(value / i);
      }
    }
  }

}
