import json
import requests

header_request_raw = """accept:
*/*
accept-encoding:
gzip, deflate, br, zstd
accept-language:
vi,en-US;q=0.9,en;q=0.8
af-ac-enc-dat:
1ecfb47a074992e9
af-ac-enc-sz-token:
oW4e1a0O+JEhGZnNHoCvdQ==|J9tnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbpyINOxRxUh+ZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA=|VpOkJH6PENTHzM4v|08|3
cookie:
_gcl_au=1.1.1161714145.1736220709; _QPWSDCXHZQA=55647dba-aebb-4cab-d6f4-b59a7d432946; REC7iLP4Q=562bf04e-e2e6-4ee2-a3c8-55fd64b81991; SPC_F=o2dp0nyVqRxMXeTz4yMqZ7w5whd4sEL2; REC_T_ID=eef290bc-cca7-11ef-8aec-9aa8bf446f17; _fbp=fb.1.1736220711315.6287039230294086; SPC_CLIENTID=bzJkcDBueVZxUnhNfjiewivukhyfnyoj; _hjSessionUser_868286=eyJpZCI6Ijg2MzA3NTMyLTVmZWQtNTgzNy1iM2FiLWI3ZjdhNGMzOTJjOCIsImNyZWF0ZWQiOjE3MzYyMjA5MDk3NDEsImV4aXN0aW5nIjp0cnVlfQ==; _fbc=fb.1.1736585923837.IwZXh0bgNhZW0CMTAAAR2uVQ05X_KM0pksKps6peqK8rT2hwjdoUzaE2yw-JFvA0o58gngn3DjEc8_aem_B6qxzktvPU0MAn9k0Ky4Ow; _ga_PN56VNNPQX=GS1.2.1736665373.1.0.1736665373.0.0.0; _gcl_gs=2.1.k1$i1737091654$u159024504; _gcl_aw=GCL.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; _gac_UA-61914164-6=1.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; SC_DFP=OfkltNGPLrgzLozJnashRnqqAvojkTLR; _ga_3XVGTY3603=GS1.1.1737213779.1.1.1737213802.37.0.0; language=vi; SPC_EC=.elM0c0ZWSzhpS1lsREhpV0+E9q4K7uAVnklHCQ7NB5JWG90PTlQewPOMB+58iEPk2ZAxhlKq3YC/pZXLtq5VmzgQoybbD/IoWwA54lV9dg0P9ZZ0Aw1yVFvKcVuq8jBQjFnJxAT5nBh4MldcecLR67hU923ksP5ti3oKbxJzSgHc9YtncGwFIdGCGn2NPfZkW6TFNefAbQ6AEa350Vt5uOB/6nT+hgX3cuTySKezpowUFQKCkUAceasfTO1MZANr; SPC_ST=.elM0c0ZWSzhpS1lsREhpV0+E9q4K7uAVnklHCQ7NB5JWG90PTlQewPOMB+58iEPk2ZAxhlKq3YC/pZXLtq5VmzgQoybbD/IoWwA54lV9dg0P9ZZ0Aw1yVFvKcVuq8jBQjFnJxAT5nBh4MldcecLR67hU923ksP5ti3oKbxJzSgHc9YtncGwFIdGCGn2NPfZkW6TFNefAbQ6AEa350Vt5uOB/6nT+hgX3cuTySKezpowUFQKCkUAceasfTO1MZANr; SPC_U=1038322000; SPC_R_T_ID=qgPPbkU5yLqVnO17kxMkCnnHHaZaCGPKgoMoaYNI7240ndd62UX4LGfgcAVX4U+y6v79K2QMPvz603KEcVRdVuFrs1lu5qr6Bf3IFjCiaI45Ufm5OI6h9eJJD9tG4TvNQIzhTIqUdsaPcfx3oWtXzhpP0RMPoRdvIfspDtW2fQA=; SPC_R_T_IV=ZkZGWVluQm5jY2UyU1p0Rw==; SPC_T_ID=qgPPbkU5yLqVnO17kxMkCnnHHaZaCGPKgoMoaYNI7240ndd62UX4LGfgcAVX4U+y6v79K2QMPvz603KEcVRdVuFrs1lu5qr6Bf3IFjCiaI45Ufm5OI6h9eJJD9tG4TvNQIzhTIqUdsaPcfx3oWtXzhpP0RMPoRdvIfspDtW2fQA=; SPC_T_IV=ZkZGWVluQm5jY2UyU1p0Rw==; SPC_SI=+xCsZwAAAABsZ3lEY3FFQ45sVgAAAAAAYXlXUmhhUWE=; SPC_SEC_SI=v1-QWFFcm5yaldUc09wZVhpZMI5WhDojru+Cy7sonS+u27XM7so3ZenqX5vz1xIyBEqTgs+jXY25cwqypTPyNdogfltZAnyY+ixHKCSsTD8EdE=; _gid=GA1.2.244989443.1740151330; __LOCALE__null=VN; csrftoken=c352fpcjlVc9WMy1SkqrRWMfQIRBR6f4; _sapid=1957eef3b58b69941c0a22f12a5db00c0726ada39e6a06fbd28964f2; SPC_IA=1; SPC_CDS_CHAT=8ab51581-f956-4c75-9d41-bcdb9f2e3afd; _hjSession_868286=eyJpZCI6ImE1MWU4MWUzLWE0OGItNDRmNy05OWM3LWNjNzM5NTBmMjcwOSIsImMiOjE3NDAyMDM1NDMyMTcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; AMP_TOKEN=%24NOT_FOUND; AC_CERT_D=U2FsdGVkX19xz50Ug/g3dLX2A+09JwTqe50IX2TYG6WoW1nzX9kY17SqoJ/HFzHpEjuNEQdkUlCKqbQlgRCut0r5DYirE57w7/GVQUkGWKcUvhfbw15t35QKXFrC279j1+kUXG0zJ/JBchqotKYV+sMi3Y9CbOaLGz8a6DkUEV39cMKTFBGqFck7DaA3F5+/i8hOSLRycWDQb4tv1AJsyyMwsTQtdsacUSXhmIwAg74yFPHRruOZyIvtPd/kzo+aiCc5P4fc7vT8+PJmvwS9wptgQ3kG0iio5jsQiOtWejgzy3a81ewU9OPE0FjEH59UskeVhNiWoo7/voD40byHaTAPKFx9xIsZ5e9h5pAxuynhMwDKVjQqtio+sMd6MSXbBbVACazPPuBTIpQT1betiuP0hIwMXxWo2OckHNJ5E22lgm9VBNvlDKKuSvukeFS1aCfcHEr7MGcYguldOZCzsZkHcBx3xg5DY6SB0pOzfV65VekCXe61nhdoB+FcXzyFp5KF3HokKG9HmCjFWRq+hNrMbedx5lDd+EROWiyIOpdPziSk9LSzavz54/IfnTAelvMGrZaCV7CcFPnPHXwZYQtZqhBYXpUatSRKtfK6G9gAdwQZRHcixjb2kL2AWjy1GqZcPoEek8Hj+W8x6QPNIyg64KNp9ODib7pM4+qdRz0PJ7rrG+yUPNZ7cd3Lnty8qu3r9aTLEdk8fMJGihVHMYJMIv38qSaPzVvCt/4aDctiwfWw74b6jysa0VCZ/uH8ffCK3BVvGMf4sFyy2cctesojg/B1dsS8iymZKhGONMEOMdFgk3PJzZdfT0znhw5NfRsKG/Kom4jA1+J0lwI/RrpKqgoorq3WwYYXH0Kw9EhB/tGZrAsgCemyhJ0u8b5sgcMsHqPG9glaMhYNLo6rdNg8NyutCrAcBbgwznj4vJv2hth+f9tclxOc763iC/rguMfMCUrFFZ5yxJMarE5tB9LRgV4Z1RswwUoZMyplRXuvLQSKsl8l64GaRAdtRRh9WOKdssFJlUgapYd0rpyeq7S5tHzKW3iZePHkFrboZUGh/YHKAvss4Q9YscAjaeb7lDJvd2E6fvW0rVEzjgiNGkRXP/B7U+Sc5+N41bd31Mo=; _ga_4GPP1ZXG63=GS1.1.1740203542.35.1.1740204389.60.0.0; _ga=GA1.1.1959083943.1736220719; shopee_webUnique_ccd=oW4e1a0O%2BJEhGZnNHoCvdQ%3D%3D%7CJ9tnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbpyINOxRxUh%2BZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA%3D%7CVpOkJH6PENTHzM4v%7C08%7C3; ds=c76b3023d80d413565e820f3f8b39885
if-none-match-:
55b03-36528ba20837d54a47169ce32bd7d02b
priority:
u=1, i
referer:
https://shopee.vn/B%C3%A1ch-H%C3%B3a-Online-cat.11036525
sec-ch-ua:
"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"
sec-ch-ua-mobile:
?0
sec-ch-ua-platform:
"Windows"
sec-fetch-dest:
empty
sec-fetch-mode:
cors
sec-fetch-site:
same-origin
user-agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0
x-api-source:
pc
x-requested-with:
XMLHttpRequest
x-sap-ri:
a769b967ab5081d48d5e56330501dfc8dbdb08fa690cb1debad9
x-sap-sec:
EJcQUJWEVi8XXwdX9iTX9waX0iD39yyXqiFz9YyXliD29gTXniTS9C0X5iA29zdXZiDQ9YTXCkAr9fYXbiT29fiX4iD59a4XiiDr9lyXu+Db9w4XN+TG9C7X8iTu9aiXdiDN9zyXX+FX9zTXfkFm9CdXd+Tx9C4XTiAM9iTXDiFw9lSXGiTe9bdXd9Du9iSXAkTq9gyXvkFf9ydXP+Tb9gdXM+Fy9waX9iTX9f8pgv+xQVyX9iT3bfN09iTXsutBsjP00iTVyUXjw9A8N0yn6goP9iXAoDdW9iFQOl/p9LqXyOMo28FMKviPW+9Pc+TX9G2A9kTX9iDXUO4W9iF4idvxxY+sJ7eyn9JMD6tX9iTSYCZKpd1X9lO3IiqX9mzAf3ZNkMB7CiTX9fWw0GHw9kTX9iA1RjyW9iAEeyKJDi9X9xd89iDH7x0kXfQZVcTW9iT/ZisuyiqX9iTX9xswZ0Nm9iTDyXTW9iTXr5s5hi1X9iTXZyGrsQQyca+zHjdDxsGkQY3DXiTX9iNv9CgA9iTXXTrMpfYa+7nhIj11cFJQ6Qqh5UxUDSg29K/TMDHCKKy49S4BE7JKFgSWXd1p8eYXVEqJ0w8EWzmk2rWoI2oaCLb9WOnD9A6/wMj2+6H8viUHQQCoNg0TUL393Oq+Syt8Nd10daJCTv6eqMO9rQom8+gfPGpGoKaWdfDUaExdVW7aVyMepROtvmcPM4oFg38Ihfgw81jM3diE+Tf8b4A1xATGOo2QnfwlxFpgS8EJce2zQGpe0w8BVXcmmZaPvgXcg8bpCL799iAUlLiNlBvODOJjt44f9z4lqIKS/lfqw2BdDAvnP1ogR2iqnUN8I4Ucu+REdNSuLZeKFg1SpfC3yyzfrI3jOGR0ZXS++zNfevVhITzjhPC/VH9Q7KV3eKvgMMUEcjyojr/bEqShM2WSGBmeYLIqrCWQFELI3tFAZ7TbavA0sFAFAV4qoMitKkuGzxaEJ/9qg51AbQTSQJjS14hln4T/L2ttskyVZIYfKohYe2aAd4lLX5XTlcEO5dDQW8IQUSGtUcsZK36AneJgj5eJfP8PDUhrsFrc9MGRVP4AKLB6K6EvC78nxr0zB9uytbfYDSA5aHHeLS6DLJG5fUo/LNKJievtIcnffBH5V9nkKJavciRIJcpdds4ysFasCciAfC+ZBHHCxoMqFCF/PY5niznMT0vNHDOSQ4fm2TZxQFNHuxLiIFsdiXnPTvteuisMzhIXjv31PdPBsv781Iok8VjkpgvN/CUUPzCcpiiAjAdK1neAD2lQi1s6CXpy3BZOzCDFdlINShih6JZW76g99i3kRSaRotTNlrSt2zVSYZcz4TzgG4gux4mnP6vVsIIuPj7k+GGpDxmiQvLyeVZKH7ZpC9TXXiTX9GDHu2Yu9iTXhd9mgqDTsA789iTXYa9X9iyX9iAl6TkB9iTX9i1X9iASd+TXuiTX9iIE8PYu0AYNAKNGY9QoXDiUhjVeWLwyx5/58I6Z2RiB9e+vwkTX9iTq9iTXfZzjuRJkFOAy9iTXD9TX9x6cbAWK+JfPsWXQ3Vnku8/fpz1TEfhtCf0X9iTD9iTXVD9N1MjJ19Tu9iTXvpd/zMBA1AaD9iTXzUunbRcpm9D=
x-shopee-language:
vi
x-sz-sdk-version:
1.12.15"""

