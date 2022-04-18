<template>
  <el-container>
    <el-header
        style="width:100%;height:70px;background:white;border-bottom:1px solid  #d7d7d7;box-sizing: border-box;align-items:center;display:flex;justify-content:space-between">
      <img style="height: 80%" src="../../assets/logo.png"/>
      <div
          style="display:flex;align-content:center;justify-content:space-around;height:40px;width:250px;align-items:center;margin-right:40px">
        <img src='../../assets/inform_icon.svg' style="width:25px;height:30px;"><img src="../../assets/task_icon.svg"
                                                                                     style="width:40px;height:30px;">
        <el-dropdown
    placement="bottom"
    trigger="hover"
    size="default"
  >
      <div style="width:45px;height:45px;border-radius:50%;background: #016fa0;color:white;font-family: 'Arial Normal', 'Arial', sans-serif;
  font-weight: 700;text-align:center;line-height:45px;font-size:25px">A
        </div>
    <template #dropdown>
    <div style="height:50px;width:80px;display:flex;justify-content:center;align-items:center">
          <el-button style="color:grey" type="text" size="large" @click="logout">
      退出登入
    </el-button>
    </div>
    </template>
  
  </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside
          style="width:75px;background: #40444d;height:calc(100vh - 70px);justify-content:center;display:flex;flex-wrap:wrap">
        <div style="justify-content:center;display:flex;flex-wrap:wrap;width:100%;height:100px;margin-top:10px">
          <router-link to="/student/home" style="justify-content:center">
            <div class="navframe">
              <img src="../../assets/home_icon.svg" style="width:25px;height:20px">
              <div style="width:100%;text-align:center">主页</div>
            </div>
          </router-link>
          <router-link to="/student/examination" style="justify-content:center">
            <div class="navframe">
              <img src="../../assets/testpaper_icon.svg" style="width:20px;height:25px">
              <div style="width:100%;text-align:center">考试</div>
            </div>
          </router-link>
         <router-link to="/student/grade" style="justify-content:center">
            <div class="navframe">
              <img src="../../assets/grade_icon.svg" style="width:25px;height:20px">
              <div style="width:100%;text-align:center">成绩</div>
            </div>
          </router-link >
          </div>
        </el-aside>
        <el-main style="margin:0;padding:0;height: calc(100vh - 70px)">
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
      </el-container>
    </el-container>

</template>
<script>
export default {
  methods:{
     logout(){
      sessionStorage.removeItem('token')
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="scss" scoped>


a {
  text-decoration: none;
  height: 60px
}

.navframe:hover {
  background: #212231;
  color: #f8c863;

}

.navframe:hover img {
  position: relative;
  left: -80px;
  filter: drop-shadow(80px 0 #f8c863);
}

.router-link-active img {
  position: relative;
  left: -80px;
  filter: drop-shadow(80px 0 #f8c863);
}

.router-link-active .navframe {
  color: #f8c863;
  background: #212231;

}

.navframe {
  color: white;
  align-content: center;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  z-index: 100;
}
</style>
