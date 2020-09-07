<template>
  <view>
    <view class="news_item" v-for="(item,index) in list" @click="goD(item.id)">
      <image :src="item.img_url"></image>
      <view class="right">
        <view class="tit">
          {{item.title}}
          
        </view>
        <view class="info">
          <text>时间:{{item.add_time | changeData}}</text>
          <text>浏览次数:{{item.click}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script type="text/javascript">
export default {
  name: "app",
  props:['list'],
  data() {
    return {

    }
  },
  components: {
  },
  filters:{
    changeData(date){
      console.log(date);
      const nDate = new Date(date);
      const year = nDate.getFullYear();
      const month = (nDate.getMonth()+1).toString().padStart(2,0);
      const day = nDate.getDay().toString().padStart(2,0);
      return year+'-'+month+'-'+day

    }
  },
  methods:{
    goD(id){
      console.log(id);
      
      this.$emit('itemClick',id)
    }
  }
  
}
</script>

<style scoped lang="scss">
  view.news_item {
      display: flex;
      padding:10rpx 20rpx;
      border-bottom:2rpx solid $shop-color;
      image {
        max-width: 200rpx;
        min-width: 200rpx;
        height: 150rpx;
      }

      .right {
        margin-left: 15rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        view.tit {
          font-size: 30rpx;
        }

        view.info {
          font-size: 24rpx;
          text:nth-child(2){
            margin-left:30rpx;
          }
        }
      }
    }
</style>
