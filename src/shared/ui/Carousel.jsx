'use client';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cn } from '@/shared/lib/utils';

/**
 * @description 다양한 레이아웃에서 재사용 가능한 범용 캐러셀 컴포넌트
 */
export default function Carousel({
  items = [],
  isInfinite = true,
  autoplay = true,
  speed = 5000,
  pauseOnHover = true,
  variableWidth = true,
  className,
  settings: customSettings,
}) {
  // 1. 아이템이 없으면 렌더링하지 않음
  if (!items || items.length === 0) return null;

  // 2. 무한 루프 안정성 로직
  // slidesToShow가 명시되지 않았다면 기본값 1을 사용
  const displayCount = customSettings?.slidesToShow || 1;
  // 아이템 개수가 보여줄 개수보다 많아야 무한 루프가 에러 없이 작동함
  const canInfinite = items.length > displayCount;
  const finalInfinite = isInfinite && canInfinite;

  // 3. Slick 기본 설정 및 커스텀 설정 병합
  const settings = {
    infinite: finalInfinite,
    autoplay: autoplay && finalInfinite, // 무한 루프가 불가능하면 자동재생도 끄는 것이 자연스러움
    speed: speed,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: displayCount,
    slidesToScroll: 1,
    variableWidth: variableWidth,
    arrows: false,
    dots: false,
    pauseOnHover: pauseOnHover,
    draggable: true,
    swipeToSlide: true,
    touchThreshold: 10,
    ...customSettings,
  };

  return (
    <div
      className={cn('w-full overflow-hidden select-none', className)}
      role="region"
      aria-roledescription="carousel"
    >
      <Slider
        {...settings}
        className={cn(
          'slick-container',
          // Slick 내부 구조 최적화 (Flexbox 적용 및 여백 제어)
          '[&_.slick-track]:flex [&_.slick-track]:items-center',
          '[&_.slick-list]:overflow-visible',
        )}
      >
        {items.map((item, idx) => (
          <div
            key={`carousel-item-${idx}`}
            className="px-2 focus:outline-none"
            role="group"
            aria-roledescription="slide"
            style={{ width: 'auto' }} // variableWidth 설정을 위한 필수 스타일
          >
            {item}
          </div>
        ))}
      </Slider>
    </div>
  );
}
