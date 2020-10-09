import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import {DataService } from '../services/data.service'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchCompleted$ = new Subject();
  private searchResults;
  constructor(private dataService:DataService) { 

  }
  public search(params){
    let results;
    if(params.region == 0){
      results = this.searchDefault(params);
      
    }else{
      if (params.firstName == null && params.lastName == null) {
        results = this.searchRegionWithoutArgs(params);
      }else if(params.firstName !=null && params.lastName == null){
        results = this.filterByRegion(this.searchByFirstName(params),this.selectRegion(params));
      }else if(params.firstName == null && params.lastName != null){
        results = this.filterByRegion(this.searchByLastName(params),this.selectRegion(params));
      }else{
        results = this.filterByRegion(this.searchByFirstAndLast(params),this.selectRegion(params));
      }
 
    }
    
    this.asignResults(results);
    this.emmitSearchCompletedEvent();
  }
  private searchDefault(params){
    let results
    if (params.firstName == null && params.lastName == null && params.region == 0) {
      results = {personas : this.getAllPersons()}
    }else if(params.firstName != null && params.lastName != null ){
      results = {personas : this.searchByFirstAndLast(params), by :"Nombre y Apellido"};
    }else if (params.firstName != null && params.lastName == null) {
      results = {personas : this.searchByFirstName(params), by :"Nombre"};
    }else if(params.firstName == null && params.lastName != null ) {
      results = {personas : this.searchByLastName(params), by :"Apellido"};
    }
    return results;
  }
  private searchRegionWithoutArgs(params){
    let data = this.dataService.getData();
    let results =[];
    let region = this.selectRegion(params);
    data.personas.forEach(p => {
      region.comunas.forEach(element => {
        if (p.direccion.comuna.id == element.id) {
          results.push(p);
        }
      });
    });
    return {personas: results,by:"Region, no nombre, no apellido"};
  }
  private filterByRegion(results,region){
    let filter = [];
    results.forEach(person => {
      region.comunas.forEach(comuna => {
        if (person.direccion.comuna.id === comuna.id) {
          filter.push(person);
        }
      });
    });
    return {personas:filter, by:"Filtro de region"};
  }
  private asignResults(results){
    if (results.personas.length > 0) {
      this.searchResults = results;
    }else{
      this.searchResults = {personas:0, by:"No encontrado"};
    }
  }
  public getAllPersons(){
    return this.dataService.getData().personas;
  }
  private selectRegion(params){
    let data = this.dataService.getData();
    let region;
    data.regiones.forEach(element => {
      if(params.region == element.id){
        region = element;
      }
    });
    return region;
  }
  public searchByFirstAndLast(params){
    let data = this.dataService.getData();
    let results =[]
    data.personas.forEach(p => {
      if(p.nombre.toLowerCase() === params.firstName.toLowerCase() && 
      p.apellido.toLowerCase() ===  params.lastName.toLowerCase()){ //Para ignorar mayus y minus, todos caracteres se pasan a lower case
        results.push(p);
      }
    });
    return results
  }
  public searchByFirstName(params){
    let data = this.dataService.getData();
    let results =[]
    data.personas.forEach(p => {
      if(p.nombre.toLowerCase() ===  params.firstName.toLowerCase()){ 
        results.push(p);
      }
    });
    return results
  }
  public searchByLastName(params){
    let data = this.dataService.getData();
    let results =[]
    data.personas.forEach(p => {
      if(p.apellido.toLowerCase() ===  params.lastName.toLowerCase()){ 
        results.push(p);
      }
    });
    return results
  }
  emmitSearchCompletedEvent() { //Emision del evento observable
    this.searchCompleted$.next(this.searchCompleted$);
  }
  getSearchResults(){ 
    return this.searchResults;
  }
  getSearchCompleted$(){ //Evento de busqueda completada
    return this.searchCompleted$.asObservable();
  }
}
