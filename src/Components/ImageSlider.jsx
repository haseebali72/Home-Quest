import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/pagination';


export default function ImageSlider ({imageURLs, spaceBetween,slidePerView, navigation,autoPlay, pagination,scrollbar, imageStyle,}){
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay,EffectFade]}
      spaceBetween={spaceBetween ? spaceBetween : 2}
      slidesPerView={slidePerView ? slidePerView : 2}
      navigation={{enabled : navigation ? navigation : false}}
      pagination={{clickable : pagination ? pagination : false, type : "progressbar"}}
      autoplay = {autoPlay? {delay : 2000} : false} 
      scrollbar={{ draggable: scrollbar? scrollbar : false }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    > 
   
      {imageURLs.map( (imageURL, index)=>(
        <SwiperSlide  key={index}>
          <img src={imageURL} style={imageStyle} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};