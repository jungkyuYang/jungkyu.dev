'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TechStackCarousel({ techStack, techIcons }) {
  const isInfinite = techStack.length > 3;
  const slidesToShow = isInfinite ? 3 : techStack.length;
  const settings = {
    infinite: isInfinite,
    speed: 2000,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: isInfinite,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow,
          infinite: isInfinite,
          autoplay: isInfinite,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow,
          infinite: isInfinite,
          autoplay: isInfinite,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow,
          infinite: isInfinite,
          autoplay: isInfinite,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="mt-3 overflow-x-auto whitespace-nowrap flex-nowrap no-scrollbar"
      style={{ scrollbarWidth: 'none' }}
    >
      <Slider {...settings} style={{ width: 'max-content' }}>
        {techStack.map((tech, idx) => (
          <div key={tech + idx} style={{ width: 'auto' }}>
            <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-200 border border-zinc-700 mx-1 whitespace-nowrap">
              {techIcons?.[tech] || null}
              {tech}
            </span>
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
