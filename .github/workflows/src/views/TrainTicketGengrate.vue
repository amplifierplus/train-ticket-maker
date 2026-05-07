<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <h1 class="text-[clamp(1.5rem,5vw,2.5rem)] font-bold text-gray-800 mb-4 text-center">
      车票信息编辑
    </h1>

    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- 左侧：基础表单（精简保留核心） -->
        <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <form @submit.prevent="handleSaveImage" class="space-y-4">

            <!-- 出发/到达 -->
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">🚉 出发/到达</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs text-gray-500 mb-1">出发站</label><input v-model="form.fromStation" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：上海虹桥" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">出发站拼音</label><input v-model="form.fromPinyin" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：ShanghaiHongqiao" @input="handleFromPinyinInput" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">到达站</label><input v-model="form.toStation" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：南京南" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">到达站拼音</label><input v-model="form.toPinyin" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：Nanjingnan" @input="handleToPinyinInput" required></div>
              </div>
            </div>

            <!-- 车次/时间 -->
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">🕐 车次/时间</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs text-gray-500 mb-1">车次</label><input v-model="form.trainCode" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：G2025" pattern="[GDKZT][0-9]+" title="以 G/D/K/Z/T 开头" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">日期时间</label><input v-model="form.dateTime" type="datetime-local" class="w-full px-3 py-2 border rounded-md" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">检票口</label><input v-model="form.gate" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：5A（可为空）"></div>
                <div><label class="block text-xs text-gray-500 mb-1">座位类型</label><select v-model="form.seatType" class="w-full px-3 py-2 border rounded-md" required>
                  <option value="一等座">一等座</option><option value="二等座">二等座</option><option value="商务座">商务座</option><option value="特等座">特等座</option>
                  <option value="无座">无座</option><option value="硬座">硬座</option><option value="软座">软座</option><option value="新空调硬座">新空调硬座</option>
                  <option value="新空调软座">新空调软座</option><option value="硬卧">硬卧</option><option value="软卧">软卧</option><option value="动卧">动卧</option>
                  <option value="高级软卧">高级软卧</option><option value="一等卧">一等卧</option><option value="二等卧">二等卧</option><option value="新空调硬卧">新空调硬卧</option>
                  <option value="新空调软卧">新空调软卧</option>
                </select></div>
              </div>
            </div>

            <!-- 座位/价格 -->
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">🎫 座位/价格</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs text-gray-500 mb-1">车厢号</label><input v-model="form.carriage" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：07" required></div>
                <div v-if="sleeperTypes.includes(form.seatType)"><label class="block text-xs text-gray-500 mb-1">铺位类型</label><select v-model="form.berthType" class="w-full px-3 py-2 border rounded-md"><option value="">选择铺位</option><option value="上">上铺</option><option value="中">中铺</option><option value="下">下铺</option></select></div>
                <div><label class="block text-xs text-gray-500 mb-1">{{ sleeperTypes.includes(form.seatType) ? '铺位号' : '座位号' }}</label><input v-model="form.seatNumber" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：12F" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">票价（元）</label><input v-model="form.price" type="number" step="0.5" class="w-full px-3 py-2 border rounded-md" placeholder="例：443.5" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">票号（左上角）</label><input v-model="form.serial" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：A000001" required></div>
                <div><label class="block text-xs text-gray-500 mb-1">优惠类型</label><select v-model="form.discountType" class="w-full px-3 py-2 border rounded-md">
                  <option value="">无优惠</option><option value="student">学生票（学 + 惠）</option><option value="child">儿童票（儿）</option><option value="military">残疾军人票（军）</option>
                  <option value="disabled">残疾人票（残）</option><option value="elder">老人优惠票（老）</option><option value="discount">普通优惠票（惠）</option><option value="group">团体票（团）</option>
                  <option value="worker-group">务工团体票（工）</option><option value="student-group">学生团体票（学 + 团）</option><option value="兑">积分兑换票（兑）</option>
                </select></div>
              </div>
            </div>

            <!-- 虚线框说明 -->
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">📋 虚线框说明文字</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs text-gray-500 mb-1">虚线框文字第1行</label><input v-model="form.detailLines[0]" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：仅供纪念 遗失不补"></div>
                <div><label class="block text-xs text-gray-500 mb-1">虚线框文字第2行</label><input v-model="form.detailLines[1]" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：改签退票须交回车站"></div>
              </div>
            </div>

          </form>
        </div>

        <!-- 右侧：预览 + 下放的扩展表单 -->
        <div class="flex flex-col gap-4">
          <!-- 预览容器 缩小高度+缩放 -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">🔍 实时预览</h3>
            <div class="preview-container flex items-center justify-center">
              <TrainTicket
                :serial="form.serial" :gate="form.gate" :fromStation="form.fromStation" :fromPinyin="form.fromPinyin"
                :toStation="form.toStation" :toPinyin="form.toPinyin" :trainCode="form.trainCode" :dateTime="form.dateTime"
                :carriage="form.carriage" :seatNumber="form.seatNumber" :berthType="form.berthType" :price="form.price" :seatType="form.seatType"
                :idNumber="form.idNumber" :passengerName="form.passengerName" :footerInfo="form.footerInfo" :discountType="form.discountType"
                :style="form.ticketType" :detail-lines="form.detailLines"
              />
            </div>
          </div>

          <!-- 右侧下方：移过来的扩展配置 -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <form @submit.prevent="handleSaveImage" class="space-y-4">
              <!-- 底部售票信息（JM编码） -->
              <div class="border-b border-gray-200 pb-4">
                <h3 class="text-base font-semibold text-gray-700 mb-3">🏷️ 底部售票编码</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label class="block text-xs text-gray-500 mb-1">车站代码（每个车站固定5位）</label><input v-model="form.stationCode" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：65773" maxlength="5"></div>
                  <div><label class="block text-xs text-gray-500 mb-1">售票点信息（可随机生成）</label><select v-model="form.datePrefix" class="w-full px-3 py-2 border rounded-md"><option value="">随机生成</option><option value="30">30</option><option value="31">31</option><option value="33">33</option><option value="00">00</option></select></div>
                  <div><label class="block text-xs text-gray-500 mb-1">售票窗口编号（3位，可随机生成）</label><input v-model="form.sequence" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：012" maxlength="3"></div>
                  <div><label class="block text-xs text-gray-500 mb-1">财收结帐日期(一般为购票后一天，此处默认发车后一天)</label><input v-model="form.dateSuffix" type="text" class="w-full px-3 py-2 border rounded-md"></div>
                  <div class="sm:col-span-2"><label class="block text-xs text-gray-500 mb-1">车票编号（7位）</label><input v-model="form.randomCode" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：A000001" maxlength="7"></div>
                  <div class="sm:col-span-2"><div class="text-xs text-gray-500">完整编码：{{ form.footerInfo }}</div></div>
                </div>
              </div>

              <!-- 乘客/售票 -->
              <div class="border-b border-gray-200 pb-4">
                <h3 class="text-base font-semibold text-gray-700 mb-3">👤 乘客信息</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label class="block text-xs text-gray-500 mb-1">乘客姓名</label><input v-model="form.passengerName" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：张三" required></div>
                  <div><label class="block text-xs text-gray-500 mb-1">身份证号</label><input v-model="form.idNumber" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="例：3201021990****5678" required></div>
                </div>
              </div>

              <!-- 车票样式选择 -->
              <div class="border-t pt-3">
                <label class="block text-sm font-medium text-gray-600 mb-2">车票样式</label>
                <div class="flex gap-2">
                  <button @click="form.ticketType = 'red'" type="button" class="flex-1 px-3 py-2 text-sm rounded-md border" :class="form.ticketType === 'red' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-gray-700 border-gray-300'">红色样式</button>
                  <button @click="form.ticketType = 'blue'" type="button" class="flex-1 px-3 py-2 text-sm rounded-md border" :class="form.ticketType === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 border-gray-300'">蓝色样式</button>
                </div>
              </div>

              <!-- 保存按钮 -->
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
                保存火车票为图片
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 隐藏的车票用于导出 -->
    <div class="fixed top-0 left-0 w-[856px] h-[540px] bg-white z-[-1] opacity-0 pointer-events-none" id="hidden-ticket-area">
      <TrainTicket
        ref="hiddenTicketRef"
        :serial="form.serial" :gate="form.gate" :fromStation="form.fromStation" :fromPinyin="form.fromPinyin"
        :toStation="form.toStation" :toPinyin="form.toPinyin" :trainCode="form.trainCode" :dateTime="form.dateTime"
        :carriage="form.carriage" :seatNumber="form.seatNumber" :berthType="form.berthType" :price="form.price" :seatType="form.seatType"
        :idNumber="form.idNumber" :passengerName="form.passengerName" :footerInfo="form.footerInfo" :discountType="form.discountType"
        :style="form.ticketType" :detail-lines="form.detailLines"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import TrainTicket from '@/components/TrainTicket.vue'
