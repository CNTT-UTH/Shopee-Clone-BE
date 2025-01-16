export enum UserVerifyStatus {
    Unverified, // chưa xác thực email, mặc định = 0
    Verified, // đã xác thực email
    Banned, // bị khóa
}

export enum ShopVerifyStatus {
    Unverified, // chưa xác thực email, mặc định = 0
    Verified, // đã xác thực email
    Banned, // bị khóa
}

export enum OrderStatus {
    Ordered, // Đã đặt hàng, chờ thanh toán
    Payment_Confirmed, // Đã xác nhận phương thức thanh toán, chờ vận chuyển
    Shipped, // Đang vận chuyển, chờ nhận hàng
    Received, // Đã nhận hàng
}

export enum DeliveryStatus {
    Order_placed, // Đã nhận đơn
    Preparing_to_ship, // Chuẩn bị hàng
    In_transit, // Đang vận chuyển
    Deliveried, // Đã nhận hàng
}

export enum PaymentStatus {
    Pending, // Chờ thanh toán
    Success, // Đã thanh toán
}

export enum UserGender {
    Male,
    Female,
    Unknown,
}

export enum TokenType {
    AccessToken,
    RefreshToken,
    ForgotPasswordToken,
    EmailVerifyToken,
}

export enum Role {
    User,
    Admin,
}
