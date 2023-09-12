import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {


  @Input()
  dataArray:Array<any> = [];
  @Input()
  noOfRecordsPerPage :any= 0;
  @Input()
  dataSliceStart:any = 0;
  @Input()
  dataSliceEnd :any= 10;
  currentPageNo:number = 0;
  

  @Output('sliceArray')
  eventEmitter  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Used to generate pagination
   * @returns Pagination Array
   */
  getPaginationLength(){
    let x = Math.round(this.dataArray.length / this.noOfRecordsPerPage);
    let v = x < (this.dataArray.length / this.noOfRecordsPerPage) ? x + 1 : x;
    return new Array(v)
  }

  /**
   * Used to slice parent component's data array
   * @param idx 
   */
  arraySlice(idx: number) {

    this.currentPageNo = idx;
    this.dataSliceStart = idx * this.noOfRecordsPerPage  ;
    this.dataSliceEnd = ((idx + 1) * this.noOfRecordsPerPage)
    this.eventEmitter.emit({dataSliceStart:this.dataSliceStart, dataSliceEnd:this.dataSliceEnd})
  
  }
}
