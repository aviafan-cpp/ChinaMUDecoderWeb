import { TrainModelManager } from './train-data.js';
import { TRAIN_DATA_TEXT } from './train-data-source.js';
import { title } from 'node:process';
import { url } from 'node:inspector';

const mgr = new TrainModelManager();
mgr.addFromText(TRAIN_DATA_TEXT);

const input = document.getElementById('plate-input');
const result = document.getElementById('result');

const pad = n => String(n).padStart(4, '0');

function render(items, raw) {
  if (raw === '') {
    result.innerHTML = '';
    return;
  }
  if (items.length === 0) {
    result.innerHTML = `<p class="empty">未找到车号 ${raw} 对应的型号</p>`;
    return;
  }
  result.innerHTML = items.map(t => {
    const typeColor = t.train_type.includes('复兴号') ? '#c9a227' : '#4a90d9';
    return `
      <div class="card">
        <h2 style="color:${typeColor}">${t.name}</h2>
        <p class="meta">${t.train_type} · ${t.max_speed} km/h · ${t.cars_number} 车厢</p>
        <p class="range">车号区间：${pad(t.plate_number_start)} – ${pad(t.plate_number_end)}</p>
        ${t.science_website_url ? `<a href="${t.science_website_url}" target="_blank" rel="noopener">科普来源 →</a>` : ''}
      </div>
    `;
  }).join('');
}

input.addEventListener('input', () => {
  // 只允许数字，最多 4 位
  input.value = input.value.replace(/\D/g, '').slice(0, 4);
  const raw = input.value;

  if (raw === '') { render([], ''); return; }

  // 补零后查询
  const padded = raw.padStart(4, '0');
  const n = Number(padded);
  if (Number.isNaN(n)) { render([], raw); return; }

  render(mgr.findByPlateNumber(n), raw);
});

// ============ 关于界面 ============

// 从数据文件中解析 # 开头的元信息（数据库版本、来源、授权等）
const dataInfo = TRAIN_DATA_TEXT
  .split(/\r?\n/)
  .filter(l => l.startsWith('#'))
  .map(l => l.slice(1).trim())
  .filter(Boolean)
  .filter(t => !t.startsWith('数据来源')); // 避免与下方链接重复

const aboutSections = [
  {
    title: '版本',
    items: [
      { label: 'W20261101', url: ''},
      { label: '对应 C++ 版 20260608', url: ''},
    ],
  },
  {
    title: '作者',
    items: [
      { label: 'aviafan_cpp', url: '' },
      { label: 'GitHub',      url: 'https://github.com/aviafan-cpp' },
      { label: 'Bilibili',    url: 'https://space.bilibili.com/3546620213857006' },
      { label: '萌娘百科',    url: 'https://zh.moegirl.org.cn/User:AviaFanCpp' },
    ],
  },
  {
    title: '数据来源',
    items: [
      { label: 'china-emu.cn', url: 'https://www.china-emu.cn' },
      ...dataInfo.map(t => ({ label: t, url: '' })),
    ],
  },
  {
    title: '项目网址',
    items: [
      { label: 'GitHub',          url: 'https://github.com/aviafan-cpp/ChinaMUDecoderWeb' },
      { label: 'GitHub Releases', url: 'https://github.com/aviafan-cpp/ChinaMUDecoderWeb/releases' },
    ],
  },
  {
    title: 'C++ 版',
    items: [
      { label: 'GitHub',          url: 'https://github.com/aviafan-cpp/ChinaMUDecoder' },
      { label: 'GitHub Releases', url: 'https://github.com/aviafan-cpp/ChinaMUDecoder/releases'},
    ],
  },
];

document.getElementById('about-body').innerHTML = aboutSections.map(sec => `
  <div class="about-section">
    <h3>${sec.title}</h3>
    <ul>
      ${sec.items.map(it => it.url
        ? `<li><a href="${it.url}" target="_blank" rel="noopener">${it.label}</a></li>`
        : `<li>${it.label}</li>`
      ).join('')}
    </ul>
  </div>
`).join('');

const mainView  = document.getElementById('main-view');
const aboutView = document.getElementById('about-view');

document.getElementById('about-btn').addEventListener('click', () => {
  mainView.classList.add('hidden');
  aboutView.classList.remove('hidden');
});

document.getElementById('about-back').addEventListener('click', () => {
  aboutView.classList.add('hidden');
  mainView.classList.remove('hidden');
});