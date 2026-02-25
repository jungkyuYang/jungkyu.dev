import fs from 'fs';
import path from 'path';

/**
 * 자동 생성 대상 레이어 설정
 */
const TARGET_LAYERS = [
  'src/shared/ui',
  'src/shared/lib',
  'src/shared/hooks',
  'src/shared/api',
  'src/shared/constants',
  'src/shared/providers',
  'src/entities',
  'src/features',
  'src/widgets',
  'src/views',
];

/**
 * ✅ 자동 생성에서 제외할 경로 (SSR 충돌 및 라이브러리 의존성 문제 방지)
 * 해당 폴더의 index.js는 수동으로 관리하거나 생성을 건너뜁니다.
 */
const IGNORE_PATHS = [
  'src/widgets/pdf-preview/ui', // pdfjs-dist(canvas) 에러 방지를 위해 수동 관리
];

// 정교한 export 감지를 위한 정규표현식
const exportRegex = /^export\s+(const|let|var|function|class|default|{)/m;

function generateIndex(dir) {
  // 1. 현재 경로가 제외 대상인지 확인
  const relativePath = path.relative(process.cwd(), dir).replace(/\\/g, '/');
  if (IGNORE_PATHS.includes(relativePath)) {
    console.log(`⏩ Skipped (Ignore List): ${relativePath}`);
    return;
  }

  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  let exportLines = [];
  const seenExports = new Set(); // 중복 export 방지

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 하위 폴더 재귀 탐색
      generateIndex(fullPath);

      // 하위 폴더에 index.js가 생성되었다면 현재 index에서 통합 export
      if (fs.existsSync(path.join(fullPath, 'index.js'))) {
        const line = `export * from './${item.name}';`;
        if (!seenExports.has(line)) {
          exportLines.push(line);
          seenExports.add(line);
        }
      }
    } else if (item.isFile() && /\.(js|jsx|ts|tsx)$/.test(item.name) && item.name !== 'index.js') {
      // 파일 내용 분석
      const content = fs.readFileSync(fullPath, 'utf8');

      if (exportRegex.test(content)) {
        const fileName = item.name.replace(/\.(js|jsx|ts|tsx)$/, '');
        const line = `export * from './${fileName}';`;

        if (!seenExports.has(line)) {
          exportLines.push(line);
          seenExports.add(line);
        }
      }
    }
  }

  // 2. 파일 쓰기 (변화가 있을 때만 실행)
  if (exportLines.length > 0) {
    const finalContent = exportLines.join('\n') + '\n';
    const indexPath = path.join(dir, 'index.js');

    if (!fs.existsSync(indexPath) || fs.readFileSync(indexPath, 'utf8') !== finalContent) {
      fs.writeFileSync(indexPath, finalContent);
      console.log(`✅ Generated: ${path.relative(process.cwd(), indexPath)}`);
    }
  }
}

console.log('🚀 FSD Public API 자동 생성 시작...');
TARGET_LAYERS.forEach((layer) => {
  const layerPath = path.resolve(layer);
  generateIndex(layerPath);
});
console.log('✨ 모든 index.js 생성이 완료되었습니다!');
