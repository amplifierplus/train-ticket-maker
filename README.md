# 火车票 DIY 生成器

> 🚄 基于 Vue 3 + Tailwind CSS 的火车票生成工具

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

在线生成电子火车票样式图片的工具。支持实时预览、高清图导出、响应式设计和多种票务选项。

---

## 📖 项目简介

本项目是一个火车票样式的 DIY 生成器，可以自定义车次、站点、座位等信息，生成逼真的火车票图片。

本项目采用 **Vibe Coding** 方式开发，使用 **Claude Code** 工具，由 **Qwen/Qwen3.5-397B-A17B** 模型辅助实现。

---

## ✨ 功能特点

| 功能 | 说明 |
|------|------|
| ✨ 实时预览 | 表单输入即时反映在车票预览上 |
| 📸 高清导出 | 3x pixelRatio 输出高质量 PNG 图片 |
| 📱 响应式设计 | 完美适配桌面端和移动端 |
| 🚄 多座位类型 | 支持 13 种座位/铺位类型 |
| 🎫 优惠标识 | 支持 10 种优惠类型 |
| 🔀 动态表单 | 卧铺类型联动显示，智能表单校验 |
| 🆕 JM 编码生成 | 自动生成符合规则的底部售票编码 |
| 🔄 手动刷新 | 点击按钮即可刷新随机编号 |
| 💰 退票费显示 | 可选显示"退票费"标识 |
| 🎨 红蓝模板 | 蓝色高铁票/红色普速票两种完整模板 |

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 (Composition API) | 前端框架 |
| Vite | 构建工具 |
| Tailwind CSS | 原子化 CSS |
| html-to-image | HTML 转图片 |

---

## 📦 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建打包
npm run build

# 预览构建结果
npm run preview
```

---

## 📁 项目结构

```
train-ticket-maker/
├── public/
│   ├── CRH-Dr3OhT7q.jpg   # 蓝色车票背景纹理
│   ├── bluebg.png          # 蓝色车票底图
│   └── redbg.png           # 红色车票底图
├── src/
│   ├── assets/
│   │   └── qrcode.png      # 二维码图片
│   ├── components/
│   │   └── TrainTicket.vue # 车票核心组件
│   └── views/
│       └── TrainTicketGengrate.vue # 主页面
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 📋 Props 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| serial | String | '192J093984' | 左上角票号 |
| gate | String | '8B' | 检票口（可为空） |
| fromStation | String | '上海虹桥' | 出发站 |
| fromPinyin | String | 'Shanghaihongqiao' | 出发站拼音 |
| toStation | String | '西安北' | 到达站 |
| toPinyin | String | "Xi'anbei" | 到达站拼音 |
| trainCode | String | 'G1925' | 车次 |
| dateTime | String | '2017-06-06 16:46' | 日期时间 |
| carriage | String | '03' | 车厢号 |
| seatNumber | String | '04D' | 座位号/铺位号 |
| berthType | String | '' | 铺位类型（上/中/下） |
| price | String | '239.0' | 票价 |
| hasRefundFee | Boolean | false | 是否显示退票费 |
| seatType | String | '二等座' | 座位类型 |
| idNumber | String | '14041111985****0854' | 身份证号 |
| passengerName | String | '李小二' | 乘客姓名 |
| footerInfo | String | 'JM 编码' | 底部售票信息 |
| discountType | String/Array | '' | 优惠类型 |
| detailLines | String[] | ['仅供纪念...', '...'] | 虚线框文字 |
| style | String | 'blue' | 车票样式（blue/red） |

---

## 🪑 支持的座位类型

**座席**：一等座、二等座、商务座、特等座、无座、硬座、软座、新空调硬座、新空调软座  
**卧铺**：硬卧、软卧、动卧、高级软卧、一等卧、二等卧、新空调硬卧、新空调软卧

---

## 🎟️ 支持的优惠类型

学生票、儿童票、残疾军人票、残疾人票、老人优惠票、普通优惠票、团体票、务工团体票、学生团体票、积分兑换票

---

## 🔢 JM 编码格式

```
{车站代码 5 位}{日期前缀 2 位}{序号 3 位}{日期后缀 4 位}{随机编码 7 位} JM
示例：65773300121002A000001JM
```

---

## ⚠️ 免责声明

**重要提示：本项目仅供学习和纪念使用！**

1. **学习目的**：本项目是一个Vibe Coding技术练习作品，用于学习以及收集车票纪念的实际应用。

2. **禁止商用**：严禁将本项目生成的图片用于任何商业用途或非法用途。

3. **禁止伪造**：严禁使用本项目生成虚假车票进行欺诈、逃票等违法行为。

4. **责任自负**：如因使用本项目产生的任何法律纠纷或损失，由使用者自行承担，本项目作者不承担任何责任。

5. **版权说明**：火车票样式版权归中国铁路总公司所有，本项目仅作为技术学习交流使用。

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- [API 文档](./API.md)
- [项目结构说明](./PROJECT_STRUCTURE.md)
- [注释规范指南](./COMMENTS_GUIDE.md)

---

<div align="center">

Vibe Coding + Claude Code + Qwen/Qwen3.5-397B-A17B

</div>
