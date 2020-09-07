<template>
  <view class="videos">
    <view class="videoList">
      <text :class="{'tit':true,'active':activeIndex==index}" v-for="(item,index) in videoList" :key="item.id" @click="getvideoItem(item.id,index)">{{item.title}}</text>
    </view>
    <view class="line"></view>
    <view class="videoTitle">
      <view class="videoItem" v-for="(item,index) in videoItem" :key="index">
        <image :src="item.img_url"></image>
        <text>{{item.title}}</text>
      </view>
    </view>
  </view>
</template>

<script type="text/javascript">
export default {
  name: "app",
  data() {
    return {
      videoList:[],
      videoItem:[],
      activeIndex:0,
    }
  },
  components: {
  },
  methods:{
    async getvideos(){
      const res = await this.$request({
        url:'/api/getvideocategory',
      })
      this.videoList = res.data.message
    },
    async getvideoItem(id,index){
      const res = await this.$request({
        url:'/api/getvideoitem/'+id
      })

      this.activeIndex =index
      this.videoItem = res.data.message
    }
  },
  onLoad(){
    this.getvideos()
  }
}
</script>

<style scoped lang="scss">
  view.videos {
    
  view.videoList {
    display: flex;
    flex-wrap:wrap;
    
    text.tit {
      width: 24%;
      text-align: center;
      border: 4rpx solid #000;
      box-sizing: border-box;
      margin: 20rpx 0 0 7.5rpx;
    }
    text.active{
      border: 4rpx solid #ccc;
      color: #ccc;
    }
    .videoList::after{
      content: '<text>ssss</text>';
      width: 24%;
    }
  }
  .line{
    margin-top: 10rpx;
    height: 10rpx;
    background: #ccc;
  }
  .videoTitle{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .videoItem{
      margin: 10rpx;
      width: 45%;
      image{
        width: 100%;
      }
      text{

      }
    }
  }
}
</style>
