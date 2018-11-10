<template>
  <div class="register">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">Vue在线后台管理系统</span>
            <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="registerUser.name" autocomplete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="registerUser.email" autocomplete="off"  placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerUser.password" autocomplete="off"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerUser.password2" autocomplete="off"  placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" >
                    <el-select type="password" v-model="registerUser.identity" autocomplete="off"  placeholder="请选择身份">
                        <el-option label="管理员" value="manager"></el-option>
                        <el-option label="员工" value="employee"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit _btn" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>

  </div>
</template>

<script>

  export default {
    name:'register',
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
          registerUser:{
              name:'',
              email:'',
              password:'',
              passowrd2:'',
              indentity:''
          },
          rules:{
              name:[{
                  required:true,message:'用户名不能为空',trigger: 'blur'
              },{
                  min:2,max:30,message:'长度在2-30字符之间',trigger: 'blur'
              }],
              email:[{
                  type:'email',required:true,message:'邮箱格式不正确',trigger: 'blur'
              }],
              password:[{
                  required:true,message:'密码不能为空',trigger: 'blur'
              },{
                  min:6,max:30,message:'长度在6-30字符之间',trigger: 'blur'
              }],
              password2:[{
                  required:true,message:'密码不能为空',trigger: 'blur',
              },{
                  validator: validatePass2,trigger: 'blur'
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
                this.$router.push({path:'/login'});
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
    .register{
        height: 100%;
        width: 100%;
        background:skyblue;
    }
</style>