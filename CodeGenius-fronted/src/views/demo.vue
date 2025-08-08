<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1 class="demo-title">Demo Page</h1>
      <div class="demo-actions">
        <button class="demo-button primary">创建</button>
        <button class="demo-button">刷新</button>
      </div>
    </div>
    
    <div class="demo-content">
      <div class="demo-card">
        <div class="card-header">
          <h3>数据概览</h3>
        </div>
        <div class="card-body">
          <div class="stat-grid">
            <div class="stat-item">
              <div class="stat-value">125</div>
              <div class="stat-label">总项目数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">48</div>
              <div class="stat-label">进行中</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">77</div>
              <div class="stat-label">已完成</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">12</div>
              <div class="stat-label">待审核</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="demo-card">
        <div class="card-header">
          <h3>数据列表</h3>
          <div class="search-box">
            <input type="text" placeholder="搜索..." class="search-input" />
            <button class="search-button">搜索</button>
          </div>
        </div>
        <div class="card-body">
          <div class="demo-table">
            <div class="table-header">
              <div class="table-cell">ID</div>
              <div class="table-cell">名称</div>
              <div class="table-cell">状态</div>
              <div class="table-cell">创建时间</div>
              <div class="table-cell">操作</div>
            </div>
            <div class="table-row">
              <div class="table-cell">001</div>
              <div class="table-cell">项目A</div>
              <div class="table-cell"><span class="status-tag success">已完成</span></div>
              <div class="table-cell">2023-06-15</div>
              <div class="table-cell">
                <a href="#" class="action-link">查看</a>
                <a href="#" class="action-link">编辑</a>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell">002</div>
              <div class="table-cell">项目B</div>
              <div class="table-cell"><span class="status-tag processing">进行中</span></div>
              <div class="table-cell">2023-07-22</div>
              <div class="table-cell">
                <a href="#" class="action-link">查看</a>
                <a href="#" class="action-link">编辑</a>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell">003</div>
              <div class="table-cell">项目C</div>
              <div class="table-cell"><span class="status-tag warning">待审核</span></div>
              <div class="table-cell">2023-08-05</div>
              <div class="table-cell">
                <a href="#" class="action-link">查看</a>
                <a href="#" class="action-link">编辑</a>
              </div>
            </div>
          </div>
          
          <div class="pagination">
            <a href="#" class="page-item">&lt;</a>
            <a href="#" class="page-item active">1</a>
            <a href="#" class="page-item">2</a>
            <a href="#" class="page-item">3</a>
            <a href="#" class="page-item">&gt;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  width: 100%;
  padding: 16px;
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.demo-title {
  margin: 0;
  font-size: 24px;
  color: #262626;
}

.demo-actions {
  display: flex;
  gap: 12px;
}

.demo-button {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.demo-button:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.demo-button.primary {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.demo-button.primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: #262626;
}

.card-body {
  padding: 24px;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-item {
  padding: 16px;
  text-align: center;
  background-color: #fafafa;
  border-radius: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #8c8c8c;
}

.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 200px;
}

.search-button {
  padding: 6px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.demo-table {
  width: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: flex;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 12px 16px;
  flex: 1;
  display: flex;
  align-items: center;
}

.table-header .table-cell {
  font-weight: 500;
  color: #262626;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.status-tag.processing {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: #1890ff;
}

.status-tag.warning {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  color: #faad14;
}

.action-link {
  color: #1890ff;
  text-decoration: none;
  margin-right: 8px;
}

.action-link:hover {
  color: #40a9ff;
  background-color: transparent;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 4px;
}

.page-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #262626;
  text-decoration: none;
}

.page-item:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.page-item.active {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .demo-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-input {
    flex: 1;
  }
  
  .table-header, .table-row {
    display: none;
  }
}
</style>
