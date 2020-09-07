<template>
	<view class="home">
		<swiper class="swiper" :interval="5000" :duration="500" indicator-dots circular>
			<swiper-item v-for="(item,index) in swiper" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
	</swiper>
	<!-- 导航 -->
	<view class="nav">
		<view class="nav_item" v-for="(item,index) in navs":key="index" @click="navItemClick(item.path)">
			<view :class="item.icon"></view>
			<text>{{item.title}}</text>
		</view>
		
	</view>
	<!-- 推荐商品 -->
	<view class="hot_goods">
		<view class="tit">推荐商品</view>
		<goods-list :goods="goods" @goGoodItem="goGoodsDetail"></goods-list>
	</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList.vue'
	export default {
		components:{
			goodsList
		},
		data() {
			return {
				swiper:[],
				goods:[],
				navs:[
					{
					icon:'iconfont icon-ziyuan',
					title:'我的超市',
					path:'/pages/navs/goods/goods'
				},
				{
					icon:'iconfont icon-guanyuwomen',
					title:'联系我们',
					path:'/pages/navs/contact/contact'
				},
				{
					icon:'iconfont icon-tupian',
					title:'精美图片',
					path:'/pages/navs/pics/pics'
				},
				{
					icon:'iconfont icon-shipin',
					title:'精彩视频',
					path:'/pages/navs/videos/videos'
				}
				]
			}
		},
		onLoad() {
			this.getSwiper()
			this.getHotGoods()
		},
		methods: {
			async getSwiper(){
				const res = await this.$request({
					url:'/api/getlunbo',
				})
				console.log(res);
				this.swiper = res.data.message
				
			},
			async getHotGoods(){
				const res = await this.$request({
					url:'/api/getgoods?pageindex=1'
				})
				console.log(res);
				this.goods = res.data.message
			},
			//物品详情页
			goGoodsDetail(id){
			
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail?id='+id
				})
			},
			// 导航跳转
			navItemClick(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.home{
		.swiper{
		width: 750rpx;
		height: 380rpx;
			swiper-item{
				image{
					width: 100%;
				}
			}
		}
		.nav{
			display: flex;
			
			.nav_item{
				width: 25%;
				text-align:center;
				view{
					width: 120rpx;
					height: 120rpx;
					background-color: $shop_color;
					border-radius:60rpx;
					margin:20rpx auto;
					line-height: 120rpx;
					color: azure;
					font-size: 50rpx;
				}
				.icon-tupian{
					font-size: 45rpx;
				}
				text{
					font-size: 30rpx;
				}
			}
		}
		.hot_goods{
			background:#eee;
			overflow: hidden;
			margin-top: 10rpx;
			.tit{
				color: $shop_color;
				text-align:center;
				background:#fff;
				margin:10rpx 0;
			}
			
		}
	}
	
</style>
