import { UserDTO } from "./UserDTO";

export class ShopDTO {
    shopid?: string;
    account?: UserDTO;
    description?: string;
    name?: string;
    status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Khóa shop
    rating_star?: number; // số sao trung bình
    total_rating?: number; // tổng số lượt đánh giá
    item_count?: number;
    response_rate?: number; // tỉ lệ phản hồi
    response_time?: number; // tốc độ phản hồi trung bình (tính bằng giây)
    follower_count?: number;
    cover_picture_url?: string;
    last_time_active?: number; // timestamp
    created_at?: number; // timestamp
}
