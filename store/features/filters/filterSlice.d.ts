export interface filterProps {
  businessGroups: Array<string>;
  region: Array<string>;
  country: Array<string>;
  products: Array<string>;
  retailers: Array<string>;
  allStores: Array<string>;
  timeRange: { startDate: string; endDate: string };
}
