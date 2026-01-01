<template>
  <div class="analytics-view">
    <div class="page-header">
      <h1 class="page-title">Thống kê</h1>
      <p class="page-description">
        Theo dõi các chỉ số và phân tích hiệu suất của hệ thống
      </p>
    </div>

    <div class="stats-grid">
      <n-card class="stat-card" title="Tổng số đơn hàng">
        <div class="stat-value">1,234</div>
        <div class="stat-change positive">+12% từ tháng trước</div>
      </n-card>

      <n-card class="stat-card" title="Doanh thu">
        <div class="stat-value">₫2,567,890</div>
        <div class="stat-change positive">+8.5% từ tháng trước</div>
      </n-card>

      <n-card class="stat-card" title="Số lượng sản phẩm">
        <div class="stat-value">456</div>
        <div class="stat-change negative">-2% từ tháng trước</div>
      </n-card>

      <n-card class="stat-card" title="Khách hàng mới">
        <div class="stat-value">89</div>
        <div class="stat-change positive">+15% từ tháng trước</div>
      </n-card>
    </div>

    <div class="charts-section">
      <n-card title="Biểu đồ doanh thu theo tháng" class="chart-card">
        <div class="chart-placeholder">
          <n-empty description="Biểu đồ sẽ được hiển thị ở đây">
            <template #icon>
              <n-icon size="64">
                <BarChartOutline />
              </n-icon>
            </template>
          </n-empty>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard, NEmpty, NIcon } from 'naive-ui'
import { BarChartOutline } from '@vicons/ionicons5'
</script>

<style scoped>
.analytics-view {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--n-text-color);
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 16px;
  color: var(--n-text-color-2);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--n-primary-color);
  margin: 16px 0 8px 0;
}

.stat-change {
  font-size: 14px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.charts-section {
  margin-top: 32px;
}

.chart-card {
  width: 100%;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>