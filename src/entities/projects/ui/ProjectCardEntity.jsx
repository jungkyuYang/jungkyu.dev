'use client';

import { useState, useRef } from 'react';

import { cn } from '@/shared/lib/utils';
import Carousel from '@/shared/ui/Carousel';

import { ProjectCardBack } from './ProjectCardBack';
import { ProjectCardFront } from './ProjectCardFront';
import { useOutsideClick } from '../lib/useOutsideClick';
import { useProjectFlip } from '../lib/useProjectFlip';

// 🌟 backTitle props 추가
export default function ProjectCardEntity({
  project,
  techIcons,
  header,
  footer,
  buttons,
  backTitle, // 기본값을 설정해두면 편리합니다.
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const { isMobile, handleToggle } = useProjectFlip(cardRef, isFlipped, setIsFlipped);
  useOutsideClick(cardRef, () => setIsFlipped(false), isMobile && isFlipped);

  // Carousel 아이템 생성 로직
  const techItems = project.techStack?.map((tech) => (
    <span
      key={tech}
      className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] whitespace-nowrap text-zinc-200"
    >
      {techIcons?.[tech]}
      {tech}
    </span>
  ));

  return (
    <li ref={cardRef} className="group relative h-[450px] w-full list-none [perspective:1200px]">
      <div
        className={cn(
          'h-full w-full transition-all duration-700 [transform-style:preserve-3d]',
          'md:group-hover:[transform:rotateY(180deg)]',
          isFlipped && '[transform:rotateY(180deg)]',
        )}
      >
        {/* 앞면 */}
        <div
          className="h-full w-full cursor-pointer [backface-visibility:hidden]"
          onClick={handleToggle}
        >
          <ProjectCardFront
            title={project.title}
            description={project.description}
            header={header}
            footer={footer}
            content={<Carousel items={techItems} speed={4000} />}
          />
        </div>

        {/* 뒷면 */}
        <aside
          className={cn(
            'absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden]',
            isFlipped ? 'pointer-events-auto z-50' : 'pointer-events-none z-0',
            'md:group-hover:pointer-events-auto md:group-hover:z-20',
          )}
          onClick={handleToggle}
        >
          <div className="flex h-full items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* 🌟 "hi" 대신 넘겨받은 backTitle 적용 */}
            <ProjectCardBack title={backTitle} buttons={buttons} />
          </div>
        </aside>
      </div>
    </li>
  );
}
