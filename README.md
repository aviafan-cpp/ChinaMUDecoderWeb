你是否遇到过，拍摄了一张中国动车组的车厢的照片，却难以从车厢号推测车型号的情况？

ChinaMUDecoderWeb（China Multiple Unit Decoder Web，中国动车组车号查询）是一款基于 Web 开发的**动车组车号查询软件**。  
软件可以通过**中国铁路动车组四位车号**反推回**中国铁路动车组型号**。  

代码由 AI 基于 C++ 版开发而来，但保证人工审核！

作者与信息
---
作者：一个飞友_cpp（aviafan-cpp）
[Bilibili](https://space.bilibili.com/3546620213857006)
[Github](https://github.com/aviafan-cpp) 
[Moegirlpedia](https://zh.moegirl.org.cn/User:AviaFanCpp)  
图形库：Raylib
[官网](https://raylib.com)
[Github](https://github.com/raysan5/raylib)

软件版本：W20261101  

C++ 版
---
[Github](https://github.com/aviafan-cpp/ChinaMUDecoder)  
W20261101 对应 20260608

数据库与编写
---
数据来源：[ChinaEMU](https://china-emu.cn)  

数据库格式：
```text
型号名 速度(km/h)(无符号整数) 车厢数(无符号整数) 命名 起始车号(无符号整数) 终止车号(无符号整数) 科普网址链接  
```
"-"命令（在某一区间删除子区间）：
```text
-型号名 起始车号(无符号整数) 终止车号(无符号整数)
```