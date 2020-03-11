import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentsService } from 'src/app/services/payments.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { Square } from 'src/app/models/square';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  matrix: Square[];
  code: string;

  paymentsList: Payment[];

  constructor(private paymentsService: PaymentsService, private generatorService: GeneratorService) { }

  ngOnInit(): void {
    this.paymentsList = this.paymentsService.getPayments();
    this.code = this.generatorService.getCode();

    this.generatorService.matrix$.subscribe((newMatrix: Square[]) => { this.matrix = newMatrix; });
    this.generatorService.code$.subscribe((newCode: string) => { this.code = newCode; });
  }

  addPayment(paymentName: string, amountVal: number) {
    this.paymentsService.addPayment(paymentName, amountVal, this.code, this.matrix);
  }
}

