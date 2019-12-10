<template>
  <div class="about">
    <img v-for="(img,n) in imageList" v-lazy="img" :key="n" width="100%" >
  </div>
</template>
<script>
  // import 'vant/lib/toast/style'
  // import Toast from 'vant/lib/toast'

  export default {
    name: 'home',
    data() {
      return {
        imageList: [],
      }
    },
    created() {
      this.getAboutImg()
    },
    methods: {
      getAboutImg(){
        this.$fetch("user_get_article",{article_id:1}).then((msg) => {
          let imgbody=msg.article_body;
          let reimg= /<[img|href][^>]*src\s*=\s*('|")?([^'">]*)\1([^>])*>/ig;
          let scrimgurl =/src=['|"]?([^'">]*)['|"]/;
          let arr=imgbody.match(reimg);
          let imgurl=[];
          let url=null;
          for(let i=0;i<arr.length;i++){
            imgurl=arr[i].match(scrimgurl);
            imgurl.shift();
            url=imgurl.join(',');
            this.imageList.push(url)
          }
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .about{
   img{
     display:block;
     vertical-align: middle;
   }
  }
</style>
