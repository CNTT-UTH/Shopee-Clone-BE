import json
import requests

header_request_raw = """accept:
*/*
accept-encoding:
gzip, deflate, br, zstd
accept-language:
vi,en-US;q=0.9,en;q=0.8
af-ac-enc-dat:
80458cdb2417ad7e
af-ac-enc-sz-token:
DrM9b4Sk8Z+6WP2aRlBaJQ==|X9tnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbuxdqcdRxUh+ZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA=|VpOkJH6PENTHzM4v|08|3
cookie:
_gcl_au=1.1.1161714145.1736220709; _QPWSDCXHZQA=55647dba-aebb-4cab-d6f4-b59a7d432946; REC7iLP4Q=562bf04e-e2e6-4ee2-a3c8-55fd64b81991; SPC_F=o2dp0nyVqRxMXeTz4yMqZ7w5whd4sEL2; REC_T_ID=eef290bc-cca7-11ef-8aec-9aa8bf446f17; _fbp=fb.1.1736220711315.6287039230294086; SPC_CLIENTID=bzJkcDBueVZxUnhNfjiewivukhyfnyoj; _hjSessionUser_868286=eyJpZCI6Ijg2MzA3NTMyLTVmZWQtNTgzNy1iM2FiLWI3ZjdhNGMzOTJjOCIsImNyZWF0ZWQiOjE3MzYyMjA5MDk3NDEsImV4aXN0aW5nIjp0cnVlfQ==; _fbc=fb.1.1736585923837.IwZXh0bgNhZW0CMTAAAR2uVQ05X_KM0pksKps6peqK8rT2hwjdoUzaE2yw-JFvA0o58gngn3DjEc8_aem_B6qxzktvPU0MAn9k0Ky4Ow; _ga_PN56VNNPQX=GS1.2.1736665373.1.0.1736665373.0.0.0; _gcl_gs=2.1.k1$i1737091654$u159024504; _gcl_aw=GCL.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; _gac_UA-61914164-6=1.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; SC_DFP=OfkltNGPLrgzLozJnashRnqqAvojkTLR; _ga_3XVGTY3603=GS1.1.1737213779.1.1.1737213802.37.0.0; SPC_EC=.ZU5kaEVkbUROYVZWRFF6cs11gp7399D8zzy565VaC8BEa7/b7r2bLz6wZ/V+8Amc/FP1oVpPb4SXwwEeeQKS02w4fLVH8xkPxdeLv3AzaGmoYr/cOd/THHXk4xChgKAVSMmDVrunWxTRtvHYdlgFojyH0zsL79Asd55I24O3CxMLCX8Xi74m+fiKrXcF92rc/Z1g4Pwq7onYhQxOOuN8XO5QR6QKoeewzHxllmz3C9bpDI4aw/UKl2QKrNYHOYuS; SPC_ST=.ZU5kaEVkbUROYVZWRFF6cs11gp7399D8zzy565VaC8BEa7/b7r2bLz6wZ/V+8Amc/FP1oVpPb4SXwwEeeQKS02w4fLVH8xkPxdeLv3AzaGmoYr/cOd/THHXk4xChgKAVSMmDVrunWxTRtvHYdlgFojyH0zsL79Asd55I24O3CxMLCX8Xi74m+fiKrXcF92rc/Z1g4Pwq7onYhQxOOuN8XO5QR6QKoeewzHxllmz3C9bpDI4aw/UKl2QKrNYHOYuS; SPC_U=1038322000; SPC_R_T_ID=4/R8Kkb+eczxuQ9ZtpFgAuC9gzw1yHGTumkQCXr3z0JwctYiLfc8+3GAJFyr39Gae0iI9lvK0BfXIYrh+SF4VheNscCJulSMYQPZOb4ZMk7fpk8vH+7Ck5DkaOdAguMMS3Of0BTd33OB30F0f1OBskEcRf6Cxlb6KkQMGclFa1k=; SPC_R_T_IV=ODhEelNmbGVacVJiQWhKWg==; SPC_T_ID=4/R8Kkb+eczxuQ9ZtpFgAuC9gzw1yHGTumkQCXr3z0JwctYiLfc8+3GAJFyr39Gae0iI9lvK0BfXIYrh+SF4VheNscCJulSMYQPZOb4ZMk7fpk8vH+7Ck5DkaOdAguMMS3Of0BTd33OB30F0f1OBskEcRf6Cxlb6KkQMGclFa1k=; SPC_T_IV=ODhEelNmbGVacVJiQWhKWg==; SPC_SI=CxGsZwAAAABFM3pUMDhqVju4DQAAAAAATHZVeHdSUUw=; _gid=GA1.2.615851771.1739506603; language=vi; __LOCALE__null=VN; csrftoken=V52RbPacK5ApIpGg86I7RDn474ynJe9B; SPC_SEC_SI=v1-S3FmVlRoVllSRmFXTHp6YbJOn7xENVtro/YeF21a5DtuHWhsOZ0YpxUmbaWcJyHufNZh688O2pGdLxsJ/NtLx0DIYs7dE5Yhj6DHfyhnRL4=; _sapid=1957eef3b58b69941c0a22f12a5db00c0726ada39e6a06fbd28964f2; SPC_IA=1; SPC_CDS_CHAT=e283d7cc-cd05-42aa-bb29-fff9c129080c; _hjSession_868286=eyJpZCI6ImVjNDBjMmU1LTI0NjUtNGJjNC04ODdhLWI5Y2E2NTMyODY3NiIsImMiOjE3Mzk1OTMzODY5NTgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; AMP_TOKEN=%24NOT_FOUND; AC_CERT_D=U2FsdGVkX1+coFYJJl+88Ro7sYolrLg49iGyay81Q1pH6t3FEsTnoNqXW+JQqPVbv5nw4BJlnppxRRUw085WjZQu1DkmAEzq+oaPKKqdA/IgZNIjXCEzUSZaV1bpnzaSIscm/gl5Z5EvFKKZxue0I2075OOZ4l58Kd4EQHBGOg3drqirkZLu8+TS0QlFw0KE5ZIFL1oDyfUnAMsQMLq53Cju+9i9544/tjozxoP/g86daRti3yECXjEHbKFhHb7UnhxZz39jRFoxgo7BsA3OC7ggqnTbr4K/6KJaYUT8cwToxmsKb3DW/HqLpllkso/xLqg1qq55qOfrwWzsjmldqoVRyoFSN6N4Efypc2ZkfN2fxgmtgwYrP5B9I1b6D+pTKFPCRbfbAi6W5hNLn1wgEagVCy+RgnJ/+i/eBrLAQeK4NZvDUh+WlSAOJsioJ09Vc/riMispOaEAvk7Nj9mCTJpoYw79i4GFFtq1h0eQeaGU7LNXq5/RnSbXp4zwioevlmXdIr3vz0CeoFye5WfUTQNOa6Q3KjzSZqxMMd1VCIdtqPoU5WuFcdyZ19/D63y5dMcB97zYkT1iuEJwyN1W6x5cWBxn0EzbjdQRfTIpMBKtISaXXdjxgscXOiIAomCZuW+DuMsEQVgo9VjzkBBfYKBXHLhPzgZJ2P6vQM1vqAdFvnZrB9OepuV2D1qTIvxkKH2ZIW5NGYitT4wkBHUEYsUMXxs5F6kzuaKZStVCBd09Ze1swzn/YS0fOJ4wACapDnbujKbiMrOfzok/RLcphD78ZhcdUtAIT4AP2wEtKrz6IJRCDACIYt2VP8lETz7FdCrXZkPMsBeLEcDQJTPJ9gjHmrwz72WxOz7xeB1gi8iusI0qTLJMlBC4+XcYqCw07c/srO2ZqPHokKsYwQuXPyIyUTtY7M1ZI9NcbNeMFLuC5vPTfCgIjInjlrw/fG2Fl0TKrTvMjeWQZ8Rgeb5u/QzkwpAog+yufEw4ieKQoOzle0Q4ouu5x/HcvcapA9u1P3i3k0zE+0cNeqXhbWzrvu9ATxiO0xy9ZBJMrRI2c8I5GCQVMyF48cRii7qRF6FpyWQ9NeksZvAaORUcOjKPGV+1NcNsoyCwPz03bmhrWps=; _ga=GA1.1.1959083943.1736220719; _dc_gtm_UA-61914164-6=1; _ga_4GPP1ZXG63=GS1.1.1739593386.30.1.1739594420.32.0.0; shopee_webUnique_ccd=L3KWrtrBr3f89bTquWyxaQ%3D%3D%7CXNtnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbpBcmMdRxUh%2BZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA%3D%7CVpOkJH6PENTHzM4v%7C08%7C3; ds=6c0727a005c8340c4474f092c0e4fff1
if-none-match-:
55b03-151f9dce207e84fbb38dfa7bfdaee1a2
priority:
u=1, i
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
bb1ab06734cc9ad6ecaef33705015389ea3a62b2b7b21e210fe2
x-sap-sec:
GGY5xTTdsp6lIkCxJpKxJkBxZp0fJPfxjw0uJ4KxSpKSJrlx6p0qJ5KxypKpJHKxkw0xJkExupKKJsnxqu0DJoKxfp0AJhfxLpL2JOvxBpLIJHIxip2zJOKx+p07JHWx9pLOJPlxMpKoJ4Bx4w2CJkKx7pKlJEIx4u0pJHCxOpL/JoCxDp0KJrfx8uKwJhKxUp0BJhlxqpKhJSCxpp05J4Qx8uKxJpKxJsBxJrKrJp2XYlnaJpLlJwKxG2n5A2KxJkrKjL193ZI7cwKxO+G5Zi90JpKmv2044dNCJuKxPpQxJJVm3xfxJpKj/Qg3tpKxwAquwBTyac4o6B3QMV0vJpKxmpBxJpKxJrcX3apvbp/xJeXKJgKxJp0qWpQxJ4KZJp0lJwKx70nyXwKxQCVB/67XD17DXw0iTBW5V2KaApQxJokQaTAKJuKxJp2TAEo63kcQJwKxJpKxSR0NJp6YxrlpQpBxJOnHoPDxJpLuCeVmR4D3Y7GnJuKxJpKx8psxJpKlJpKxW+Ps4v6czRUAJ2Kxp51HN+pAH8ofs0h+pgBHr+ZW1womBSddk+wQ0h65loSwK0v6YfY51thlXd6TK+D8ulMJOiqa5Zwa0pov172kagJROpd3w5K0OMzRhKvCJ00QZmljABhIzhSdrpqNufzYeF68ZNbDikmegIQ1CANaWEFheNfkVPpAyYsUb9F2FNWLAchk9HyV4IzS8S1Yhhvj5SFAo9PalLCYHVSoZlP2ck47rhVpMcoIGPdXeiq3MCllADjz3ltGmky451zEjG2QGHPpAfFabd8tq5YZpygIMv++ZWTDW8iwMUCOEIXyO9djbdRRt7zAbIpIn8KyEG4QQOQC79gK0IFrf5KMm4WK676bkkav94JKfD+WECYWvDNaxiYNOjgX3J//+zQMqsOn3DVKPQTS1X3134wyXLus9FNOn8XJQ1iZCawgahnQH9qP3Lp8M+biqA7ArERpcYV2BGHnLZpQyobZSVQxIpKxJPlOB8oKJpKxqkmOCkb8UYGc/6jr5uPW9dE7mzPibfE6v7eTT84jefCMgM+d0qxi5UlHyphq/8ISTJpqZw6HJNNCf3JEX2ZDGLrjZRkuimL7iuTYfWINHCOZvY43P9BigpwJdl1zWP7VDPjUSwCtMTl6Ed9OXD7BLTFOeWIQa6CGWpaQQ8yyvNjCTExKOADAIKtFOwBcNKVqo6G4z4/anYnknMbxhnN2+XngX/ECJpKxK85MU2BxJpLzCuKx42KxJhoFDr/uvQ0lHk9CF0KxJpKaJpKx/ABxJosxJpLul5HuRDRkGEXlDkKijrwEBJNRX2KxJpKxJpKxJpKxJpxxJpL6mzHxclREyxWxJpKKJpKxeiYTg0RHu4DPXATwOfzdAtSADjCUvBinK+dTAHHsuTnQz9iZJpKxJElxJpLHcxIeQVUV33t0MC3R2SgohZPM7GmUoKUONehs7VFopEcEM3CsBncY3vJZ2EcQLeZ1RHUwhHgMMZmRp/PB3UJD63nI/SMIB3CRN1cJQZZzs13HpsxJNet73nJpMsMSB3MJsVF6o/tqLHFRRVCoMHeiBHG4dKho0sKI0sQxJpKxJpCxJpKvVgiEE9r9u2ExJpLuyAbAR2KxJpIxJpL8l42FRDirJs==
x-shopee-language:
vi
x-sz-sdk-version:
1.12.15"""

# cat_id=11035567
cat_id=11036525
URL = f"https://shopee.vn/api/v4/recommend/recommend?bundle=category_landing_page&cat_level=1&catid={cat_id}&limit=60&offset=0"
FILENAME = "crawl//rcm_category_landing_page.json"
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