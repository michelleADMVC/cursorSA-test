import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private url = "https://private-anon-eba4971543-testphonebook.apiary-mock.com/region";
  constructor(private http:HttpClient) { 
  }
  
  public getFromApi(){
    //console.log(`Get from ${this.url}`);
    return this.http.get(this.url);
  }

}
