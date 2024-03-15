import { Injectable } from '@angular/core';
import data from '../common/data.json';
@Injectable({
  providedIn: 'root',
})
export class ChatAnalysisService {
  constructor() {}
  // Function to fetch and parse JSON data using async/await
  fetchData() {
    try {
      return this.processJSONData(data);
    } catch (error) {
      // Handle errors
      console.error('There was a problem fetching the data:', error);
    }
  }

  // Function to process JSON data
  processJSONData(data: any) {
    const currentDate = new Date();
    const last12MonthsDate = new Date();
    last12MonthsDate.setMonth(currentDate.getMonth() - 12);

    const filteredData = data.filter((item: any) => {
      return (
        (item.MonthID - 1 >= last12MonthsDate.getMonth() &&
          item.YearID == last12MonthsDate.getFullYear()) ||
        (item.MonthID - 1 <= currentDate.getMonth() &&
          item.YearID == currentDate.getFullYear())
      );
    });
    const groupedData: any = {};

    filteredData
      .sort((item1: any, item2: any) => item1.MonthID - item2.MonthID)
      .forEach((item: any) => {
        const { CompanyName, YearID, MonthID } = item;
        if (!groupedData[CompanyName]) {
          groupedData[CompanyName] = {};
        }
        if (!groupedData[CompanyName][YearID]) {
          groupedData[CompanyName][YearID] = {};
        }
        if (!groupedData[CompanyName][YearID][MonthID]) {
          groupedData[CompanyName][YearID][MonthID] = {
            totalExpenses: item.TotalExpenses,
            totalIncome: item.TotalIncome,
            costofSales: item.CostofSales,
            ignoreException: item.IgnoreException,
            profit: item.TotalIncome - item.TotalExpenses,
            incomeRate: null,
            profitRate: null,
            revenueSurge: false,
            profitDrop: false,
            identical: false,
          };
          if (groupedData[CompanyName][YearID][MonthID - 1]) {
            if (groupedData[CompanyName][YearID][MonthID - 1].totalIncome) {
              groupedData[CompanyName][YearID][MonthID].incomeRate =
                (groupedData[CompanyName][YearID][MonthID].totalIncome -
                  groupedData[CompanyName][YearID][MonthID - 1].totalIncome) /
                Math.abs(
                  groupedData[CompanyName][YearID][MonthID - 1].totalIncome
                );
              if (groupedData[CompanyName][YearID][MonthID].incomeRate > 3)
                groupedData[CompanyName][YearID][MonthID].revenueSurge = true;
            }
            if (groupedData[CompanyName][YearID][MonthID - 1].profit) {
              groupedData[CompanyName][YearID][MonthID].profitRate =
                (groupedData[CompanyName][YearID][MonthID].profit -
                  groupedData[CompanyName][YearID][MonthID - 1].profit) /
                Math.abs(groupedData[CompanyName][YearID][MonthID - 1].profit);
              if (groupedData[CompanyName][YearID][MonthID].profitRate < -1)
                groupedData[CompanyName][YearID][MonthID].profitDrop = true;
            }
            if (
              groupedData[CompanyName][YearID][MonthID].incomeRate === 0 &&
              groupedData[CompanyName][YearID][MonthID].profitRate === 0
            ) {
              groupedData[CompanyName][YearID][MonthID].identical = true;
            }
          }
        }
      });
    console.log(groupedData);
    return groupedData;
  }
}
