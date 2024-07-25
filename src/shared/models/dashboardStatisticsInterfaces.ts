export interface IDashboardStatisticsResponseRoot {
  data: IDashboardStatisticsData;
  status: string;
}

export interface IDashboardStatisticsData {
  total_user: number;
  total_vendor: number;
  total_admin: number;
  total_product: number;
  total_transaction: number;
  transactions: IDashboardTransaction[];
}

export interface IDashboardTransaction {
  date: Date;
  total_transaction: number;
}
