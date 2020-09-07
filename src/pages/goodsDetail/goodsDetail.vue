<template>
  <view class="goods-detail">
    <swiper indicator-dots>
      <swiper-item v-for="(item,index) in swipers" :key="index" >
        <image :src="item.src"></image>
      </swiper-item>
    </swiper>
    <view class="box1">
      <view class="price">
        <text>{{info.sell_price}}</text>
        <text>{{info.market_price}}</text>
      </view>
      <view class="goodName">{{info.title}}</view>
    </view>
    <view class="line"></view>
    <view class="box2">
      <view>货号:{{info.goods_no}}</view>
      <view>库存:{{info.stock_quantity}}</view>
    </view>
    <view class="line"></view>
    <view class="box3">
      <view class="tit">{{info.title}}</view>
      <view class="content">
        <rich-text :nodes = "content"></rich-text>
      </view>
    </view>
    <view class="goodsNav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script type="text/javascript">
import uniGoodsNav from '@dcloudio/uni-ui/lib/uni-goods-nav/uni-goods-nav.vue'
export default {
  name: "app",
  data() {
    return {
      id:0,
      swipers:[],
      info:{},
      content:'',
      options: [{
            icon: 'headphones',
            text: '客服'
        }, {
            icon: 'shop',
            text: '店铺',
            info:0,
            infoBackgroundColor:'#007aff',
            infoColor:"red"
        }, {
            icon: 'cart',
            text: '购物车',
            info: 0
        }],
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
        ],
        chartList:{}
    }
  },
  components: {
    uniGoodsNav
  },
  methods:{
    async getSwiper(){
      const res = await this.$request({
        url:'/api/getthumimages/'+this.id,
      })
      //  console.log(res);
      this.swipers = res.data.message
      this.chartList.goods_url = this.swipers[0].src
    },
    async getInfo(){
      const res = await this.$request({
        url:'/api/goods/getinfo/'+this.id
      })
      //  console.log(res);
       this.info = res.data.message[0]
       this.chartList.goods_id = this.info.id
       this.chartList.goods_now_val = this.info.sell_price
       this.chartList.goods_val = this.info.market_price
       this.chartList.title = this.info.title
       this.chartList.goods_num = 1
// console.log(this.chartList);

    },
    async getContent(){
      const res = await this.$request({
        url:'/api/goods/getdesc/'+this.id
      })
      // console.log(res);
      
      this.content = res.data.message[0].content;
      
    },
    async addChart(){
      const res = await this.$request({
        method:'POST',
        url:'/api/addchart',
        data:this.chartList
      })
    },
    async chartNum(){
      const res = await this.$request({
        url:'/api/getchartnum/1'
      })
      this.options[2].info = res.data.message[0]['count(*)']
      
    },
    onClick (e) {
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
        uni.switchTab({
            url:'/pages/cart/index'
          })
        if(e.content.text =='购物车'){
          console.log('ssss');
          uni.navigateTo({
            url:'/pages/cart/index'
          })
        }
         
          
      },
      buttonClick (e) {
       
        this.addChart()
        console.log(e)
        this.options[2].info++

       
      }
   
  },
  onLoad(options){
    this.id = options.id
    this.getSwiper()
    this. getInfo()
    this.getContent()
    
    this.chartNum()
  }
}
</script>

<style scoped lang="scss">
  view.goods-detail {
  swiper {
    height: 700rpx;
    swiper-item {
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .box1{
    .price{
      font-size: 35rpx;
      color:$shop-color;
      line-height:80rpx;
      text:nth-child(2){
        color:#ccc;
        text-decoration: line-through;
        font-size: 30rpx;
        margin-left: 20rpx;
      }
    }
    .goodName{
      line-height: 60rpx;
    }
  }
  .line{
    height: 10rpx;
    width: 750rpx;
    background:#eee;
  }
  .box2{
    padding: 0 20rpx;
    font-size: 32rpx;
  }
  .box3{
    .tit{
      font-size: 32rpx;
      padding:20rpx;
      border-bottom:2rpx solid #eee;
      line-height:70rpx;
    }
    .content{
      font-size: 28rpx;
      padding: 20rpx;
      
    }
  }
  .goodsNav{
    position: fixed;
    bottom: 0;
    width: 100% ;
  }
}
</style>
