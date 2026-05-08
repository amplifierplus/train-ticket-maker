<!--
  @file TrainTicket.vue - 火车票展示组件
-->

<template>
  <div ref="wrapper" class="export-target">
    <div class="ticket-wrapper">
      <div
        class="ticket-container"
        :style="{
          transform: exporting ? 'none' : `scale(${scale})`,
          transformOrigin: 'top left',
          width: BASE_WIDTH + 'px',
          height: BASE_HEIGHT + 'px',
          backgroundImage: backgroundImage,
          backgroundColor: style === 'red' ? 'white' : 'transparent',
          backgroundBlendMode: 'normal',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'contain',
        }"
      >
        <div
          class="ticket relative text-[35px] w-full h-full rounded-[14px] overflow-hidden"
          :style="{
            padding: style === 'red' ? '50px 60px 0 60px' : '5px 60px 0 50px'
          }"
          role="img"
          aria-label="火车票"
        >

          <!-- 顶部栏：红色车票隐藏 -->
          <div class="topbar flex items-center justify-between tracking-[0.3px]" v-if="showHeader()">
            <div class="serial text-[#e35757] font-semibold">{{ serial }}</div>
            <div class="gate" v-if="gate">检票：{{ gate }}</div>
          </div>

          <div class="bgmain">
            <!-- 蓝色车票背景纹理 -->
            <div
              v-if="!isRed"
              class="absolute inset-0 z-[-2] opacity-5 bg-bottom bg-no-repeat bg-contain"
              :style="{ backgroundImage: 'url(./CRH-Dr3OhT7q.jpg)' }"
            ></div>

            <!-- 主信息：出发站 / 车次 / 到达站 -->
            <div class="grid grid-cols-[1fr_auto_1fr] gap-[10px] px-[0px_20px_0_20px] items-center">
              <div class="station flex flex-col from items-center">
                <div class="flex items-center flex-grow-0">
                  <div
                    class="station-name"
                    :class="{'two-char': fromStation.length === 2}"
                  >
                    {{ fromStation }}
                  </div>
                  <div class="big-fix px-[4px] py-[0px]">站</div>
                </div>
                <div class="pinyin ml-[10px] mt-[-10px] text-[26px]">{{ fromPinyin }}</div>
              </div>

              <!-- 中间列：车次 + 箭头 -->
              <div class="train-center flex flex-col items-center justify-center">
                <div class="train-code text-center text-[50px] leading-none pb-1">
                  {{ trainCode }}
                </div>
                <!-- CSS 箭头 -->
                <div class="arrow mt-[6px] relative h-3 w-full">
                  <div class="line h-[4px] bg-black w-full"></div>
                  <div class="arrow-head absolute right-0 top-[-7px] h-4 w-4 border-t-[4px] border-black rotate-45"></div>
                </div>
              </div>

              <div class="station to flex flex-col items-center">
                <div class="flex items-center flex-grow-0">
                  <div
                    class="station-name"
                    :class="{'two-char': toStation.length === 2}"
                  >
                    {{ toStation }}
                  </div>
                  <div class="big-fix px-[4px] py-[0px]">站</div>
                </div>
                <div class="pinyin ml-[10px] mt-[-10px] text-[26px]">{{ toPinyin }}</div>
              </div>
            </div>

            <!-- 第二行：时间 / 车厢座位 -->
            <div class="flex justify-between pr-[100px] mt-[-10px]">
              <div class="datetime">
                {{ dateTime.year }}<span class="small-fix text-[24px]">年</span>
                {{ dateTime.month }}<span class="small-fix text-[24px]">月</span>
                {{ dateTime.day }}<span class="small-fix text-[24px]">日</span>
                {{ dateTime.time }}<span class="small-fix text-[24px]">开</span>
              </div>
              
              <!-- ====================== 这里已修改 ====================== -->
              <div class="seat">
                {{ carriage }}<span class="small-fix text-[24px]">车</span>
                {{ seatNumber }}
                <!-- 只有不是“无座”时才显示“号”字 -->
                <span v-if="seatNumber !== '无座'" class="small-fix text-[24px]">号</span>
                <span v-if="berthType">{{ berthType }}</span>
                <span v-if="berthType" class="small-fix text-[24px]">铺</span>
              </div>
              <!-- ========================================================= -->

            </div>

            <!-- 价格和座位类型行：添加优惠标识 -->
            <div class="flex justify-between pr-[100px] items-center mt-[-10px]">
              <div>
                ￥{{ price }}<span class="text-[24px]">元</span>
              </div>
              <div>
                <span v-for="(text, index) in discountTexts" :key="index" class="discount-badge">{{ text }}</span>
              </div>
              <div class="seat flex items-center gap-[12px]">
                {{ seatType }}
              </div>
            </div>

            <p class="muted text-[30px]"><br></p>
            <p class="muted text-[30px]">仅供纪念使用</p>

            <!-- 详情与二维码 -->
            <div class="detail-area relative grid grid-cols-[1fr_170px] gap-[16px]">
              <div>
                <div class="code">{{ idNumber }} {{ passengerName }}</div>
                <!-- 虚线框 -->
                <div v-if="showHeader()" class="details text-[24px] text-center mt-[-6px]">
                  <p>报销凭证 遗失不补</p>
                  <p>退票改签时须交回车站</p>
                </div>
                <div v-else class="details text-[24px] text-center mt-[-6px]">
                  <p>买票请到 12306 发货请到 95306</p>
                  <p>中国铁路祝您旅途愉快</p>
                </div>
                <div class="footer-red" v-if="!showHeader()">
                  <div class="text-[30px]">{{ footerInfo }}</div>
                </div>
              </div>

              <!-- 二维码 -->
              <div class="qr self-end justify-self-end w-[148px] h-[148px] border-black p-[6px]" aria-hidden="true">
                <img src="@/assets/qrcode.png" alt="二维码" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- 底部出票信息 -->
          <div class="footer" v-if="showHeader()">
            <div class="px-[50px] text-[30px]">{{ footerInfo }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const validTypes = ['student', 'discount', 'child', 'elder', 'military', 'disabled', 'group', 'worker-group', 'student-group', '']

// 基础尺寸
const BASE_WIDTH = 856
const BASE_HEIGHT = 540

const wrapper = ref(null)
const scale = ref(1)
const exporting = ref(false)

// 自适应缩放
function updateScale() {
  if (wrapper.value) {
    const width = wrapper.value.clientWidth
    scale.value = width / BASE_WIDTH
  }
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

// Props 定义
const props = defineProps({
  serial: { type: String, default: '192J093984' },
  gate: { type: String, default: '8B' },
  fromStation: { type: String, default: '上海虹桥' },
  fromPinyin: { type: String, default: 'Shanghaihongqiao' },
  toStation: { type: String, default: '西安北' },
  toPinyin: { type: String, default: "Xi'anbei" },
  trainCode: { type: String, default: 'G1925' },
  dateTime: { type: String, default: '2017-06-06 16:46' },
  carriage: { type: String, default: '03' },
  seatNumber: { type: String, default: '04D' },
  berthType: { type: String, default: '' },
  price: { type: String, default: '239.0' },
  seatType: { type: String, default: '二等座' },
  idNumber: { type: String, default: '14041111985****0854' },
  passengerName: { type: String, default: '李小二' },
  footerInfo: { type: String, default: '65773311920607J093984 郑州东售' },
  discountType: {
    type: [String, Array],
    default: '',
    validator: (value) => {
      const validTypes = ['student', 'discount', 'child', 'elder', 'military', 'disabled', 'group', 'worker-group', 'student-group', '']
      if (Array.isArray(value)) {
        return value.every(item => validTypes.includes(item))
      }
      return validTypes.includes(value)
    }
  },
  style: { type: String, default: 'red', validator: (value) => ['blue', 'red'].includes(value) }
})

// 计算属性
const isRed = computed(() => props.style === 'red')

const backgroundImage = computed(() => {
  return props.style === 'red' ? "url('./redbg.png')" : "url('./bluebg.png')"
})

const showHeader = () => {
  return props.style !== 'red'
}

const dateTime = computed(() => ({
  year: props.dateTime.slice(0, 4),
  month: props.dateTime.slice(5, 7),
  day: props.dateTime.slice(8, 10),
  time: props.dateTime.slice(11)
}))

const discountTexts = computed(() => {
  const texts = []
  const types = Array.isArray(props.discountType) ? props.discountType : props.discountType ? [props.discountType] : []

  types.forEach(type => {
    switch(type) {
      case 'student': texts.push('学', '惠'); break
      case 'discount': texts.push('惠'); break
      case 'child': texts.push('儿'); break
      case 'elder': texts.push('老'); break
      case 'military': texts.push('军'); break
      case 'disabled': texts.push('残'); break
      case 'group': texts.push('团'); break
      case 'worker-group': texts.push('工'); break
      case 'student-group': texts.push('学', '团'); break
      default:
        if (type && !validTypes.includes(type)) texts.push(type)
    }
  })
  return texts
})

defineExpose({ wrapper, exporting })
</script>

<style scoped>
.export-target {
  transform: scale(1);
}

.ticket-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 856 / 540;
}

.ticket-container {
  transform-origin: top left;
  transition: transform 0.2s ease;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  font-family: 'SimSun', '宋体', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 600;
  color: #291e1e;
}

.ticket > * {
  position: relative;
  z-index: 1;
}

.ticket {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

/* 两字站名对齐 */
.two-char {
  min-width: 145px;
  text-align: justify;
  text-align-last: justify;
}

/* 站名样式 */
.station-name {
  font-size: 50px;
  max-width: 280px;
  font-family: 'SimHei', '黑体', 'SimSun', '宋体', sans-serif;
  font-weight: 500;
}

/* 优惠标识圆圈 */
.discount-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 3px solid #291e1e;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  text-align: center;
}

/* 虚线框样式 */
.details {
  font-size: 24px;
  text-align: center;
  margin: 0 28px;
  padding: 2px;
  --dash-length: 15px;
  --dash-gap: 8px;
  --border-width: 2px;
  --border-color: #291e1e;

  background-image:
    repeating-linear-gradient(to right, var(--border-color), var(--border-color) var(--dash-length), transparent var(--dash-length), transparent calc(var(--dash-length) + var(--dash-gap))),
    repeating-linear-gradient(to bottom, var(--border-color), var(--border-color) var(--dash-length), transparent var(--dash-length), transparent calc(var(--dash-length) + var(--dash-gap))),
    repeating-linear-gradient(to right, var(--border-color), var(--border-color) var(--dash-length), transparent var(--dash-length), transparent calc(var(--dash-length) + var(--dash-gap))),
    repeating-linear-gradient(to bottom, var(--border-color), var(--border-color) var(--dash-length), transparent var(--dash-length), transparent calc(var(--dash-length) + var(--dash-gap)));

  background-size:
    100% var(--border-width),
    var(--border-width) 100%,
    100% var(--border-width),
    var(--border-width) 100%;

  background-position:
    top left,
    top right,
    bottom left,
    top left;

  background-repeat: no-repeat;
}

/* 底部栏 */
.footer {
  position: absolute;
  width: 856px;
  left: 0px;
  bottom: 0px;
  height: 52px;
  display: flex;
  justify-content: left;
  align-items: left;
}

/* 红色车票底部文字 */
.footer-red {
  left: -40px;
  bottom: 0px;
  height: 52px;
}
</style>
