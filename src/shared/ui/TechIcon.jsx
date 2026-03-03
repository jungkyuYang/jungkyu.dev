import { TECH_ICON_CONFIG } from '@/shared/lib/tech-Icons';

export const TechIcon = ({
  name,
  icon: CustomIcon, // 외부 주입 아이콘
  color, // 색상 강제 지정
  size = '1em', // 크기 조절 (기본값 1em)
  className = '',
  ...props // 기타 HTML/SVG 속성 (onClick 등)
}) => {
  // 1. 이름 기반 설정 조회
  const config = name ? TECH_ICON_CONFIG[name] : null;

  // 2. 최종 렌더링 소스 결정 (Props 우선순위)
  const FinalIcon = CustomIcon || config?.icon;
  const finalColor = color || config?.color || '';

  // 공통 스타일 정의 (shrink-0으로 레이아웃 깨짐 방지)
  const combinedClassName =
    `inline-flex items-center justify-center shrink-0 ${finalColor} ${className}`.trim();

  // 3. 예외 케이스: 이모지
  if (config?.emoji && !CustomIcon) {
    return (
      <span className={combinedClassName} style={{ fontSize: size }} {...props}>
        {config.emoji}
      </span>
    );
  }

  // 4. 예외 케이스: 조합형 (React Native 등)
  if (config?.isMulti && !CustomIcon) {
    return (
      <span className={combinedClassName} style={{ fontSize: size, gap: '0.1em' }} {...props}>
        {config.components.map((item, idx) => (
          <item.icon key={idx} className={item.color} style={{ width: '1em', height: '1em' }} />
        ))}
      </span>
    );
  }

  // 5. 기본 렌더링 (Icon이 있을 경우)
  if (FinalIcon) {
    return (
      <FinalIcon className={combinedClassName} style={{ width: size, height: size }} {...props} />
    );
  }

  // 6. Fallback: 데이터가 없는 경우
  return (
    <span className="text-[10px] font-bold text-zinc-400" title={`Unknown tech: ${name}`}>
      ?
    </span>
  );
};
