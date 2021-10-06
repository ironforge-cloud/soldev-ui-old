import {Swiper, SwiperSlide} from "swiper/react";
import usePromoted from "../../hooks/usePromoted";
import MiniCard from "./mini-card";
import PlaceholderSwipper from "./placeholder-swipper";

export default function Promoted() {
    const {promoted, isLoading, isError} = usePromoted();

    return (
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
                Promoted Videos
            </h2>
            {isLoading ? (
                <PlaceholderSwipper/>
            ) : (
                <Swiper
                    spaceBetween={20}
                    slidesPerView="auto"
                    navigation
                    keyboard
                    mousewheel={{
                        forceToAxis: true,
                    }}
                    style={{overflow: "inherit"}}
                >
                    {promoted.map((content) => {
                        return (
                            <SwiperSlide
                                key={content.ID}
                                style={{width: "320px"}}
                                virtualIndex={content.ID}
                            >
                                <MiniCard content={content}/>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
}
