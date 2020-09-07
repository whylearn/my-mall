<template>
  <view class="pics">
    <scroll-view class="left" scroll-y>
      <view v-for="(item,index) in categoryList" id="demo1" 
      :class="active===index?'active':''" :key="item.id" 
      @click="getRightData(index,item.id)">
        {{item.title}}
      </view>
    </scroll-view>
    <scroll-view class="right" scroll-y>
      <view v-if="rightData.length==0">
        暂无数据
      </view>
      <view v-else class="rightItem" v-for="(item,index) in rightData" :key="item.id">
        <image :src="item.img_url" @click="previewImg(item)"></image>
        <text>{{item.title}}</text>
      </view>
      
    </scroll-view>
  </view>
</template>

<script type="text/javascript">
  export default {
    name: "app",
    data() {
      return {
        categoryList:[],
        active:0,
        rightData:[]
      }
    },
    components: {
    },
    methods:{
      async picsCategory(){
        const res = await this.$request({
          url:"/api/getimgcategory",
        })
        this.categoryList = res.data.message
        this.getRightData(0,this.categoryList[0].id)
      },
      //获取右侧数据
      async getRightData(index,id){
        this.active = index
        console.log(id);
        
        const res = await this.$request({
          url:"/api/getimages/"+id
        })
        
        this.rightData = res.data.message
        
      },
      previewImg(item){
        const urls = this.rightData.map(item=>{
          return item.img_url
        })
        console.log(urls);
        
        uni.previewImage({
          current: item.img_url,   
          urls:urls,  
        })
      }
      
    },
    onLoad(){
      this.picsCategory()
    }
  }
</script>

<style scoped lang="scss">
  page{
    height: 100%;
  }
  .pics{
    height: 100%;
    display: flex;
    .left{
      width: 200rpx;
      height: 100%;
      border-right:2rpx solid #eee;
      view{
        height: 120rpx;
        line-height: 120rpx;
        color:#333;
        text-align: center;
        font-size: 30rpx;
        border-top:2px solid #eee;
      }
      .active{
        background:$shop-color;
        color:#fff;
      }
    }
    .right{

      height: 100%;
      width: 520rpx;
      margin: 10rpx auto;
      .rightItem{
        image{
          width: 520rpx;
          height: 520rpx;
          border-radius:10rpx;
        }
        text{
          font-size: 30rpx;
          line-height: 60rpx;
        }
      }
    }
  }
</style>