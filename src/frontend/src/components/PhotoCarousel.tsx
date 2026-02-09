import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const photos = [
  {
    src: '/assets/generated/couple-silhouette.dim_800x600.jpg',
    caption: 'From January 2026 to now'
  },
  {
    src: '/assets/generated/hands-holding.dim_800x600.jpg',
    caption: 'Every moment with you is special'
  },
  {
    src: '/assets/generated/flower-bouquet.dim_800x600.jpg',
    caption: 'You bring color to my life'
  }
];

export default function PhotoCarousel() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <Card className="border-2 border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center text-xl md:text-2xl font-semibold text-rose-700 dark:text-rose-300">
                      {photo.caption}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-rose-300 text-rose-600 hover:bg-rose-100 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-900" />
        <CarouselNext className="border-rose-300 text-rose-600 hover:bg-rose-100 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-900" />
      </Carousel>
    </div>
  );
}
