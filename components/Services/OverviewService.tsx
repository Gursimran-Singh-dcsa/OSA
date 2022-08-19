import retailersData from '../../public/data/topRetailers.json'
import { mockDrawerData } from "../../store/MockData/mockdrawerData";
import { mockedEddgieAllStars } from '../../store/MockData/mockeddgieAllStars';

export class Overviewservice {
  getKpiData = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          numberOfRegions: 25,
          numberOfRetailers: 69,
          numberOfBestPerformingStores: 450,
          numberOfStoresWithLargestGrowthPotential: 119,
          netSalesIncrement: "$50000",
          lastFiveVistsIncrement: "$75000",
          numberOftargetSKUs: 10,
          totalValueGaininEuros: 56987,
        });
      }, 1000);
    });
  };
  getTopRetailersData = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(retailersData);
      }, 1000);
    });
  };
  static getOSAAreachartData = (type: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ("weekly" === type) {
          resolve({
            target: 95,
            chartData: [
              {
                timeline: "20/2",
                "osa%": "70",
              },
              {
                timeline: "27/2",
                "osa%": "80",
              },
              {
                timeline: "6/3",
                "osa%": "90",
              },
              {
                timeline: "13/3",
                "osa%": "55",
              },
            ],
          });
        } else if ("monthly" === type) {
          resolve({
            target: 95,
            chartData: [
              {
                timeline: "feb 2022",
                "osa%": "71",
              },
              {
                timeline: "march 2022",
                "osa%": "60",
              },
              {
                timeline: "april 2022",
                "osa%": "88",
              },
              {
                timeline: "may 2022",
                "osa%": "55",
              },
            ],
          });
        } else {
          reject({});
        }
      });
    });
  };

  getDrawerData = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockDrawerData);
      }, 500);
    });
  };
  getRootCauseBreakUp = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            cause: "Store has not recieved the stock",
            valueInPercentage: 45
          },
          {
            cause: "Product available in store, shelf not replenished",
            valueInPercentage: 22
          },
          {
            cause: "PO not fulfilled due to logistics issue",
            valueInPercentage: 23
          },
          {
            cause: "other",
            valueInPercentage: 10
          },
        ])
      }, 500)
    })
  }
  getEddgieStars = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({data: mockedEddgieAllStars})
      }, 500)
    })
  }
}
