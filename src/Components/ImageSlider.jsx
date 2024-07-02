import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/pagination';


export default function ImageSlider ({imageURLs}){
  const renderBullet = (index, className)=>{
    return `<span ${className}="w-24 h-24 text-center text-lg text-black opacity-100 bg-slate-300  m-[5px] active:text-white active:bg-blue-500">` + (index + 1) + '</span>';
  }
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation={{enabled : true}}
      pagination={{clickable : true, renderBullet}}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    > 
   
      {imageURLs.map( imageURL=>(
        <SwiperSlide>
          <img src={imageURL} className='w-[350px] h-[450px] m-auto'/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};