import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Square } from 'src/app/models/square';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

   matrix: Square[];
   nRows = 10;
   nColumns = 10;

   charValue: string;
   code: string;
   isBlocked = false;

   constructor(private generatorService: GeneratorService) { }

   ngOnInit(): void {
     this.generatorService.matrix$.subscribe((newMatrix: Square[]) => { this.matrix = newMatrix; });
     this.generatorService.code$.subscribe((newCode: string) => { this.code = newCode; });
     this.generatorService.updateMatrix();

     this.code = this.generatorService.getCode();
   }

   generateGrid() {
      this.generatorService.generateGrid();
   }

   useCharValue(event: any) {
     if (!this.alphabetOnly(event)) {
       return;
     }

     this.isBlocked = true;
     timer(4000).subscribe(() => { this.isBlocked = false; });

     this.generatorService.setFixedChar(event.target.value);
   }

   alphabetOnly(event: any): boolean {
     const charCode = (event.charCode) ? event.charCode : ((event.keyCode) ? event.keyCode :
        ((event.which) ? event.which : 0));
     if (charCode > 31 && (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122)) {
        return false;
     }
     return true;
   }
 }
