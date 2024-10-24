import { formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from '@antv/g2';
import { ApolloQueryResult } from '@apollo/client/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ChartTimeframe,
  DriverRegistrationsGQL,
  IncomeChartGQL,
  OverviewQuery,
  RequestsChartGQL,
  RiderRegistrationsGQL,
} from '@ridy/admin-panel/generated/graphql';
import { firstValueFrom, map, Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, AfterViewInit {
  query?: Observable<ApolloQueryResult<OverviewQuery>>;
  incomeMode = 2;
  requestMode = 2;
  driverRegistrationsMode = 2;
  riderRegistrationsMode = 2;

  chartTimeOptions = [
    { label: 'Daily', value: ChartTimeframe.Daily },
    { label: 'Monthly', value: ChartTimeframe.Monthly },
    { label: 'Yearly', value: ChartTimeframe.Yearly },
  ];

  private chartRequests!: Chart;
  private chartIncome!: Chart;
  private chartDriverRegistrations!: Chart;
  private chartRiderRegistrations!: Chart;

  isChartIncomeEmpty = false;
  isChartRequestsEmpty = false;
  isChartDriverRegistrationsEmpty = false;
  isChartRiderRegistrationsEmpty = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private route: ActivatedRoute,
    private incomeChartGQL: IncomeChartGQL,
    private requestsChartGQL: RequestsChartGQL,
    private driverRegistrationsChartGQL: DriverRegistrationsGQL,
    private riderRegistrationsChartGQL: RiderRegistrationsGQL,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.refreshIncome();
    this.refreshRequests();
    this.refreshDriverRegistrations();
    this.refreshRiderRegistrations();
  }

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.overview));
  }

  async refreshIncome() {
    const result = await firstValueFrom(
      this.incomeChartGQL.fetch({
        timeframe: this.chartTimeOptions[this.incomeMode].value,
      })
    );
    this.isChartIncomeEmpty = result.data.incomeChart.length == 0;
    if (this.isChartIncomeEmpty) {
      this.chartIncome.clear();
      return;
    }
    const timeFormat = this.getTimeFormatForQuery(
      this.chartTimeOptions[this.incomeMode].value
    );
    result.data.incomeChart.forEach((result) => {
      result.time = formatDate(result.time, timeFormat, this.locale);
      result.sum = parseFloat(result.sum.toFixed(2));
    });
    this.chartIncome.data(result.data.incomeChart);
    this.chartIncome.interval().position('time*sum').color('currency');
    this.chartIncome.render();
    this.chartIncome.interaction('active-region');
  }

  async refreshRequests() {
    const result = await firstValueFrom(
      this.requestsChartGQL.fetch({
        timeframe: this.chartTimeOptions[this.requestMode].value,
      })
    );
    this.isChartRequestsEmpty = result.data.requestChart.length == 0;
    if (this.isChartRequestsEmpty) {
      this.chartRequests.clear();
      return;
    }
    const timeFormat = this.getTimeFormatForQuery(
      this.chartTimeOptions[this.requestMode].value
    );
    result.data.requestChart.forEach((result) => {
      result.time = formatDate(result.time, timeFormat, this.locale);
      result.count = parseFloat(result.count.toString());
      result.status = this.translateService.instant(
        `enum.request.${result.status}`
      );
    });
    this.chartRequests.data(result.data.requestChart);
    this.chartRequests
      .interval()
      .adjust('stack')
      .position('time*count')
      .color('status');
    this.chartRequests.render();
    this.chartRequests.interaction('active-region');
  }

  async refreshDriverRegistrations() {
    const result = await firstValueFrom(
      this.driverRegistrationsChartGQL.fetch({
        timeframe: this.chartTimeOptions[this.driverRegistrationsMode].value,
      })
    );
    this.isChartDriverRegistrationsEmpty =
      result.data.driverRegistrations.length == 0;
    if (this.isChartDriverRegistrationsEmpty) {
      this.chartDriverRegistrations.clear();
      return;
    }
    const timeFormat = this.getTimeFormatForQuery(
      this.chartTimeOptions[this.driverRegistrationsMode].value
    );
    result.data.driverRegistrations.forEach((result) => {
      result.time = formatDate(result.time, timeFormat, this.locale);
      result.count = parseFloat(result.count.toString());
    });
    this.chartDriverRegistrations.data(result.data.driverRegistrations);
    this.chartDriverRegistrations
      .interval()
      .position('time*count')
      .color('count', ['red', 'orange', 'green']);
    this.chartDriverRegistrations.render();
    this.chartDriverRegistrations.interaction('active-region');
  }

  async refreshRiderRegistrations() {
    const result = await firstValueFrom(
      this.riderRegistrationsChartGQL.fetch({
        timeframe: this.chartTimeOptions[this.riderRegistrationsMode].value,
      })
    );
    this.isChartRiderRegistrationsEmpty =
      result.data.riderRegistrations.length == 0;
    if (this.isChartRiderRegistrationsEmpty) {
      this.chartRiderRegistrations.clear();
      return;
    }
    const timeFormat = this.getTimeFormatForQuery(
      this.chartTimeOptions[this.riderRegistrationsMode].value
    );
    result.data.riderRegistrations.forEach((result) => {
      result.time = formatDate(result.time, timeFormat, this.locale);
      result.count = parseFloat(result.count.toString());
    });
    this.chartRiderRegistrations.data(result.data.riderRegistrations);
    this.chartRiderRegistrations
      .interval()
      .position('time*count')
      .color('count', ['red', 'orange', 'green']);
    this.chartRiderRegistrations.render();
    this.chartRiderRegistrations.interaction('active-region');
  }

  getTimeFormatForQuery(q: ChartTimeframe): string {
    switch (q) {
      case ChartTimeframe.Daily:
        return 'h"';
      case ChartTimeframe.Weekly:
        return 'W,y';
      case ChartTimeframe.Monthly:
        return 'M/d';
      case ChartTimeframe.Yearly:
        return 'MMM y';
    }
  }

  onChartRequestsInit(chartInstance: Chart): void {
    this.chartRequests = chartInstance;
  }

  onChartIncomeInit(chartInstance: Chart): void {
    this.chartIncome = chartInstance;
  }

  onChartDriverRegistrationsInit(chartInstance: Chart): void {
    this.chartDriverRegistrations = chartInstance;
  }

  onChartRiderRegistrationsInit(chartInstance: Chart): void {
    this.chartRiderRegistrations = chartInstance;
  }
}
