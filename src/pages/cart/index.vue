<template>
  <view class="cart">
    <view class="cartTop">
      <view class="cartItem" v-for="(item,index) in goodsList" :key=item.id>
        <image :src="item.goods_url"></image>
        
        <text class="tit">{{item.title}}</text>
        <text class="val">{{item.goods_now_val||showPrice}}</text>
        <button class="btn" size="mini" @click="delBtn(item.id)">删除</button>
       
      </view>
    </view>
  </view>
</template>

<script type="text/javascript">
export default {
  name: "app",
  data() {
    return {
      goodsList:[]
    }
  },
  components: {
  },
  methods:{
    async getChart(){
      const res = await this.$request({
        url:'/api/getchart/1',
      })
      console.log(res);
      
      this.goodsList = res.data.message
    },
    async getChartnum(){
      const res = await this.$request({
        url:'/api/getchartnum/0',
      })
     
      
    },
    async delgoods(id){
      const res = await this.$request({
        method:"POST",
        url:'/api/delchart/'+id,
      })
      this.getChart()
    },
    delBtn(id){
      this.delgoods(id)
    }
  },
  onLoad(){
    this.getChart()
    this.getChartnum()
  },
  onShow(){
    this.getChart()
    this.getChartnum()
  },
  filters:{
				showPrice(price){
					return '¥'+price.toFixed(2);
				}
			}
}
</script>

<style scoped lang="scss">
 
  view.cart {
  view.cartTop {
    
    view.cartItem {
      border-top:4rpx solid #ccc;
      display: flex;
      justify-content:space-between;
      align-items:center;
      image {
        width: 200rpx;
        height: 250rpx;
        padding: 20rpx;
      }

      .tit {
        font-size: 30rpx;
       flex:1;
      }
      .val{
        font-size: 30rpx;
      }
     
        .btn{
          width: 150rpx;
          white-space: nowrap;
        }

     

    }
  }
}
</style>
