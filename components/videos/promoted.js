import { Swiper, SwiperSlide } from "swiper/react";
import usePromoted from "../../hooks/usePromoted";
import MiniCard from "./mini-card";
import PlaceholderSwipper from "./placeholder-swipper";

export default function Promoted() {
  const { data = [], isLoading } = usePromoted();

  return (
    <div className="pl-4 sm:pl-0">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
        Pinned Videos
      </h2>
      {isLoading ? (
        <PlaceholderSwipper />
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          navigation
          keyboard
          mousewheel={{
            forceToAxis: true,
          }}
          style={{ overflow: "inherit" }}
        >
          <>
            {data.map((content) => {
              return (
                <SwiperSlide
                  key={content.SK}
                  style={{ width: "320px" }}
                  virtualIndex={content.SK}
                >
                  <MiniCard content={content} />
                </SwiperSlide>
              );
            })}
          </>
        </Swiper>
      )}
    </div>
  );
}
