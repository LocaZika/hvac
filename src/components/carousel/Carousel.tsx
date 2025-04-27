'use client'
import Image from "next/image";
import Slider, { Settings } from 'react-slick';
import carouselStyle from './carousel.module.scss';

interface ICarousel {
  items: {id: number; path: string}[],
  backdrop?: boolean,
  dots?: boolean,
  speed?: number,
  thumbnail?: boolean,
  autoplay?: boolean,
}

export default function Carousel({items, backdrop, dots, speed, thumbnail, autoplay}: ICarousel) {
  const isThumbnail = () => {
    return thumbnail ? {
      customPaging: function(index: number) {
        return (
          <div className={carouselStyle['thumb']}>
            <img src={`/imgs/cars/${items[index].path}`} alt='car image' fetchPriority="low" decoding="async"/>
          </div>
        );
      }
    } : null;
  }
  const settings: Settings = {
      dots: dots ?? true,
      dotsClass: thumbnail ? 'slick-dots slick-thumb' : 'slick-dots',
      infinite: true,
      lazyLoad: "ondemand",
      speed: speed ?? 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: autoplay ?? true,
      autoplaySpeed: speed ?? 1000,
      arrows: false,
      className: !backdrop ? carouselStyle['container'] : `${carouselStyle['container']} ${carouselStyle['backdrop']}`,
      ...isThumbnail(),
  };
  return (
    <Slider {...settings}>
      {
        items.map(({id, path}) => (
          <div key={id} className={carouselStyle['slide']}>
            <Image
              src={`/imgs/cars/${path}`}
              alt='car image'
              priority
              fill={thumbnail ? false : true}
              sizes={thumbnail ? undefined : "100vw"}
              width={thumbnail ? 847.5 : undefined}
              height={thumbnail ? 503 : undefined}
              className={thumbnail ? carouselStyle["thumbnail-mode"] : ""}
            />
           </div>
        ))
      }
    </Slider>
  )
}