import { toPng } from 'html-to-image'

const form = reactive({
  serial: 'A000001', gate: '5A', fromStation: '上海虹桥', fromPinyin: 'ShanghaiHongqiao',
  toStation: '南京南', toPinyin: 'Nanjingnan', trainCode: 'G2025', dateTime: '2023-10-01T08:30',
  carriage: '07', seatNumber: '12F', price: '443.5', seatType: '一等座',
  idNumber: '3201021990****5678', passengerName: '张三', footerInfo: '', discountType: '',
  berthType: '', ticketType: 'blue', detailLines: ['仅供纪念 遗失不补', '改签退票须交回车站'],
  stationCode: '', datePrefix: '', sequence: '', dateSuffix: '', randomCode: '',
})

const sleeperTypes = ['软卧', '硬卧', '动卧', '高级软卧', '一等卧', '二等卧', '新空调硬卧', '新空调软卧']
const hiddenTicketRef = ref(null)

watch(() => form.seatType, (newVal) => { if (!sleeperTypes.includes(newVal)) form.berthType = '' })

function randomNumber(min, max, length) { const num = Math.floor(Math.random() * (max - min + 1)) + min; return num.toString().padStart(length, '0') }
function randomLetter() { const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; return letters[Math.floor(Math.random() * letters.length)] }
function randomSevenDigitCode() { return `${randomLetter()}${randomNumber(1, 999999, 6)}` }

