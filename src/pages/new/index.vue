<template>
  <view class="news">
    <news-item :list="newsList" @itemClick="goDetail"></news-item>
  </view>
</template>

<script type="text/javascript">
import newsItem from '../../components/newsItem.vue'
  export default {
    name: "app",
    data() {
      return {
        newsList:[]
      }
    },
    components: {
      newsItem
    },
    methods:{
      async getNews(){
        const res = await this.$request({
          url:'/api/getnewslist',
        })
        this.newsList = res.data.message; 
      },
      goDetail(id){
       
        uni.navigateTo({
          url:'/pages/news-detail/index?id='+id
        });
      }
    },
    onLoad(){
      this.getNews()
    }
  }
</script>

<style scoped lang="scss">
  view.news {
    
  }
</style>