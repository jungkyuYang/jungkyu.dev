import fs from 'fs';
import path from 'path';

/**
 * 자동 생성 대상 레이어 설정 (이미지에서 확인된 shared 세그먼트 포함)
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
];

// 정교한 export 감지를 위한 정규표현식 (인라인 및 하단 export 대응)
const exportRegex = /^export\s+(const|let|var|function|class|default|{)/m;

function generateIndex(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  let exportLines = [];
  const seenExports = new Set(); // 한 폴더 내 중복 export 방지

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 1. 하위 폴더 재귀 탐색
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
      // 2. 파일 내용 분석 (비공개 파일 필터링)
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

  // 3. 파일 쓰기 (변화가 있을 때만 실행하여 빌드 최적화)
  if (exportLines.length > 0) {
    const finalContent = exportLines.join('\n') + '\n';
    const indexPath = path.join(dir, 'index.js');

    // 기존 파일과 내용이 다를 때만 씀 (파일 수정 시간 보존)
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
