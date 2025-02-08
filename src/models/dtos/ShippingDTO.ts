export class ShippingInfoDTO {
     channel_id?: number;
     name?: number; // Ex: Nhanh, Hỏa tốc,...
 
     fee?: number;
     freeship?: boolean; // Miễn phí vận chuyển
     unsupport?: boolean; // Không hổ trợ
 
     estimated_delivery_date_from?: string; // timestamp
     estimated_delivery_date_to?: string; // timestamp
     delivery_text?: string; // Ex: Nhận từ 15 Th01 - 16 Th01
 
     is_fastest?: boolean;
 
     // constructor(data: Partial<ShippingDTO>) {
     //     this.channel_id = data.channel_id;
     //     this.name = data.name;
     //     this.fee = data.fee;
     //     this.freeship = data.freeship;
     //     this.unsupport = data.unsupport;
     //     this.estimated_delivery_date_from = data.estimated_delivery_date_from;
     //     this.estimated_delivery_date_to = data.estimated_delivery_date_to;
     //     this.delivery_text = data.delivery_text;
     //     this.is_fastest = data.is_fastest;
     // }
 }