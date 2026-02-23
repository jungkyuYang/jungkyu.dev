import { Card } from '@/shared/ui/Card';

export const ContactSkeleton = ({ count = 3 }) => {
  return (
    <section className="mx-auto grid w-full grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} isLoading={true}>
          {/* ContactView의 py-12 ~ py-24 간격과 일치시켜 덜컥거림 방지 */}
          <div className="h-full w-full py-12 md:py-20 lg:py-24" />
        </Card>
      ))}
    </section>
  );
};
