import { useState, useCallback } from 'react';
import { ordersApi, type GetOrdersParams } from '@/lib/api/orders';
import type {
  OrderListItemDTO,
  OrderDTO,
  PageResponse,
  ConfirmOrdersRequest,
  ConfirmOrdersResponse,
} from '@/types/order';

export interface UseOrdersResult {
  orders: OrderListItemDTO[];
  loading: boolean;
  error: Error | null;
  pageInfo: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  fetchOrders: (params: GetOrdersParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<OrderListItemDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pageInfo, setPageInfo] = useState<UseOrdersResult['pageInfo']>(null);
  const [lastParams, setLastParams] = useState<GetOrdersParams | null>(null);

  const fetchOrders = useCallback(async (params: GetOrdersParams) => {
    setLoading(true);
    setError(null);
    setLastParams(params);

    try {
      const response = await ordersApi.getOrders(params);
      setOrders(response.content);
      setPageInfo({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        currentPage: response.number,
        size: response.size,
        hasNext: !response.last,
        hasPrev: !response.first,
      });
    } catch (err) {
      setError(err as Error);
      setOrders([]);
      setPageInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    if (lastParams) {
      await fetchOrders(lastParams);
    }
  }, [lastParams, fetchOrders]);

  return {
    orders,
    loading,
    error,
    pageInfo,
    fetchOrders,
    refetch,
  };
}

export interface UseConfirmOrdersResult {
  confirmOrders: (orderIds: number[]) => Promise<ConfirmOrdersResponse>;
  loading: boolean;
  error: Error | null;
}

export function useConfirmOrders(): UseConfirmOrdersResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const confirmOrders = useCallback(async (orderIds: number[]) => {
    setLoading(true);
    setError(null);

    try {
      const request: ConfirmOrdersRequest = { orderIds };
      const response = await ordersApi.confirmOrders(request);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    confirmOrders,
    loading,
    error,
  };
}

export interface UseOrderDetailResult {
  order: OrderDTO | null;
  loading: boolean;
  error: Error | null;
  fetchOrder: (id: number) => Promise<void>;
}

export function useOrderDetail(): UseOrderDetailResult {
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrder = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ordersApi.getOrderById(id);
      setOrder(response);
    } catch (err) {
      setError(err as Error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    order,
    loading,
    error,
    fetchOrder,
  };
}

export interface UseOrderStatsResult {
  stats: {
    totalOrders: number;
    pendingConfirmation: number;
    processing: number;
    shipping: number;
    completed: number;
    cancelled: number;
    returns: number;
    totalRevenue: number;
  } | null;
  loading: boolean;
  error: Error | null;
  fetchStats: (userId: string, shopId?: string) => Promise<void>;
}

export function useOrderStats(): UseOrderStatsResult {
  const [stats, setStats] = useState<UseOrderStatsResult['stats']>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async (userId: string, shopId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ordersApi.getOrderStats(userId, shopId);
      setStats({
        totalOrders: response.totalOrders,
        pendingConfirmation: response.statusCounts.CREATED,
        processing: response.statusCounts.CONFIRMED + response.statusCounts.PICKED_UP,
        shipping: response.statusCounts.SHIPPED,
        completed: response.statusCounts.DELIVERED,
        cancelled: response.statusCounts.CANCELLED,
        returns: response.statusCounts.REFUNDED,
        totalRevenue: response.totalRevenue,
      });
    } catch (err) {
      setError(err as Error);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
}
