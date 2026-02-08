// Script để test địa chỉ trong browser console
// Copy và paste vào browser console trên trang /addresses

// Lấy user ID từ auth
const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
const userId = user.id || 'test-user-123';

console.log('User ID:', userId);

// Tạo địa chỉ test
const testAddresses = [
  {
    id: 'addr_1_' + Date.now(),
    userId: userId,
    fullName: 'Nguyễn Văn A',
    phone: '0912345678',
    province: 'Hà Nội',
    district: 'Ba Đình',
    ward: 'Phường Điện Biên',
    addressDetail: '123 Đường Điện Biên Phủ',
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'addr_2_' + Date.now(),
    userId: userId,
    fullName: 'Trần Thị B',
    phone: '0987654321',
    province: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    addressDetail: '456 Đường Nguyễn Huệ',
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Lưu vào localStorage
localStorage.setItem('user_addresses', JSON.stringify(testAddresses));

console.log('✅ Đã thêm 2 địa chỉ test:', testAddresses);
console.log('🔄 Reload trang để xem kết quả');
