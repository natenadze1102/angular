import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  defaultFirstUrlCurrency = 'AED';
  defaultSecondUrlCurrency = 'AED';

  public url1 =
    'https://free.currconv.com/api/v7/currencies?apiKey=14f774d75867a5570702';
  constructor(private http: HttpClient) {}

  public url2 = `https://free.currconv.com/api/v7/convert?q=${this.defaultFirstUrlCurrency}_${this.defaultSecondUrlCurrency}&compact=ultra&apiKey=14f774d75867a5570702`;

  fetchData(data: any) {
    return this.http.get(data);
  }

  changeCur(value: any) {
    this.defaultFirstUrlCurrency = value;
    return this.defaultFirstUrlCurrency;
  }
}
