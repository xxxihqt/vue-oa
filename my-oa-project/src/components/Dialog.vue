<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" :visible.sync ="dialog.show" :close-on-click-modal="false" :close-on-press-="true"	:modal-append-to-body="true">
    <div class="form">
        <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px" style="margin:10px auto">
            <el-form-item label="写真风格">
                <el-select v-model="formData.desc" placeholder="写真风格">
                    <el-option v-for="(desc,index) in descList" :key="index" :label="desc" :value="desc">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="url" label="图片：">
                <el-input v-model="formData.url"  ref="avatarInput"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="价格：">
                <el-input type="number" v-model="formData.price" ></el-input>
            </el-form-item>
            <el-form-item prop="liked" label="收藏：">
                <el-select v-model="formData.liked" placeholder="是否收藏">
                    <el-option v-for="(liked,idx) in likedList" :key="idx" :label="liked?'是':'否'" :value="liked">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="text_right">
                <el-button @click="dialog.show=false">取消</el-button>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name:'dialogs',
    props:{
        dialog:Object,
        formData:Object
    },
    data () {
      return {
          descList:[
              '青春少女风','御姐风','萝莉风','二次元','古风','欧美风'
          ],
          likedList:[
              true,false
          ],
          form_rules:{
              desc:{
                  required:true,message:'写真风格不能为空',trigger:'blur'
              },
              url:{
                  required:true,message:'图片地址不能为空',trigger:'blur'
              },
              price:{
                  required:true,价格:'写真风格不能为空',trigger:'blur'
              },
              liked:{
                  required:true,message:'收藏不能为空',trigger:'blur'
              }
          }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        onSubmit(form){
            let option = this.dialog.option;
            if(option === 'add'){
                this.$refs[form].validate(valid=>{
                    if(valid){
                        var now_date= new Date();
                        now_date=Date.parse(now_date);
                        this.dialog.show=false;
                        this.formData.publishedAt=now_date;
                        this.$emit('add',this.formData)
                    }
                })
            }

            if(option==='edit'){
                this.$refs[form].validate(valid=>{
                    if(valid){
                        var now_date= new Date();
                        now_date==Date.parse(now_date);
                        this.dialog.show=false;
                        this.formData.publishedAt=now_date;
                        this.$emit('edit',this.formData)
                    }
                })
            }
 
        },
        changeImage(e){
            console.log(e)
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>