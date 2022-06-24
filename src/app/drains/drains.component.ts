import { Component, OnInit } from '@angular/core';
import { DrainServiceService } from 'src/services/drain-service.service';
declare var $: any;
@Component({
  selector: 'app-drains',
  templateUrl: './drains.component.html',
  styleUrls: ['./drains.component.css']
})
export class DrainsComponent implements OnInit {

  constructor(public service: DrainServiceService) { }
  page = 1;
  pageSize = 1;

  filter = {
    Length: 0,
    AOdmName: '',
    EOdmName: '',
    Year:0,
    page: this.page,
    pageSize: this.pageSize,


  }

  ngOnInit(): void {
    this.service.GetAllDrains(this.page, this.pageSize);
  }

  GoToPage(event: number) {
    this.page = event;
    console.log(this.page, this.pageSize);
    if (this.filter.AOdmName != '' || this.filter.EOdmName != '' || this.filter.Length != 0) {
      this.filter.page = this.page;
      this.service.FilterDrains(this.filter)
    } else {
      this.service.GetAllDrains(this.page, this.pageSize);
    }
  }

  rowClick(index: number) {
    let element = document.getElementById("row_" + index);
    if (element != null) {
      // element.style.backgroundColor = "orange";
      $("#row_" + index).css("background-color", "aqua").siblings().css("background-color", "white")
    }

  }

  Filter() {
    this.service.FilterDrains(this.filter)
  }

  ClearFilter() {
    this.filter.AOdmName = '';
    this.filter.EOdmName = '';
    this.filter.Length = 0;
    // this.service.FilterDrains(this.filter)
    this.service.GetAllDrains(this.page, this.pageSize);
  }

  selectPage(xx : string)
  {
       console.log(xx);
  }
}
