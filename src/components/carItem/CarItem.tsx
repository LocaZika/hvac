'use client'
import Slider, { Settings } from 'react-slick';
import carItemStyle from './carItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { spaceToDash } from '@utils/string.utils';
import { toCurrency } from '@utils/number.utils';

type TTradeData = {
  id: number,
  name: string,
  tradeType: string,
  price: number,
}
const tradeLink = ({id, name, tradeType, price}: TTradeData) => {
  if(tradeType === 'sale'){
    return (
      <>
        <Link href={`/cars/${id}`}>
          for sale
        </Link>
        <h6>{toCurrency(price)}</h6>
      </>
    )
  }
  return (
    <>
      <Link href={`/cars/${id}`}>
        for rent
      </Link>
      <h6>{toCurrency(price)}<span>/month</span></h6>
    </>
  )
};

const transmissionClassName = (transmission: string): string => {
  if(transmission === 'manual'){
    return `${carItemStyle['transmission']} ${carItemStyle['manual']}`;
  }
  return carItemStyle['transmission'];
};

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: `${carItemStyle['slider-dots']} slick-dots`,
}
export default function CarItem({data}: {data: TCarItemMinData}) {
  const tradeData: TTradeData = {
    id: data.id,
    name: data.name,
    tradeType: data.tradeType,
    price: data.price,
  };
  return (
    <div className={carItemStyle['container']}>
      <Slider {...settings}>
        {
          data.imgs.map(({id, path}) => (
            <div key={id} className={carItemStyle['img']}>
              <Image
                src={`/imgs/cars/${path}`}
                alt='car image'
                fill
                priority
                sizes='(max-width: 100%)'
              />
            </div>
          ))
        }
      </Slider>
      <div className={carItemStyle['info']}>
        <div className={carItemStyle['text']}>
          <span className={carItemStyle['model']}>{data.model}</span>
          <h5>
            <Link href={`/cars/${data.id}`}>{data.name}</Link>
          </h5>
          <ul>
            <li>
              <span>{data.mileage}</span>&nbsp;mi
            </li>
            <li className={transmissionClassName(data.transmission)}>{data.transmission}</li>
            <li>
              <span>{data.hp}</span>&nbsp;hp
            </li>
          </ul>
        </div>
        <div
          className={`${carItemStyle['price']} ${data.tradeType === 'sale' ? carItemStyle['sale'] : null}`}>
          {tradeLink(tradeData)}
        </div>
      </div>
    </div>
  )
}
