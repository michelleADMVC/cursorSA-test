import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService:SearchService) { }

  search(formData){
      this.searchService.search(formData);
  }
  
  ngOnInit(): void {
  }

}
