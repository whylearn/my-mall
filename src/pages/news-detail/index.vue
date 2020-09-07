<template>
  <view class="news_detail">
    <text class="title">{{detail.title}}</text>
    <view class="info">
      <text>发表时间:{{detail.add_time | formaDate}}</text>
      <text>浏览次数:{{detail.click}}</text>
    </view>
    <view class="content">
      <rich-text :nodes = "detail.content"></rich-text>
    </view>
  </view>
</template>

<script type="text/javascript">
export default {
  name: "app",
  data() {
    return {
      id:0,
      detail:{}
    }
  },
  components: {
  },
  methods:{
   async getDetail(){
    const res = await this.$request({
      url:'/api/getnew/'+this.id
    })
    console.log(res);
    this.detail = res.data.message[0]
    
    
    }
  },
  onLoad(options){
    this.id = options.id
    this.getDetail()
  }
}
</script>

<style scoped lang="scss">
  view.news_detail {
    font-size: 30rpx;
    padding: 0 20rpx;
  .title {
    text-align: center;
    width:710rpx;
    display:block;
    margin: 20rpx 0;
  }

  view.info {
    display: flex;
    justify-content: space-between;
    text {

    }
  }

  view.content {
    margin-top: 30rpx;
  }
}
</style>
