import { Component } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  defaultFirstUrlCurrency: string = 'AED';
  defaultSecondUrlCurrency: string = 'AED';
  arrayInputs: any = [];
  currencyList: any = []; // use in template on selection
  result: any = [];
  sumCurrsResult: any = [];

  currencyForm = this.fb.group({
    firstCurrencyAmount: ['', Validators.required],
    secondCurrencyAmount: ['', Validators.required],
    currencyFrom: ['AED'],
    currencyTo: ['AED'],
    aliases: this.fb.array([this.fb.control('')]),
  });

  currenciesSumForm = this.fb.group({
    firstCurrencyAmount: ['', Validators.required],
    secondCurrencyAmount: ['', Validators.required],
    formArray: this.fb.array([this.createInput()]),
    currencyFrom: ['AED'],

    currencyTo: ['AED'],

    resultInput: [{ value: 'AED', disabled: true }],
    finalResult: ['AED'],
  });

  constructor(
    private fb: FormBuilder,
    private httpService: HttpServiceService
  ) {}

  url2 = `https://free.currconv.com/api/v7/convert?q=${this.currencyForm.get(
    'currencyFrom'
  )}_${this.currencyForm.get(
    'currencyTo'
  )}&compact=ultra&apiKey=14f774d75867a5570702`;
  get input() {
    return this.currenciesSumForm.get('formArray') as FormArray;
  }

  createInput() {
    return this.fb.group({
      amount: '',
      currencyValue: 'AED',
    });
  }

  addInput() {
    this.arrayInputs = this.currenciesSumForm.get('formArray') as FormArray;
    this.arrayInputs.push(this.createInput());
  }

  // watchValues() {
  //   // console.log(this.input);
  //   // console.log(this.input.value);
  //   // console.log(this.arrayInputs.controls.length);
  //   console.log(this.arrayInputs.controls);
  // }

  showCurrs() {
    this.httpService
      .fetchData(this.httpService.url1)

      .subscribe(
        (response) => {
          this.currencyList.push(response);
          this.currencyList = Object.keys(this.currencyList[0].results);
          this.currencyList = this.currencyList.sort();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.showCurrs();

    //Value changed of select
    this.currencyForm
      .get('currencyFrom')
      ?.valueChanges.subscribe((selectedCurrency) => {
        //very bad desicion. need to fix
        this.defaultFirstUrlCurrency = selectedCurrency;
        this.httpService.url2 = `https://free.currconv.com/api/v7/convert?q=${this.defaultFirstUrlCurrency}_${this.defaultSecondUrlCurrency}&compact=ultra&apiKey=14f774d75867a5570702`;
      });

    //Value changed of select first
    this.currencyForm.get('currencyTo')?.valueChanges.subscribe((value) => {
      // this.currencyForm.controls.currencyTo.setValue(y);

      this.currencyFormControl.secondCurrencyAmount.setValue(value);

      //very bad solution. need to fix
      this.defaultSecondUrlCurrency = value;
      this.httpService.url2 = `https://free.currconv.com/api/v7/convert?q=${this.defaultFirstUrlCurrency}_${this.defaultSecondUrlCurrency}&compact=ultra&apiKey=14f774d75867a5570702`;
    });

    //First input value changed >>> calculate course!!!

    this.currencyForm
      .get('firstCurrencyAmount')
      ?.valueChanges.subscribe((value) => {
        this.httpService.fetchData(this.httpService.url2).subscribe(
          (data) => {
            this.result = [];
            this.result.push(data);
            this.result = Object.entries(this.result[0]);
            const [_, secondCur] = Object.entries(this.result[0]);
            this.result =
              Number(secondCur[1]) *
              this.currencyForm.controls.firstCurrencyAmount.value;

            //set value to secondInput
            this.currencyForm.patchValue(
              {
                secondCurrencyAmount: this.result.toFixed(3),
              },
              {
                emitEvent: false,
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });

    //Second input value changed >>> calculate course!!!
    this.currencyForm
      .get('secondCurrencyAmount')
      ?.valueChanges.subscribe((w) => {
        this.httpService.url2 = `https://free.currconv.com/api/v7/convert?q=${this.defaultSecondUrlCurrency}_${this.defaultFirstUrlCurrency}&compact=ultra&apiKey=14f774d75867a5570702`;
        this.httpService
          .fetchData(this.httpService.url2)

          .subscribe(
            (response) => {
              this.result = [];
              this.result.push(response);
              this.result = Object.entries(this.result[0]);

              const [_, b] = Object.entries(this.result[0]);
              this.result =
                Number(b[1]) *
                this.currencyForm.controls.secondCurrencyAmount.value;

              //set value to firstInput
              this.currencyForm.patchValue(
                {
                  firstCurrencyAmount: this.result.toFixed(3),
                },
                {
                  emitEvent: false,
                }
              );
              // console.log(this.currencyForm.get('currencyFrom')?.value); // not shown at first
            },
            (error) => {
              console.log(error);
            }
          );
      });
  }

  get currencyFormControl() {
    return this.currencyForm.controls;
  }
  // CurrenciesSum form
  getCurrsSum() {
    let sum = 0;

    for (let currency of this.arrayInputs.controls) {
      this.httpService.url2 = `https://free.currconv.com/api/v7/convert?q=${
        currency.value.currencyValue
      }_${
        this.currenciesSumForm.get('finalResult')?.value
      }&compact=ultra&apiKey=14f774d75867a5570702`;

      this.httpService.fetchData(this.httpService.url2).subscribe(
        (data) => {
          this.sumCurrsResult = [];
          this.sumCurrsResult.push(data); // {gel_usd:3.15}
          this.sumCurrsResult = Object.entries(this.sumCurrsResult[0]);
          const [_, secondCur] = Object.entries(this.sumCurrsResult[0]);
          this.sumCurrsResult = Number(secondCur[1]) * currency.value.amount;
          sum += this.sumCurrsResult;
          //set value to secondInput
          this.currenciesSumForm.patchValue(
            {
              resultInput: sum.toFixed(3),
            },
            {
              emitEvent: false,
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
