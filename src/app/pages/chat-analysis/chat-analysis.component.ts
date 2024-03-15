import { Component, OnInit } from '@angular/core';
import { ChatAnalysisService } from '../../services/chat-analysis.service';
import { CommonModule, NgFor } from '@angular/common';

interface TableHeader {
  years: Array<{
    title: string | number;
    colspan: number;
    monthsOfYear: Array<number>;
  }>;
  months: {
    titles: Array<string>;
  };
}

@Component({
  selector: 'app-chat-analysis',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './chat-analysis.component.html',
  styleUrl: './chat-analysis.component.css',
})
export class ChatAnalysisComponent implements OnInit {
  // Get the current date
  public currentDate = new Date();
  // Subtract 12 months from the current date
  public last12MonthsDate = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() - 12,
    this.currentDate.getDate()
  );
  public currentPage = 1;
  public itemPerPage = 10;
  public totalPage = 0;
  public renderKeys: string[] = [];
  public dataTable: any = {};
  public Object = Object;
  public tableHeader: TableHeader = {
    years: [],
    months: {
      titles: [],
    },
  };
  constructor(private chatAnalysisService: ChatAnalysisService) {}

  ngOnInit(): void {
    this.dataTable = this.chatAnalysisService.fetchData();
    this.totalPage = Math.ceil(
      Object.keys(this.dataTable).length / this.itemPerPage
    );
    this.calculateHeader();
    this.renderPageNumber(1);
  }

  calculateHeader() {
    let lastYearStartMonth = this.last12MonthsDate.getMonth();
    let currentYearEndMonth = this.currentDate.getMonth();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.tableHeader.years = [
      {
        title: this.last12MonthsDate.getFullYear(),
        colspan: (12 - lastYearStartMonth) * 2,
        monthsOfYear: [],
      },
      {
        title: this.currentDate.getFullYear(),
        colspan: (currentYearEndMonth + 1) * 2,
        monthsOfYear: [],
      },
    ];

    this.tableHeader.months.titles = [
      ...[...monthNames].splice(lastYearStartMonth, 12 - lastYearStartMonth),
      ...[...monthNames].splice(0, currentYearEndMonth + 1),
    ];
    for (let i = lastYearStartMonth; i <= 11; i++) {
      this.tableHeader.years[0].monthsOfYear.push(i + 1);
    }
    for (let i = 0; i <= currentYearEndMonth; i++) {
      this.tableHeader.years[1].monthsOfYear.push(i + 1);
    }
  }

  renderPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.renderKeys = Object.keys(this.dataTable).splice(
      (pageNumber - 1) * 10,
      this.itemPerPage
    );
  }
}
