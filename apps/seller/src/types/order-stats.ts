export interface OrderStats {
  totalOrders: number;
  pendingConfirmation: number;
  processing: number;
  shipping: number;
  completed: number;
  cancelled: number;
  returns: number;
  totalRevenue: number;
}

export interface OrderStatsResponse {
  totalOrders: number;
  statusCounts: {
    CREATED: number;
    CONFIRMED: number;
    PICKED_UP: number;
    SHIPPED: number;
    DELIVERED: number;
    CANCELLED: number;
    REFUNDED: number;
    UNCONFIRMED: number;
  };
  totalRevenue: number;
}