# cat_id=11035567
cat_id=11036525
URL = f"https://shopee.vn/api/v4/recommend/recommend?bundle=category_landing_page&cat_level=1&catid={cat_id}&limit=60&offset=0"
FILENAME = f"crawl//product//{cat_id}.json"
header_request_raw_arr = header_request_raw.split("\n")
header_json = {}
for i in range(0, len(header_request_raw_arr)):
     if (i % 2 != 0):
          continue
     header_json[header_request_raw_arr[i][:-1]] = header_request_raw_arr[i + 1]

# print (header_json)
     

response = requests.get(URL, headers=header_json);
data = json.loads(response.content)
with open(FILENAME, "w") as f:
     f.write(json.dumps(data));
     
     
     
     
     
     
     
     
     
     
     
     
# https://shopee.vn/Th%E1%BB%9Di-Trang-N%E1%BB%AF-cat.11035639
# https://shopee.vn/%C4%90i%E1%BB%87n-Tho%E1%BA%A1i-Ph%E1%BB%A5-Ki%E1%BB%87n-cat.11036030
# https://shopee.vn/M%E1%BA%B9-B%C3%A9-cat.11036194
# https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-T%E1%BB%AD-cat.11036132
# https://shopee.vn/Nh%C3%A0-C%E1%BB%ADa-%C4%90%E1%BB%9Di-S%E1%BB%91ng-cat.11036670
# https://shopee.vn/M%C3%A1y-T%C3%ADnh-Laptop-cat.11035954
# https://shopee.vn/S%E1%BA%AFc-%C4%90%E1%BA%B9p-cat.11036279
# https://shopee.vn/M%C3%A1y-%E1%BA%A2nh-M%C3%A1y-Quay-Phim-cat.11036101
# https://shopee.vn/S%E1%BB%A9c-Kh%E1%BB%8Fe-cat.11036345
# https://shopee.vn/%C4%90%E1%BB%93ng-H%E1%BB%93-cat.11035788
# https://shopee.vn/Gi%C3%A0y-D%C3%A9p-N%E1%BB%AF-cat.11035825
# https://shopee.vn/Gi%C3%A0y-D%C3%A9p-Nam-cat.11035801
# https://shopee.vn/T%C3%BAi-V%C3%AD-N%E1%BB%AF-cat.11035761
# https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-Gia-D%E1%BB%A5ng-cat.11036971
# https://shopee.vn/Ph%E1%BB%A5-Ki%E1%BB%87n-Trang-S%E1%BB%A9c-N%E1%BB%AF-cat.11035853
# https://shopee.vn/Th%E1%BB%83-Thao-Du-L%E1%BB%8Bch-cat.11035478
# https://shopee.vn/B%C3%A1ch-H%C3%B3a-Online-cat.11036525
# https://shopee.vn/%C3%94-T%C3%B4-Xe-M%C3%A1y-Xe-%C4%90%E1%BA%A1p-cat.11036793
# https://shopee.vn/Nh%C3%A0-S%C3%A1ch-Online-cat.11036863
# https://shopee.vn/Balo-T%C3%BAi-V%C3%AD-Nam-cat.11035741
# https://shopee.vn/Th%E1%BB%9Di-Trang-Tr%E1%BA%BB-Em-cat.11036382
# https://shopee.vn/%C4%90%E1%BB%93-Ch%C6%A1i-cat.11036932
# https://shopee.vn/Gi%E1%BA%B7t-Gi%C5%A9-Ch%C4%83m-S%C3%B3c-Nh%C3%A0-C%E1%BB%ADa-cat.11036624
# https://shopee.vn/Ch%C4%83m-S%C3%B3c-Th%C3%BA-C%C6%B0ng-cat.11036478
# https://shopee.vn/Voucher-D%E1%BB%8Bch-V%E1%BB%A5-cat.11035898
# https://shopee.vn/D%E1%BB%A5ng-c%E1%BB%A5-v%C3%A0-thi%E1%BA%BFt-b%E1%BB%8B-ti%E1%BB%87n-%C3%ADch-cat.11116484