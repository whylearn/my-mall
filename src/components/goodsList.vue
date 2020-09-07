<template>
  <view class="good_list">
    <view class="good_item" v-for="(item,index) in goods" :key="item.id" @click ="goodItem(item.id)">
      <image :src="item.img_url"></image>
      <view class="price">
        <text>{{item.sell_price}}</text>
        <text>{{item.market_price}}</text>
      </view>
      <view class="good_name">
        {{item.title}}
      </view>
    </view>
  </view>
</template>

<script type="text/javascript">
  export default {
    name: "app",
    props:['goods'],
    data() {
      return {

      }
    },
    components: {
		},
		methods:{
			goodItem(id){
				this.$emit('goGoodItem',id)
			}
		}
  }
</script>

<style scoped lang="scss">
  .good_list{
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.good_item{
					background:#fff;
					width:355rpx;
					padding:15rpx;
					box-sizing:border-box;
					margin-bottom:20rpx;
					image{
						width: 80%;
						height: 450rpx;
						display: block;
						margin: 0 auto;
					}
					.price{
						color: $shop_color;
						font-size:30rpx;
						margin:15rpx 0 5rpx 0;
						text:nth-child(2){
							color: #ccc;
							font-size: 28rpx;
							margin-left:20rpx;
							text-decoration:line-through;
						}
					}
					.good_name{
						font-size: 32rpx;
						line-height: 38rpx;
						margin-top:10rpx;
						margin-bottom: 15rpx;
					}
				}
			}
</style>