function capitalizeFirstLetter(pinyin) {
  if (!pinyin) return ''
  const lower = pinyin.toLowerCase()
  const cityPatterns = [['shanghai', 'Shanghai'], ['beijing', 'Beijing'], ['guangzhou', 'Guangzhou'], ['shenzhen', 'Shenzhen'], ['nanjing', 'Nanjing'], ['hangzhou', 'Hangzhou'], ['chengdu', 'Chengdu'], ['wuhan', 'Wuhan'], ['xian', "Xi'an"], ['tianjin', 'Tianjin'], ['chongqing', 'Chongqing'], ['suzhou', 'Suzhou'], ['qingdao', 'Qingdao'], ['dalian', 'Dalian'], ['zhengzhou', 'Zhengzhou'], ['changsha', 'Changsha'], ['kunming', 'Kunming'], ['taiyuan', 'Taiyuan'], ['shijiazhuang', 'Shijiazhuang'], ['hefei', 'Hefei'], ['foshan', 'Foshan'], ['dongguan', 'Dongguan'], ['wenzhou', 'Wenzhou'], ['nantong', 'Nantong'], ['yanbian', 'Yanbian']]
  let result = lower
  for (const [lower, upper] of cityPatterns) { result = result.replace(lower, upper) }
  if (result === lower) {
    const suffixes = [['hongqiao', 'Hongqiao'], ['binjiang', 'Binjiang'], ['dong', 'Dong'], ['xi', 'Xi'], ['nan', 'Nan'], ['bei', 'Bei'], ['zhong', 'Zhong']]
    for (const [lowerSuffix, upperSuffix] of suffixes) {
      if (result.endsWith(lowerSuffix)) {
        const prefix = result.slice(0, -lowerSuffix.length)
        result = prefix ? prefix.charAt(0).toUpperCase() + prefix.slice(1) + upperSuffix : upperSuffix
        break
      }
    }
  }
  if (result === lower) result = lower.charAt(0).toUpperCase() + lower.slice(1)
  return result
}

