<template>
  <div class="container"
       style="display:flex;justfy-content:center;background:rgba(242, 242, 242, 0.8);align-items: center;">
<!--    <img src="http://121.196.198.132:7002/exam/examsystem/images/ffb228d9-5f64-4982-a9e1-38c50dfe089c.jpg"/>-->
    <div class="loginframe"
         style="height:100%;width:50%;background: #464969;;align-items:center;float:left;display:flex;">
      <div style="display:flex;justify-content:center;flex-wrap:wrap;width:100%">
        <div class="titleframe"
             style="display:flex;justify-content:center;align-items:center;margin-bottom:100px;width:100%">
          <img style="width: 50%;margin-top: 5%" src="../../assets/logo_nobackground.png">
        </div>
        <div class="inputframe" style="display:flex;justify-content:center">
          <el-form label-position="top" label-width="100px" style="width:500px" size="default" :rules=loginFormRules
                   :model="loginForm">
            <el-form-item label="用户名" prop="username">
              <el-input style="height:100%" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <div slot="label" class="el-form-item__label" style="width:100%;height:22px">
                <span>密码</span>
                <el-button type="text" style="padding:0;float:right;color: #f3cb65">忘记密码？</el-button>
              </div>

              <el-input show-password style="height:100%" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:50px">
              <el-button type="primary" style="margin:0 auto;height:50px;width:100%;background: #5a61aa;border:none"
                         @click="login">登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <span
                  style="font-size:18px;text-align:center;margin:0 auto;color:white; font-family: 'Arial Normal', 'Arial', sans-serif;">还没有账号?<el-button
                  type="text" style="color: #f3cb65;margin-left:5px;font-size:18px">立即注册</el-button></span>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
    <div class="imgframe"
         style="display:flex;float:right;margin:0 auto;width:600px;height:500px;background: #ffffff;justify-content:center;border-radius:4px;align-items: center;">
      <img src="../../assets/login_icon.svg" style="width:500px;height:350px">
    </div>
    <img src="../../assets/login_bottom_icon.png" style="position:absolute;bottom:0;right:0;width:50%;height:auto">
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{require: true, message: "请输入用户名", trigger: blur}],
        password: [{require: true, message: "请输入密码", trigger: blur}]

      }

    }
  },
  methods: {
    login() {
    
      console.log(this.loginForm.username)
      console.log(this.loginForm.password)
      this.$axios.get('http://121.196.198.132:7002/user/auth/login', {params:{
        account: this.loginForm.username,
        pwd: this.loginForm.password
      }}).then(res => {
        
        if (res.code == 200) {
          sessionStorage.setItem('token',res.data.token)
          if (res.data.role == 3) {
            this.$router.push('/admin/home')
          } else if (res.data.role == 1) {
            this.$router.push('/student/home')
          } else if (res.data.role == 2) {
            this.$router.push('/teacher/home')
          }
        } else {
          console.log(res.data.data)
        }
      })
    }
  }

}
</script>

<style scoped>


.el-form-item {
  margin-bottom: 10px;
}

.el-input >>> .el-input__inner {
  height: 50px;
  font-size: 18px;
}

.el-form-item >>> .el-form-item__label {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.container {
  background-size: cover;
  height: 100vh;
  width: 100vw;
}

</style>
