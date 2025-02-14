import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
# options.add_argument("--headless")  # Nếu bạn không cần giao diện đồ họa
options.add_argument('--disable-gpu')  # Tắt GPU acceleration

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

# # Kết nối với DevTools để bắt network requests
dev_tools = driver.execute_cdp_cmd('Network.enable', {})

def log_api_requests(request):
    if 'api' in request['url']:  # Có thể thay 'api' bằng từ khóa của API bạn cần tìm
        print(f"API Request: {request['url']}")

driver.request_interceptor = log_api_requests

# driver.get("https://google.com")
driver.get("https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-T%E1%BB%AD-cat.11036132")
# Tương tác với trang web để kích hoạt các API requests
time.sleep(100);


# driver.quit()