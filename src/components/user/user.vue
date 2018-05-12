<template>
  <div>
  <div class="allFormPC bg" ref="dis">
  <div class="container">
    
    <div class="back "><span class="iconfont icon-icon-" @click="dispplear"></span></div>
    <div class="login" ref="log">
      <div class="mentionlogin"><span class="iconfont icon-denglu"></span></div>
<div class="form">
  <div class="input">
  <input type="text"  placeholder="请输入用户名" ref="plName" />
  <input type="password" placeholder="请输入密码" ref="plPass" />
  </div>
  <div  class="submit">
    <input type="submit" @click="loginSubmit" value="登录"/>
    <div class="act">
      <a @click="registerShow">还没有账号，我要去注册>></a>
    </div>
    
  </div>
  </div>

    </div>
    <div class="register" ref="reg" style="display:none">
      <div class="mentionregist"><span class="iconfont icon-zhuce"></span></div>
<div class="form">
  <div class="input">
  <input type="text"   placeholder="用户名不超过6位" ref="prName"/>
 <input type="password"  placeholder="密码6至8位" ref="prPass"/>
  </div>
  <div  class="submit">
    <input type="submit" @click="registSubmit" value="注册"/>
    <div class="act">
      <a @click="loginShow">已有账号，我要去登录>></a>
    </div>
  </div>
  
</div>
    </div>
  </div>
  </div>
  <transition name="close">
  <div @click="closeList" class="ismask" v-if="showFlag">
  <div  class="Mcontainer" >
    <div class="Mlist">
      <div class="detail" ref="avatar">
 <img src="../../common/image/head.jpg" alt="">
      </div>
      
      <ul>
        <li>用户名:<span ref="username">未登录</span></li>
        <li>身份:<span ref="isvip">游客</span></li>
        <div class="mform"  @click.stop>
        <div class="form">
          <input type="text" ref="mlName" @focus="hideava"  placeholder="用户名">
          <input type="password" ref="mlPass" @focus="hideava"  placeholder="密码">
          <div>
            <input type="submit" class="submit"  @click="loginSubmit"  value="登录">
          </div>
        </div>
        <div class="regstate">
         <div class="form">
          <input type="text" ref="mrName" @focus="hideava"  placeholder="用户名不超过6位">
          <input type="password" ref="mrPass" @focus="hideava" placeholder="密码6至8位">
          <div>
            <input type="submit" class="submit" @click="registSubmit"  value="注册">
          </div>
        </div>
        </div>
        
      </div>
        <div class="place"></div>
        <li  @click.stop>账号问题</li>
        <div></div>
        <li  @click.stop>客服</li>
        <div></div>
        <li  @click.stop>建议</li>
        <div></div>
        <li  @click.stop>联系方式</li>
        <div></div>
        <li  @click.stop>关于本站</li>        
      </ul>
      
    </div>
    <div> 
    </div>
    </div>
  </div>
  </transition>
  </div>
</template>
<script>
import {subLogin,subRegist} from '../../api/user';
import {mapMutations} from "vuex";

