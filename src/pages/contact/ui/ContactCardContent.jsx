import { cn } from '@/shared/lib/utils';

export const ContactCardContent = ({ icon, displayHandle, label, isCopied = false }) => {
  return (
    <>
      {/* 1. 중앙 수직 데코레이션 선 */}
      <span
        className="absolute h-2/3 w-px bg-linear-to-b from-zinc-500 via-zinc-500/50 to-transparent"
        aria-hidden="true"
      />

      {/* 2. 아이콘 컨테이너 */}
      {/* 배경색은 Card를 따라가게 투명(bg-transparent)하게 두거나, 
          포인트를 줄 부분만 최소한으로 남깁니다. */}
      <span
        className={cn(
          'drop-shadow-orange relative z-10 flex h-12 w-12 items-center justify-center rounded-full border duration-1000',
          'border-zinc-200 dark:border-zinc-500', // 경계선만 모드별로 대응
          'text-zinc-500 group-hover:text-current', // 아이콘 색상은 부모 텍스트색(current)을 따라감
        )}
      >
        {icon}
      </span>

      {/* 3. 텍스트 정보 영역 */}
      <div className="z-10 flex w-full flex-col items-center px-2">
        <div className="relative flex min-h-[80px] w-full items-center justify-center lg:min-h-[100px]">
          <div
            className={cn(
              'flex flex-col items-center transition-all duration-300',
              isCopied ? 'translate-y-1 scale-95 opacity-0' : 'translate-y-0 scale-100 opacity-100',
            )}
          >
            {/* 구체적인 색상(zinc-900 등) 대신 'text-current'나 아예 생략하여 부모 색상을 따름 */}
            <span className="font-display text-center text-xl leading-tight font-medium break-all duration-150 lg:text-2xl xl:text-3xl">
              {displayHandle.map((line, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'block',
                    idx > 0 && 'mt-1 text-[0.85em] opacity-60', // 도메인은 투명도로 조절
                  )}
                >
                  {line}
                </span>
              ))}
            </span>
          </div>

          {/* 복사 완료 문구: 얘는 배경과 대비되는 포인트 컬러라 유지하는 게 좋습니다. */}
          {isCopied && (
            <span className="animate-in fade-in zoom-in absolute text-xl font-bold text-blue-500 duration-300 lg:text-2xl">
              COPIED!
            </span>
          )}
        </div>

        {/* 4. 하단 레이블 */}
        <span className="mt-4 text-center text-sm tracking-widest text-zinc-500 uppercase opacity-80 duration-1000 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </>
  );
};
