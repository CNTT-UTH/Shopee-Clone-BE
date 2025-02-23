import json
import requests

header_request_raw = """accept:
application/json
accept-encoding:
gzip, deflate, br, zstd
accept-language:
vi,en-US;q=0.9,en;q=0.8
af-ac-enc-dat:
1977a311f251c22a
af-ac-enc-sz-token:
s++Fiu6DzZdPZBtRUYbK/A==|JNtnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbnmGJuxRxUh+ZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA=|VpOkJH6PENTHzM4v|08|3
content-type:
application/json
cookie:
_gcl_au=1.1.1161714145.1736220709; _QPWSDCXHZQA=55647dba-aebb-4cab-d6f4-b59a7d432946; REC7iLP4Q=562bf04e-e2e6-4ee2-a3c8-55fd64b81991; SPC_F=o2dp0nyVqRxMXeTz4yMqZ7w5whd4sEL2; REC_T_ID=eef290bc-cca7-11ef-8aec-9aa8bf446f17; _fbp=fb.1.1736220711315.6287039230294086; SPC_CLIENTID=bzJkcDBueVZxUnhNfjiewivukhyfnyoj; _hjSessionUser_868286=eyJpZCI6Ijg2MzA3NTMyLTVmZWQtNTgzNy1iM2FiLWI3ZjdhNGMzOTJjOCIsImNyZWF0ZWQiOjE3MzYyMjA5MDk3NDEsImV4aXN0aW5nIjp0cnVlfQ==; _fbc=fb.1.1736585923837.IwZXh0bgNhZW0CMTAAAR2uVQ05X_KM0pksKps6peqK8rT2hwjdoUzaE2yw-JFvA0o58gngn3DjEc8_aem_B6qxzktvPU0MAn9k0Ky4Ow; _ga_PN56VNNPQX=GS1.2.1736665373.1.0.1736665373.0.0.0; _gcl_gs=2.1.k1$i1737091654$u159024504; _gcl_aw=GCL.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; _gac_UA-61914164-6=1.1737091663.Cj0KCQiA-aK8BhCDARIsAL_-H9kpfmZ1NjU8yhojTc0Dp7Os3G3W68RXP-gP1az47UEgV6ybATjBOK4aAlaqEALw_wcB; SC_DFP=OfkltNGPLrgzLozJnashRnqqAvojkTLR; _ga_3XVGTY3603=GS1.1.1737213779.1.1.1737213802.37.0.0; language=vi; SPC_EC=.elM0c0ZWSzhpS1lsREhpV0+E9q4K7uAVnklHCQ7NB5JWG90PTlQewPOMB+58iEPk2ZAxhlKq3YC/pZXLtq5VmzgQoybbD/IoWwA54lV9dg0P9ZZ0Aw1yVFvKcVuq8jBQjFnJxAT5nBh4MldcecLR67hU923ksP5ti3oKbxJzSgHc9YtncGwFIdGCGn2NPfZkW6TFNefAbQ6AEa350Vt5uOB/6nT+hgX3cuTySKezpowUFQKCkUAceasfTO1MZANr; SPC_ST=.elM0c0ZWSzhpS1lsREhpV0+E9q4K7uAVnklHCQ7NB5JWG90PTlQewPOMB+58iEPk2ZAxhlKq3YC/pZXLtq5VmzgQoybbD/IoWwA54lV9dg0P9ZZ0Aw1yVFvKcVuq8jBQjFnJxAT5nBh4MldcecLR67hU923ksP5ti3oKbxJzSgHc9YtncGwFIdGCGn2NPfZkW6TFNefAbQ6AEa350Vt5uOB/6nT+hgX3cuTySKezpowUFQKCkUAceasfTO1MZANr; SPC_U=1038322000; SPC_R_T_ID=qgPPbkU5yLqVnO17kxMkCnnHHaZaCGPKgoMoaYNI7240ndd62UX4LGfgcAVX4U+y6v79K2QMPvz603KEcVRdVuFrs1lu5qr6Bf3IFjCiaI45Ufm5OI6h9eJJD9tG4TvNQIzhTIqUdsaPcfx3oWtXzhpP0RMPoRdvIfspDtW2fQA=; SPC_R_T_IV=ZkZGWVluQm5jY2UyU1p0Rw==; SPC_T_ID=qgPPbkU5yLqVnO17kxMkCnnHHaZaCGPKgoMoaYNI7240ndd62UX4LGfgcAVX4U+y6v79K2QMPvz603KEcVRdVuFrs1lu5qr6Bf3IFjCiaI45Ufm5OI6h9eJJD9tG4TvNQIzhTIqUdsaPcfx3oWtXzhpP0RMPoRdvIfspDtW2fQA=; SPC_T_IV=ZkZGWVluQm5jY2UyU1p0Rw==; SPC_SI=+xCsZwAAAABsZ3lEY3FFQ45sVgAAAAAAYXlXUmhhUWE=; SPC_SEC_SI=v1-QWFFcm5yaldUc09wZVhpZMI5WhDojru+Cy7sonS+u27XM7so3ZenqX5vz1xIyBEqTgs+jXY25cwqypTPyNdogfltZAnyY+ixHKCSsTD8EdE=; _gid=GA1.2.244989443.1740151330; __LOCALE__null=VN; csrftoken=c352fpcjlVc9WMy1SkqrRWMfQIRBR6f4; _sapid=1957eef3b58b69941c0a22f12a5db00c0726ada39e6a06fbd28964f2; SPC_IA=1; SPC_CDS_CHAT=8ab51581-f956-4c75-9d41-bcdb9f2e3afd; _hjSession_868286=eyJpZCI6ImE1MWU4MWUzLWE0OGItNDRmNy05OWM3LWNjNzM5NTBmMjcwOSIsImMiOjE3NDAyMDM1NDMyMTcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; AMP_TOKEN=%24NOT_FOUND; _ga=GA1.1.1959083943.1736220719; AC_CERT_D=U2FsdGVkX19OE26Hzkc+5ctRjSij77+D/0vhdR9UMvLcdIa5Ez9N0cUwx/mKbpE3G1N3hJ3H40qPYljgeXwcXJPV9bSrS8/X6JiNk6ztAuogPS7UXrGqpAeT8j9XrgPWwbmoImRATdIqxA8Ep2vxPq2I/JXCXS/v83tzq/ofZe1OCmBe5UeJshz6lf7d+SEDtK5nn6ozVwzlZuI6brQowQm9J5+ED/muiaCDzqOH56GK8XG1CP7dkfX/4HH80L9BIPIaYgUHobUPZn1Um6yRUzc2Qk4+cmBYZeF7ztBOb6Rlq3TfQmyLER6XrFaekNTOuR+8gkFgFA0afssmAIp2eWUO9GBUhyZv0FZe9AzOPDGsPCOKr288huZFAC062yXbBHli4yR2j217g2nRO68oIXDA+RYNbnG4WtniZ4BYDR96odvFvCrQKsw8iDKLC+FAbIirV82hfzlbf/RLV1UGngjCg9+HRzWRIS50XYuXaMf0kTo9ZOvY/eM0ShEo3zlBPvgVcUnFAY2ZJnXIM39kpD0g09VtIe/ayzlsGZng+wLZzpa5n3NsTGutD09ypOqx/TcUx5TkhWNyc9xXCo6gJcFrN2YFWPV4XKwW/Spd/1yT/5o4fSg1XhXh2YOEE93O/+QLLeVojSGhvUzfDcQX7VnytHvQQGsCoIAd0jONxWBqZEfxqo7P4UmaaFsq4Nx68EseOUb9yCvFGrRcP+8vqwYrwhVZDvCjbCgvkwK4uwg1/c7AskOY7JlCaQ+8eksUUiDnbIJiTnMdJWhdBF0O7zqM3CqFYI1i5OEBubXO9xVFYLiU8hJsBtKonn0UJoKf9tNj2SjDkRI2CPWl373HhjuUoT3rU7SHKdZlRUf82caushEg6Bsax8lDDvvtMxVD1xXIGGJKaJcUYXSQbDC/efqHQ8yxwT0x3J946KuBIZSONPA2z52HP/Jb9fm4x6QEYku+4b6KapjRG+gTk4k+G/6OYvNlZytFrla0TGKB9xPL/DAGYbKy/lft7yzt0ac8F/sbpoUQn0x+1myOGsB1izhvQy65OTggpPw2K4LKigx91q6eHV+PkBTxpYt69XquoCSugv7dayrGe1H4vCDoi6oHJy8zzxNmwNU6epFfXPQ=; _ga_4GPP1ZXG63=GS1.1.1740203542.35.1.1740205630.43.0.0; shopee_webUnique_ccd=s%2B%2BFiu6DzZdPZBtRUYbK%2FA%3D%3D%7CJNtnOv8spQh4V3FbwAxshpiRHMG0JmSkk9vlbnmGJuxRxUh%2BZSyGiK6Qs899Xlbb7wP2rUby6OfvCK1KhxA%3D%7CVpOkJH6PENTHzM4v%7C08%7C3; ds=de808fe1946ac3c895d735b11609873e
d-nonptcha-sync:
AAAGzAxBrDkAABUAACCTXgWDIF1gCYMBxwGLAAALCQHZAYYAAAsNAewBgwAACw0B/QF/AAALEwJHAW8AAAsXA2QBOAAACzkDgwEyAAALPAO5ASYAAAtGA/IBGQAAC1AEBQEUAAALUwQjAQ0AAAtcBC8BCQAAC18ENQEIAAALYAQ7AQYAAAtiBEYBAwAAC2cETgEBAAALaQRwAPcAAA/yBHIA9wAAEBoDpgFdAAAYRQNaAYAAABhOAuoBsQAAGFc=
priority:
u=1, i
referer:
https://shopee.vn/anlene_officialstore
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
x-csrftoken:
c352fpcjlVc9WMy1SkqrRWMfQIRBR6f4
x-requested-with:
XMLHttpRequest
x-sap-ri:
456eb967648171198335cd3a0501a1bae130cd614895b37028b1
x-sap-sec:
5sDTwL6r/S7WB5tvMSLvM5PvtSLQMEevmS2sMkGvPS2EMshvK12fM5GvW1LyMI8v+SLDMkevFS2/MphvB10vMpLvra0YMItvF1LjMIGvcSK7MSLvRS0lMsgvoSLkMrtvF72DMSgvQaLFMehv6a0bMotvi1LfMetv910GMJ8vOSLEMrhvfSKlMJGv3SLIMEUvYa2CMhGv4SKBMJJvgSK5MsLvKaKKM5PvMSLvMOyFiv9fVrhvMS0MIKe0MSLvpu0apZGd870XmXLl212UB04DDLQPMS6ughGVMSLKw/kp8RMvmO9DYLF3XIvPX/K4m7LvMhnxMaLvMS2v7ZhVMSLohaixalnHF7aKh04w75zXMS0kGCSyq1UvMIpjCScvMJIhMFZ6GGS7pSLvMONcwPEsMaLvMS29v/LVMS2Oy74JKS3vMPG1MSKD870tWa1YHLtVMS0B4+CA5ScvMSLvMECb4iemMS0neHtVMSLvO5wtbSMvMSLvaCPHpQnYda9wlNFo3fGSV+rDBSLvMpAP9Gy8MSLvBcyE2HreH4L0kOjqBWtBF0bQfLRHdjftiS0MCuK8aaYLCOBwd4tP+sFRdnjI/qfFuls6E2vFm2MEkIy3jW8Z9mqKvM6/IDMAuJK3tXuEJdnpu9tEdMaesNavBBUqXsZ6orSwDScnioiuJzjf6gmucJYuvIvW1BgEFdFH4X/mq5D9kNLVauEnGsJkzAXAV3mILaMzDYFgGZL+N7nTt7Vz+cVxiO7Nr+bWIyXtQj6Z9pisxgB8PW/AsHc8a2gi3hk7DIUDGOIOkkJZCCe6pSLvMJ8UMSLpTbu25W4rneRBXB8zS5GNmnEpAT14rxiSdBc1cZNPwU3zyDdNKQ48VXyH44ic6bAIuYn9R7h3Zz1GZZfvmt/0enpvprXsEGHR8kOxFgDC+MWbriyVJWLwNZatbbVoQ/yLdjRjhOFhPPWrgnyEZB5lg+1JVeJozpWyDkVLXckMaSIoEWoTSEYcVK8yEqJqURJMxmV5PcQdLMCVmZKL8qFxIQ6S63xyNmBcuHyRftT0/pxNyVnabzzTGxrSKySs40v/UGI8Fe6EJTyEDOFiCXcqj9W2Yio5SJuzt8QMt6VcynMb5YmMSfiI8W+lqmLWp50K9KRuiIWZoje+34M35diX0egblObBuRwyMo0HQkg7igAVJg8vyTXfLcVw0tjpElZMYq1FHC97CIt0NuYyEeSSsnoGGx1Z3qeRoW/btLAvSc2OfNkDk0RRtEChHJ5ghAtRWIKI6iFYge9w2lpwEo/pkXxqdPpAUr1/xJ1IBvGWbQYDuZe764mWDDcBwrzfQjHpcSZSq/C8s7kMUfzsJYiJrxSYdnYGxOh7v7oupergDhszyTdCr9AbI0r4MO1Y0Ik5B+YOcVTPDt1FAp/IraLvBSLvMI1DtCPDMSLvadoVwSQ9/zg1MSLvGfLvMShvMS2CDS/BMSLvMSMvMS2kUaLvKSLvMkz9OGGlUQ+tDdta0VucU508i2geRD5EiAVtOx/9vD0q8rnu2SLvMSLFMSLvjjelp0Y3uXHYMSLvQaLvMhXhWMUDgItA8rLsy4BrVFJPIZUjwjdnMSGvMSKss3Is3ZhKh7LvMSLDMSLvVJv2R/VCWIcuMSLvlXMV60qQwSK=
x-shopee-language:
vi
x-sz-sdk-version:
1.12.15"""

URL = "https://shopee.vn/api/v4/shop/get_shop_base?entry_point=&need_cancel_rate=true&request_source=shop_home_page&username=anlene_officialstore&version=2"
shopid=330892387
FILENAME = f"crawl//shop//{shopid}.json"
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