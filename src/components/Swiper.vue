<template>
  <swiper class="swiper-container component" :options="swiperOption">
    <swiper-slide
      v-for="(item, index) in swiperList"
      :key="index"
    >
      <div class="flex">
        <div v-if="sensitive">
          <span class="min mr-2">敏</span>
        </div>
        <div v-if="warning">
          <span class="warning mr-2">
            <Icon type="md-notifications-outline" />
          </span>
        </div>
        <div>
          <router-link :to="'/current/detail/'+item.id" target="_blank">
            <span v-html="item.content" />
          </router-link>
          <ul class="flex justify-start items-center" style="padding-top: 16px">
            <li class="swiper-li" v-html="item.ins_time" />
            <Divider type="vertical" />
            <li class="swiper-li" v-html="item.sourceName" />
          </ul>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// Swiper
import { Swiper as SwiperClass, Mousewheel, Autoplay } from 'swiper/swiper.esm';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

SwiperClass.use([Mousewheel, Autoplay]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
import 'swiper/swiper-bundle.css';

export default {
  name: 'SwiperExampleDefault',
  title: 'Default',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperList: {
      type: Array,
      default: () => []
    },
    sensitive: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        slideClass: 'custom-slide-class',
        autoHeight: true,
        hide: true,
        loop: true,
        mousewheel: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        breakpoints: {
          1280: {
            slidesPerView: 5
          },
          1024: {
            slidesPerView: 4
          },
          768: {
            slidesPerView: 3
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 470px;
  overflow: hidden;
  scroll-behavior: smooth;
  .custom-slide-class {
    height: 100%;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 8px 0;
    margin: 10px 0;
    border-bottom: 1px solid #e8eaec;
    transition-property: transform;
  }
}
.min {
  width: 20px;
  height: 20px;
  line-height: 1.7;
  background-color: #f57676;
  color: #fff;
  text-align: center;
  display: inline-block;
}
.warning {
  width: 20px;
  height: 20px;
  line-height: 1.7;
  background-color: #f90;
  color: #fff;
  text-align: center;
  display: inline-block;
}
.swiper-li {
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.45);
}
</style>
