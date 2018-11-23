<template>
  <div class="login">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">Vue在线后台管理系统-登录</span>
            <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
                <el-form-item label="邮箱" prop="email"  class="con">
                    <el-input type="email" v-model="loginUser.email" autocomplete="off"  placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="con">
                    <el-input type="password" v-model="loginUser.password" autocomplete="off"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" class="con" >
                    <el-select type="password" v-model="loginUser.identity" autocomplete="off"  placeholder="请选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit _btn" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
                <div class="tipArea">
                    <P>还没有账号？现在<router-link to='/register'>注册</router-link></P>
                </div>
            </el-form>
        </div>
    </section>

  </div>
</template>

<script>

  export default {
    name:'login',
    props:[''],
    data () {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
          loginUser:{
              email:'',
              password:'',
          },
          rules:{
              email:[{
                  type:'email',required:true,message:'邮箱格式不正确',trigger: 'blur'
              }],
              password:[{
                  required:true,message:'密码不能为空',trigger: 'blur'
              },{
                  min:6,max:30,message:'长度在6-30字符之间',trigger: 'blur'
              }]
          }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
       submitForm(formName) {
           console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
              localStorage.setItem('email',this.loginUser.email);
                this.$router.push({path:'/index'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .login{
        height: 100%;
        width: 100%;
        background:#324057;
        color:white;
        position: relative;

    }
    .form_container{
        width: 400px;
        height:400px;
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        margin:auto;
    }
    .title{
        display: block;
        margin-bottom:30px;
    }
</style>