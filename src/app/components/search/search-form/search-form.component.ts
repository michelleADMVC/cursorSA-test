import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { FormControl,FormGroup} from '@angular/forms';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() searchEvent  = new EventEmitter();
  searchForm = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    region: new FormControl(0),
  });
  constructor() { }
  ngOnInit(): void {
  }
  onSubmit() {
    if(this.searchForm.value.firstName == null && this.searchForm.value.lastName == null && 
      this.searchForm.value.region == null){
      alert("Debes ingresar datos en el formulario de busqueda")
    }else{
      this.searchEvent.emit(this.searchForm.value);
      this.searchForm.setValue({firstName: null,lastName: null, region : 0})
    }
    
  }
}
