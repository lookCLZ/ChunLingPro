<template>
  <div class="padding">
      <div class="recommend" ref="recommend" id="recommend">
        <!-- 轮播图 -->
        <div class="slider hidden">
           <el-carousel :interval="2000" arrow="always" class="sliderimg">
            <el-carousel-item v-for="item in recommends" :key="item">
      <img class="needsclick"  v-lazy="item.url">
    </el-carousel-item>
  </el-carousel>
        </div>
        <div class="mslider">
 <mt-swipe :auto="2000">
  <mt-swipe-item  v-for="item in recommends" :key="item">
    <img class="needsclick"  v-lazy="item.url">
    </mt-swipe-item >
</mt-swipe>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend-list">
          <p class="list-title">酷猫推荐</p>
           <ul id="ul">
            <el-row :gutter="4">
            <li v-for="(item, index) in myrecommends" :key="item">
              <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4"  ><div class="grid-content bg-purple">
                 <div class="icon" @click="selectItem(item, index)"> 
                  <img v-lazy="item.image">
                  <div class="text">
                <span class="name" v-text="item.name"></span>
                <p class="desc" v-html="item.detail"></p>
              </div>
             </div>
                </div>
                </el-col>          
            </li>
            </el-row>
          </ul>
          <!-- <p><br><br></p>
          <p class="list-title">其他歌单</p>
          <ul id="ul">
            <el-row :gutter="4">
            <li v-for="item in recommendList" :key="item" @click="setDesc(item)" >
              <router-link tag="a" :to="{ name: 'ListDesc', params: { id: item.dissid}}">
              <el-col  :xs="12" :sm="10" :md="8" :lg="6" :xl="4" ><div class="grid-content bg-purple">
                 <div class="icon"> 
                  <img v-lazy="item.imgurl">
                  <div class="text">
                <span class="name" v-html="item.creator.name"></span>
                <p class="desc" v-html="item.dissname"></p>
              </div>
             </div>
                </div>
                </el-col>    
              </router-link>      
            </li>
            </el-row>
          </ul> -->
        </div>
      </div>
  </div>
</template>
<script>
 import {mapMutations,mapActions} from 'vuex';
 import {ERR_OK,commonParamsList,urlList} from '../../api/config.js';
 import {getRecommend,getSwapper} from '../../api/recommend';
 import { createReSong } from "../../common/js/resong";
 import {star} from '../../common/js/texiao';

export default {
  data(){
    return {
      recommends:[],
      myrecommends:[],
      recommendList:[]
    }
  },
  created(){
    this.starBg();
    this._getSwapper();
    this._getRecommend();
    this.$axios.get(urlList,{params:commonParamsList})
    .then(res=>{
      if (res.data.code === ERR_OK) {
           this.recommendList=res.data.data.list;
      }
    })
  },
  methods:{
    starBg(){
      if(window.innerWidth>750){
        star(10,2000);
      }
    },
    _getSwapper(){
      getSwapper().then(res=>{
        this.recommends=res;
      })
    },
    _getRecommend(){
      getRecommend().then(res=>{
         this.myrecommends=this._normalizeSong(res);
      })
    },
    _normalizeSong(list){
       let ret=[];
       list.forEach((musicData)=>{
         if(musicData.id&&musicData.mid){
           ret.push(createReSong(musicData));
         }
       })
       return ret;
     },
    setDesc(item){
      this.setDesc(item);
    },
   selectItem(item, index) {
    this.selectPlay({
        list: this.myrecommends,
        index
      });
    },
    ...mapActions(["selectPlay"]),
    ...mapMutations({
      setDesc:'SET_DESC'
    })
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>

*{
  padding:0px;
  margin:0px;
  list-style: none;
}
button.el-carousel__button{
  height: 30px;
  position: relative;
  z-index: 2;
}
@media screen and (min-width: 750px) {
  .recommend{ 
  background-color: rgb(0, 0, 0);
}
   #ul li .icon{
   height: 266px;
   margin: 0 auto;
   position: relative;
   z-index: 2;
   img{
     width: 66%;
     border-radius: 50%;
     cursor: pointer;
     &:hover{
      animation:rot 8s linear infinite;
   }
   } 
 }
} 
.recommend{
  width:100%; 
  min-height:668px; 
  background-size:contain; 
}
.mslider{
  display:none;
  width: 100%;
  height: 150px;
  img{
    width:100%;
    height: 100%;
  }
}

.slider{
  margin:0 auto;
  max-width: 700px;
  max-height: 328px;
}
.recommend-list{
  margin:0 auto;
}
 .el-carousel__item{ 
   max-height: 328px;
    img {
    font-size: 18px;
    line-height: 328px;
    margin: 0;
  }
 }
 recommend-list{
   margin: 0 auto;
 }
 recommend{
   margin: 0 auto;
 }
 ul{
   width:80%;
   margin:0 auto;
 }

 ul li .icon{
   height: 200px;
   margin: 0 auto;
   img{
     width: 80%;
     border-radius: 20px;
     cursor: pointer;
   } 
 }

span.name{
     color:#6185b6;
     font-family: 'Courier New', Courier, monospace;
     font-size: 15px;
   }
  p.desc{
     color:#778eaf;
     width:80%;
     text-align: center;
     text-indent: 2em;
     margin:0 auto;
     font-family: 'Courier New', Courier, monospace;
     font-size: 8px;
   }
   p.list-title{
     padding:0;
     height:30px;
     font-size: 18px;
   }
  



 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    width:100%;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  @keyframes rot {
            0%{

            }
            100%{
                transform:rotateZ(360deg);
            }
        }

  @media screen and (max-width: 750px) {
  @import '../../common/less/padding.less';
    .hidden{
      display: none;
    }
    .mslider{
      display:block;
    }
    #recommend{
      p.list-title{
        font-size:13px;
        color:rgb(214, 147, 147);
      }
    span.name{
     color:rgb(214, 147, 147);
     font-family: 'Courier New', Courier, monospace;
     font-size: 15px;
   }
  p.desc{
     color:rgb(214, 147, 147);
     font-family: 'Courier New', Courier, monospace;
     font-size: 8px;
   }
    }
}
</style>


