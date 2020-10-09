import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service'
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  public isEmpty = true;
  public results;
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
    this.searchService.getSearchCompleted$().subscribe(()=>{ //Subscripcion al evento de busqueda
      this.onSearchCompleted();
    })
  }
  onSearchCompleted(){
    this.results = this.searchService.getSearchResults()
      if(this.results.personas.length > 0){
        this.isEmpty=false;
      }else{
        this.isEmpty=true;
      }
  }
  phoneValidator(phone){
    if (phone.toString().length != 11) {
      return "Numero no valido";
    }else{
      return phone ;
    }
  }
  rutValidator(rut){
    if (this.validateRut(rut)) {
      return rut;
    }else{
      return "Rut no valido"
    }
  }

    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validateRut(rut) {
      rut = rut.replace("‐","-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rut ))
        return false;
      var tmp 	= rut.split('-');
      var digv	= tmp[1]; 
      var rut 	= tmp[0];
      if ( digv == 'K' ) digv = 'k' ;
      
      return (this.dv(rut) == digv );
    }
    dv(T){
      var M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    }
  
  
}
