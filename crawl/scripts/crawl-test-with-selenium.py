import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager


cookies = [{"name":"SPC_F","value":"rJ0rHalo3p9167eryL70xEYo3poO0DCQ","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_SEC_SI","value":"v1-a3l4UGVsT0x2UkxoVTFpNftlPGVgg6ylwMak3l2te252+9Fh3hXupeilNgHgURV/eCFKDD/F2bLbSNZ6oP/ZQ34r10/girvvPOWp3ZaBErw=","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_R_T_ID","value":"B9fNbAXtD7ryWWQSu3qKjIqbD5Iid0QFO+EGBzC0TYon4GZnnO5V1AnX/7hyWSmwM7XaLmyFpZ9/5SGkbb7HHChGnOiGRxj+K9vI1ieI3y5p+3LsvmnYjwxPDhKiUch4EK+oMiopieSJn6IvGE6sux3jtcrQc1/QLbMkk/SFhwM=","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_EC","value":".NkdNejNtVmlaRUlUVmRndgJWhgmGAwAdocjOtdYVxajU1WgKWiolTQbkDq+pu0NmLciUS+TJLoKmoZb5LgsHvc3FNjuBN3VDc8/zKbKSBWdhv8OCt22HTsaUoOrM8M0sMFP2btvfAwby9fQnsOgrLKj5eUOsgVjcf0APlypFPSddVLYibSfmAI456R1qvYxmf2wEEibpKmJI9LYdN0KsTeEE1mWVIxTiBRjx583Z6OEnmxkcUef+fpV0XLj8wZM/","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_SI","value":"EU9yZwAAAABiUmlkTGxzcx08BQAAAAAAdXZsclZYNXU=","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_R_T_IV","value":"MnBKekNBN0EweWpHd292Rw==","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_T_ID","value":"B9fNbAXtD7ryWWQSu3qKjIqbD5Iid0QFO+EGBzC0TYon4GZnnO5V1AnX/7hyWSmwM7XaLmyFpZ9/5SGkbb7HHChGnOiGRxj+K9vI1ieI3y5p+3LsvmnYjwxPDhKiUch4EK+oMiopieSJn6IvGE6sux3jtcrQc1/QLbMkk/SFhwM=","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_T_IV","value":"MnBKekNBN0EweWpHd292Rw==","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_CLIENTID","value":"ckowckhhbG8zcDkxfqfcgztddhhsuhfv","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_ST","value":".NkdNejNtVmlaRUlUVmRndgJWhgmGAwAdocjOtdYVxajU1WgKWiolTQbkDq+pu0NmLciUS+TJLoKmoZb5LgsHvc3FNjuBN3VDc8/zKbKSBWdhv8OCt22HTsaUoOrM8M0sMFP2btvfAwby9fQnsOgrLKj5eUOsgVjcf0APlypFPSddVLYibSfmAI456R1qvYxmf2wEEibpKmJI9LYdN0KsTeEE1mWVIxTiBRjx583Z6OEnmxkcUef+fpV0XLj8wZM/","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_SC_SESSION","value":"glQQIlWSkCi/+gye+VRxuaS6CCUwasTnW61d8xQNYOUni9jgckRLzwnJz7RVWZCQEjRnGDbQV2AWZk4px4uTZsX29qfe9Cv0rZteFyhMsxhz0CypaSlboDUGXNakcTihSDeGkzsucUYPlnWyVn8uf3m/BZ1EJbb+RdUaGmzuTmu+U6rdgRcJTEm3QNeIvfkw2rFjySDtiqyNUp7C9oHD3MQ==_1_1318389050","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_STK","value":"AL15ZjvI4lIMhAiSWMWH2FB6MNNdaAISnwZy8DIEOM0LBv5nX98mtti6qvi3fm07gmzkxljGk9uj6ZKKngjBKdWkqsVl4MAmvL0HTmfuncuQaiZM/7tu1Sn63Spug1EL6KO3EApPDEuSPaGqSP+mDdrOQxZ+AE4plFktq3TEaI8u6XC3ytq+RQ6k8oePCVO7mBZxCYMt+W1kOixyoFsIAHxRdzRp9OpVLVb4RIPD8s90B0+twA0Uoyx7SIqs9JL1iVwyLXvGyIb4WZb0kx8URx7WKMKNt0AyEGGzXt2/iJB+X3N/We3njFLQ4pjuZ0bs704j1HIxvQTO8oPYGscDxRzqHvMLQHEcDoAbnq482d6XBODrjbNaXMc6rm0tvnH7nLfTB1TpyGZ5Ft6O/hybRVRWkkllt846Mvz6oQXCpGc=","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"},{"name":"SPC_CDS","value":"971133b2-81d1-44ce-a0cc-e3d93428ccc6","domain":".shopee.vn","hostOnly":False,"path":"/","secure":True,"httpOnly":False,"sameSite":"no_restriction","session":False,"firstPartyDomain":"","partitionKey":"null","expirationDate":2282107372,"storeId":"null"}]




options = Options()
# options.add_argument("--headless")  # Nếu bạn không cần giao diện đồ họa
options.add_argument('--disable-gpu')  # Tắt GPU acceleration

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

# for cookie in cookies:
#     driver.add_cookie(cookie)
    
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