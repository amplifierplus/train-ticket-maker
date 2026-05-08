# 火车票 DIY 生成器
## 本项目利用Vibe Coding实现，后续接入skills及更多利润票根、机票的生成

> 🚄 基于 Vue 3 + Tailwind CSS 的火车票生成工具

在线生成电子火车票样式图片的工具。支持实时预览、高清图导出、响应式设计和多种票务选项。

## 功能特点

| 功能 | 说明 |
|------|------|
| ✨ 实时预览 | 表单输入即时反映在车票预览上 |
| 📸 高清导出 | 3x pixelRatio 输出高质量 PNG 图片 |
| 📱 响应式设计 | 完美适配桌面端和移动端 |
| 🌙 深色模式 | 支持明暗主题切换 |
| 🚄 多座位类型 | 支持 13 种座位/铺位类型 |
| 🎫 优惠标识 | 支持 10 种优惠类型 |
| 🔀 动态表单 | 卧铺类型联动显示，智能表单校验 |
| 🆕 JM 编码生成 | 自动生成符合规则的底部售票编码 |
| 🎨 红蓝模板 | 蓝色高铁票/红色普速票两种完整模板 |

## 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 (Composition API) | 前端框架 |
| Vite | 构建工具 |
| Tailwind CSS | 原子化 CSS |
| html-to-image | HTML 转图片 |

## 安装与运行

```bash
npm install
npm run dev      # 开发模式
npm run build    # 构建打包
npm run preview  # 预览构建结果
```

## 项目结构

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

## Props 参数表

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
| seatType | String | '二等座' | 座位类型 |
| idNumber | String | '14041111985****0854' | 身份证号 |
| passengerName | String | '李小二' | 乘客姓名 |
| footerInfo | String | 'JM 编码' | 底部售票信息 |
| discountType | String/Array | '' | 优惠类型 |
| detailLines | String[] | ['仅供纪念...', '...'] | 虚线框文字 |
| style | String | 'blue' | 车票样式（blue/red） |

## 支持的座位类型

**座席**：一等座、二等座、商务座、特等座、无座、硬座、软座、新空调硬座、新空调软座  
**卧铺**：硬卧、软卧、动卧、高级软卧、一等卧、二等卧、新空调硬卧、新空调软卧

## 支持的优惠类型

学生票、儿童票、残疾军人票、残疾人票、老人优惠票、普通优惠票、团体票、务工团体票、学生团体票、积分兑换票

## JM 编码格式

```
{车站代码 5 位}{日期前缀 2 位}{序号 3 位}{日期后缀 4 位}{随机编码 7 位} JM
示例：65773300121002A000001JM
```

---

**文档**: [API.md](./API.md) | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | [COMMENTS_GUIDE.md](./COMMENTS_GUIDE.md)
