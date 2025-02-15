from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Khởi động trình duyệt
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    # Lắng nghe tất cả các response
    def log_response(response):
        print("URL:", response.url)
        print("Status:", response.status)
        try:
            print("JSON Data:", response.json())
        except:
            print("Không phải JSON")
        print("-----")

    page.on("response", log_response)

    # Điều hướng đến trang web cần bắt API
    page.goto('https://shopee.vn/B%C3%A1ch-H%C3%B3a-Online-cat.11036525/')
    
    # Đợi trang tải đầy đủ
    page.wait_for_timeout(500000)
    browser.close()