function handleFromPinyinInput(event) { form.fromPinyin = capitalizeFirstLetter(event.target.value.toLowerCase()) }
function handleToPinyinInput(event) { form.toPinyin = capitalizeFirstLetter(event.target.value.toLowerCase()) }

function calculateNextDate() { 
  const date = new Date(form.dateTime); 
  date.setDate(date.getDate() + 1); 
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}` 
}

function generateFooterInfo() {
  const station = form.stationCode || randomNumber(10000, 99999, 5)
  let prefix = form.datePrefix
  if (!prefix) { const rand = Math.random(); prefix = rand < 0.4 ? '30' : rand < 0.8 ? '31' : rand < 0.9 ? '33' : '00' }
  const seq = form.sequence ? form.sequence.padStart(3, '0') : randomNumber(1, 24, 3)
  // 优先用手动输入，没有再自动+1
  const suffix = form.dateSuffix || calculateNextDate()
  const code = form.randomCode ? form.randomCode.toUpperCase() : randomSevenDigitCode()
  return `${station}${prefix}${seq}${suffix}${code} JM`
}

let isInitializing = false
function initializeForm() {
  form.stationCode = randomNumber(10000, 99999, 5)
  const rand = Math.random()
  form.datePrefix = rand < 0.4 ? '30' : rand < 0.8 ? '31' : rand < 0.9 ? '33' : '00'
  form.sequence = randomNumber(1, 24, 3)
  // 初始化默认+1
  form.dateSuffix = calculateNextDate()
  form.randomCode = randomSevenDigitCode()
  form.serial = form.randomCode
  form.footerInfo = generateFooterInfo()
}

onMounted(() => { isInitializing = true; initializeForm(); isInitializing = false })

// 监听包含手动日期后缀
watch([() => form.stationCode, () => form.datePrefix, () => form.sequence, () => form.dateTime, () => form.randomCode, () => form.dateSuffix], () => {
  if (isInitializing) return
  form.footerInfo = generateFooterInfo()
  form.serial = form.randomCode || randomSevenDigitCode()
})

const handleSaveImage = async () => {
  try {
    const ticketRef = hiddenTicketRef.value
    if (!ticketRef) throw new Error('无法找到车票组件')
    ticketRef.exporting = true
    await nextTick()
    const node = ticketRef.wrapper || ticketRef.$el
    if (!node) throw new Error('无法找到车票 DOM 节点')
    const dataUrl = await toPng(node, { cacheBust: true, backgroundColor: '#fff', quality: 1, pixelRatio: 3 })
    ticketRef.exporting = false
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${form.trainCode}_${form.passengerName}_火车票.png`
    link.click()
    link.remove()
  } catch (error) { alert('图片保存失败，请重试！'); console.error('保存图片错误：', error) }
}
</script>

<style>
/* 预览容器缩小，高度变短、缩放更小 */
.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 260px;
  overflow: hidden;
  position: relative;
}
.preview-container .export-target {
  transform: scale(0.42);
  transform-origin: center center;
}
@media screen and (max-width: 640px) { 
  .preview-container { height: 200px; } 
  .preview-container .export-target { transform: scale(0.32); } 
}
</style>