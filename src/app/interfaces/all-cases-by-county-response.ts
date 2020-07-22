export interface AllCasesByCountyResponse {
  confirmed: {
    total: number,
    data: Array<any>
  };
  deaths: {
    total: number,
    data: Array<any>
  };
  healed: {
    total: number,
    data: Array<any>
  };
}
