import { Component, OnInit,  AfterViewInit, ViewEncapsulation} from '@angular/core';
import { DashboardService } from './dashboard.service';
import * as echarts from 'echarts';
import { trendOption, data , fansOption } from './dashboard.options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private dashboard: DashboardService) { }
  cards: Array<any> = [];
  authors: any;
  columns: any;
  selectedStartDate = null;
  selectedEndDate = null;
  datePicker1: any;
  datePicker2: any;
  dateFormated = 'YYYY-MM-DD';
  dateFormatOptions = [{
    name: '今天',
    value: 'day'
  },
  {
    name: '本周',
    value: 'week'
  },
  {
    name: '本年',
    value: 'year'
  }];
  dateFormat: object = {
    name: '今天',
    value: 'day'
  };
  ngOnInit() {
    this.dashboard.getDashboard().subscribe( (res: any) => {
      this.cards = res.cards;
      this.authors = res.authors;
      this.columns = res.columns;
    });
  }

  mergeOptions(optionData) {
    trendOption.xAxis['data'] = optionData.x;
    trendOption.series[0]['data'] = optionData.y;
    return trendOption;
  }

  selectChange() {
    if (this.dateFormat && data[this.dateFormat['value']]) {
     const mergedOptions = this.mergeOptions(data[this.dateFormat['value']]);
     this.initTrendChart(mergedOptions);
    }
  }

  ngAfterViewInit() {
    this.initTrendChart(trendOption);
    this.initFansAgeChart();
  }

  initTrendChart(options) {
    const trendChartArea = document.querySelector('#trend-charts');
    const trendChart = echarts.init(trendChartArea);
    trendChart.setOption(options);
  }

  initFansAgeChart() {
    const fansChartArea = document.querySelector('#fans-age');
    const fansChart = echarts.init(fansChartArea);
    fansChart.setOption(fansOption);
  }

}
