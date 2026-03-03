const TECH_ALIAS_MAP = {
  'next.js': 'nextdotjs',
  'node.js': 'nodedotjs',
  'three.js': 'threedotjs',
  'styled-components': 'styledcomponents',
  'c++': 'cplusplus',
  'c#': 'csharp',
};

const cache = {};

export const getTechIconUrl = (techName) => {
  if (!techName) return null;

  const normalizedName = techName.toLowerCase().trim();

  // 2. 캐시된 값이 있으면 바로 반환
  if (cache[normalizedName]) return cache[normalizedName];

  // 3. 매핑 테이블 확인 -> 없으면 기본 규칙 적용
  const slug =
    TECH_ALIAS_MAP[normalizedName] || normalizedName.replace(/\s+/g, '').replace(/\./g, 'dot');

  const url = `https://cdn.simpleicons.org/${slug}`;

  // 결과 저장 후 반환
  cache[normalizedName] = url;
  return url;
};

export const toUpper = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.toUpperCase();
};