window.addEventListener('touchmove',function(e){
    document.getElementsByClassName('ismask')[0].click();
})
export default {
   props: {
      showFlag: {
        type: Boolean,
        default: false
      }
    },
  data(){
    return{
      logname:'',
      logpass:'',
      regname:'',
      regpass:'',
      name:''
    }
  },
  methods:{
    hideava(){
      this.$refs.avatar.style.display="none";
    },
    loginSubmit(){
      let pname=this.$refs.plName.value;
      let ppass=this.$refs.plPass.value;
      let mname=this.$refs.mlName.value;
      let mpass=this.$refs.mlPass.value;
      this.logname=pname?pname:mname;
      this.logpass=ppass?ppass:mpass;
      subLogin(md5(this.logname+'呵呵'),md5(this.logpass+'呵呵')).then(res=>{
        if(res==='OKlog'){
          this.name='欢迎您，'+this.logname;
          this.$refs.username.innerText=this.logname;
          this.$refs.isvip.innerText='会员';
          this.$emit('ievent',this.name);
          this.$refs.avatar.style.display="block";
          this.setUser(true);
          this.dispplear();
        }else{
          alert('对不起，您所填写的信息有误，请检查后重新提交！');
          return;
        }
      })
    },
    registSubmit(){
      let pname=this.$refs.prName.value;
      let ppass=this.$refs.prPass.value;
      let mname=this.$refs.mrName.value;
      let mpass=this.$refs.mrPass.value;
      this.regname=pname?pname:mname;
      this.regpass=ppass?ppass:mpass;
    if(this.regname.length>5||this.regname.length==0){
        alert('用户信息填写不规范，请检查后重新提交');
        return;
    }
    if(this.regpass.length>8||this.regpass.length<6){
        alert('用户信息填写不规范，请检查后重新提交');
        return;
    }
    subRegist(md5(this.regname+'呵呵'),md5(this.regpass+'呵呵')).then(res=>{
        if(res==='OKreg'){
          this.name='欢迎您，'+this.regname;
          this.$refs.username.innerText=this.regname;
          this.$refs.isvip.innerText='会员';
          this.$emit('ievent',this.name);
          this.$refs.avatar.style.display="block";
          this.setUser(true);
          this.dispplear();
        }else{
          alert('对不起，此用户名被注册，请检查后重新注册！');
          return;
        }
      })
    },
    loginShow(){
      this.$refs.log.style.display="block";
      this.$refs.reg.style.display="none";
    },
    registerShow(){
     this.$refs.log.style.display="none";
      this.$refs.reg.style.display="block";
    },
    dispplear(){
      this.$emit('child-say',false);
      this.$refs.dis.style.display="none";
    },
    closeList(){
      this.showFlag=false;
      this.$emit('child-say',false);
    },
    ...mapMutations({
    setUser: "SET_USER",
  })
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
*{
  padding:0;
  margin: 0;
  list-style: none;
}
@media screen and (min-width: 750px) {
.Mcontainer{
  display: none;
}

.back{
  width: 30px;
  height: 30px;
  color:black;
  position: relative;
  top:-15px;
  right: -340px;

  .iconfont{
    font-size: 30px;
    cursor: pointer;
  }
}
.mentionlogin,.mentionregist{
  width: 100px;
  height: 35px;
  text-align: center;
  margin: 0 auto;
  margin-top:-18px; 
  .iconfont{
    font-size:30px;
  }
}
} 
.bg{
  background: rgba(255,255,255,0.1)
}

.allFormPC{
  position: absolute;
  width: 100%;
  top:114px;
  left:0;
  bottom:0;
  right:0;
  z-index:5555;
  background: cover;
}
.act{
  width: 400px;
  text-align: center;
  user-select:none;
  a{
  font-size:12px;
  color:blueviolet;
  display:inline-block;
  margin: 5px;
  cursor: pointer;
  &:active{
     color:blueviolet;
  }
}
}
.container{
  min-height:200px;border:1px solid #aaa;
  position: fixed;
  top:130px;
  left:0;
  right:0;
  width: 370px;
  text-align: right;
  margin:5% auto; 
  padding-top:1%; 
  background-color:rgba(255,255,255,0.95);
  .form{
    width: 50%;
    height: 80%;
      .input{
        text-align: right;
        width: 280px;
        height: 80px;
        margin: 5px;
        input{
          height: 30px;
          margin: 5px;
        }
      }
      .submit{
        width: 100%;
        height: 30px;
        margin: 0 auto;
        input{
          display:block;
          width: 70px;
          height: 100%;
          margin-left: 160px;
        }
      }
    }
    
  }
@media screen and (max-width: 750px) {
  input{
    background-color:rgba(65, 161, 128,0);
    display: block;
    margin:5px auto;
    max-width: 90%;
    outline:none;
    border:0;
    border-bottom:1px solid #fff;
    color:#fff;
  }
  .submit{
    border:0;
  }
  .allFormPC{
    display: none;
  }
  .ismask{
    position: fixed;
    background:rgba(255,255,255,0);
    width: 100%;
    height: 100%;
  }
  .Mcontainer{
    position: fixed;
    width: 56%;
    top:69px;
    left:0;
    bottom:0;
    color:#fff;
    height: 100%;
    background-color:rgba(65, 161, 128,0.9);
    z-index:5555;
    .Mlist{
      width: 100%;
      .detail{
        width: 100%;
        height: 80px;
        color:fff;
        img{
          width: 68px;
          float:center;
          margin: 18px auto 0 0;
          border-radius: 50%;
        }
      }
      ul{
        margin-top:28px;
        li{
          font-size:8px
          
      }div{
            display:block;
            width: 100%;
            height: 2px;
          }
          .place{
            height: 30px;
            border: 0px;
          }

        }
        .mform{
          background-color:rgba(65, 161, 128,0);
          margin: 20px 0 30px 0;
          height: 80px;
          border: 0px;
          .regstate{
            margin-top:66px;
            margin-bottom:20px;
          }
        }

      }
    }
  .form{
    margin: 20px auto;
  }
.close-leave-active,.close-enter-active  {
  transition: all .3s linear;
}
 .close-leave-active {
  transform: translateX(-100%);
}
 .close-enter-active {
  transform: translateX(100%);
}
}
</style>


