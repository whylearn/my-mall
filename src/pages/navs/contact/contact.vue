<template>
  <view class="contact">
    <image class="img" src="../../../static/img/logo.png"></image>
    <view class="info">
      <view @click="callPhone">联系电话:1111111111 (点击拨打)</view>
      <view>联系地址:河北省XXXXXXX</view>
    </view>
    <map class="map" name="" :longitude="longitude" :latitude="latitude" :scale="scale" :markers="covers"></map>
  </view>
</template>

<script type="text/javascript">
  export default {
    name: "app",
    data() {
      return {
        longitude: 114.28,
        latitude: 38.11,
        scale: 11,
        covers: [{
          latitude: 114.28,
          longitude: 38.11,
          iconPath: '../../../static/img/logo.png',
          width: 30,
          height: 30

        }]
      }
    },
    components: {
    },
    methods: {
      callPhone() {
        uni.makePhoneCall({
          phoneNumber: '11111111'
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .contact {
    .img {
      width: 750rpx;
      height: 320rpx;
    }

    .info {
      padding: 20rpx;
      font-size: 40rpx;

      view {
        line-height: 50rpx;
        border-bottom: 5rpx solid #eee;
      }
    }

    .map {
      width: 750rpx;
      height: 700rpx;
    }
  }
</style>