---
id: MCU_USB
title: USB2.0协议
---

## 笔记
### USB的供电及速度，及模式笔记
![3D1](img/USB/biji1.jpg)
### USB协议和CAN总线一样属于差分信号
![3D1](img/USB/biji2.jpg)

### USB分层，对ｕｓｂ信号分为3层，Packet详解
![3D1](img/USB/biji3.jpg)

对于Transaction的最小单位是信号包
信号包分为5个内容:
![3D1](img/USB/pid.png)
![3D1](img/USB/adress.png)
![3D1](img/USB/zhenghao.png)
![3D1](img/USB/data.png)
信号包分为四种格式分别是
帧首包：
![3D1](img/USB/SOF_Packet.png)
令牌包：
![3D1](img/USB/token_Packet.png)
数据包：
![3D1](img/USB/data_Packet.png)
握手包：
![3D1](img/USB/Handshake_packet.png)

### Transaction详解
![3D1](img/USB/biji4.jpg)

抓包数据
![3D1](img/USB/Transaction.png)

![3D1](img/USB/ALL.png)

###　数据同步
![3D1](img/USB/data_PID_toggle.png)
