import { readFileSync, writeFileSync } from 'node:fs';

// 去掉行首 export，删掉 import 行
const strip = s => s
  .replace(/^export\s+(?=(class|const|function|let|var))/gm, '')
  .replace(/^import\s+.*$/gm, '');

const code = strip(readFileSync('src/train-data.js', 'utf8'));
const data = strip(readFileSync('src/train-data-source.js', 'utf8'));
const main = strip(readFileSync('src/main.js', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>中国动车组车号查询</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    background: #f5f5f5;
    color: #333;
    max-width: 480px;
    margin: 0 auto;
    padding: 20px 16px;
  }
  h1 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 16px;
    color: #1a1a1a;
  }
  #plate-input {
    width: 100%;
    padding: 12px 16px;
    font-size: 1.2rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    text-align: center;
    letter-spacing: 2px;
    transition: border-color 0.2s;
  }
  #plate-input:focus { border-color: #4a90d9; }
  #result { margin-top: 16px; }
  .card {
    background: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .card h2 { font-size: 1.05rem; margin-bottom: 4px; }
  .card .meta { font-size: 0.85rem; color: #666; }
  .card .range { font-size: 0.85rem; color: #888; margin-top: 2px; }
  .card a { font-size: 0.8rem; color: #4a90d9; text-decoration: none; display: inline-block; margin-top: 6px; }
  .empty { text-align: center; color: #999; font-size: 0.9rem; padding: 24px 0; }

  .hidden { display: none !important; }

  .footer { margin-top: 16px; text-align: center; }
  .footer button {
    padding: 8px 20px;
    font-size: 0.9rem;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    color: #4a90d9;
  }
  .footer button:hover { background: #f0f6ff; }

  .about-section {
    background: #fff;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .about-section h3 {
    font-size: 1rem;
    color: #4a90d9;
    margin-bottom: 6px;
  }
  .about-section ul { list-style: none; }
  .about-section li { font-size: 0.85rem; color: #555; padding: 2px 0; }
  .about-section a { color: #4a90d9; text-decoration: none; }
  .about-section a:hover { text-decoration: underline; }
  #about-back {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 0.95rem;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    color: #333;
    margin-top: 8px;
  }
  #about-back:hover { background: #f5f5f5; }
</style>
</head>
<body>
  <h1 id="title">中国动车组车号查询</h1>

  <div id="main-view">
    <input id="plate-input" type="text" inputmode="numeric" maxlength="4" placeholder="输入车号，如 0207">
    <div id="result"></div>
    <div class="footer">
      <button id="about-btn" type="button">关于</button>
    </div>
  </div>

  <div id="about-view" class="hidden">
    <div id="about-body"></div>
    <button id="about-back" type="button">← 返回</button>
  </div>

<script>
${code}

${data}

${main}
</script>
</body>
</html>
`;

writeFileSync('index.html', html);
console.log('✓ index.html 已生成');