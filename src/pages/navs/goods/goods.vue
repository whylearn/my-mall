<template>
  <view class="goods_list">
    <goods-list :goods="goods" @goGoodItem="goGoodsDetail"></goods-list>
    
  </view>
</template>

<script type="text/javascript">
import goodsList from '../../../components/goodsList.vue'
export default {
  name: "app",
  data() {
    return {
      pageindex:1,
      goods:[],
      flag:false
    }
  },
  components: {
    goodsList
  },
  methods:{
    async getGoodsList(callBack){
      const res = await this.$request({
        url:'/api/getgoods?pageindex='+this.pageindex,
      })
      this.goods = [...this.goods,...res.data.message]
      callBack && callBack()
    },
    //物品详情页
			goGoodsDetail(id){
      uni.navigateTo({
        url:'/pages/goodsDetail/goodsDetail?id='+id
      })
    },
  },
  onLoad(){
    this.getGoodsList()
  },
  onReachBottom(){
    if(this.flag){
      uni.showToast({
        title:"到底了",
        icon:'none'
      })
    }
    if(this.goods.length<this.pageindex*10){
      uni.showToast({
        title:"到底了",
        icon:'none'
      })
        return this.flag = true
    }
    this.pageindex++
    this.getGoodsList()
    
    console.log('ddd');
    
  },
  onPullDownRefresh(){
    console.log('下拉刷新');
    this.pageindex=1;
    this.goods=[];
    this.flag=false
    setTimeout(()=>{
      this.getGoodsList(()=>{
        uni.stopPullDownRefresh();
      })
    },1000)
  }
}
</script>

<style scoped lang="scss">
  .goods_list{
    background:#ccc;
  }
</style>
