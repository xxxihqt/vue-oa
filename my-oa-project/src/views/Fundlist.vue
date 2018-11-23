<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" v-if="tableData.length>0">
        <el-form-item label="按照时间筛选">
           <el-date-picker
            v-model="search_data.beginAt"
            type="datetime"
            placeholder="选择发布时间"
            default-time="12:00:00">
          </el-date-picker>--
           <el-date-picker
              v-model="search_data.publishedAt"
              type="datetime"
              placeholder="选择结束时间"
              default-time="12:00:00">
            </el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="small" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight" v-if="identity=='manager'">
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        style="width: 100%"
        max-height="450">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishedAt"
          label="发布日期"
          width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.publishedAt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="desc"
          label="写真风格"
          width="250">
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          label="预览"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" onerror="this.onerror=null; this.src='http://i1.umei.cc/uploads/tu/201811/9999/7aa46bc0a9.jpg'">
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          label="价格"
          width="50">
        </el-table-column>
        <el-table-column
          prop="liked"
          align="center"
          label="收藏"
          width="50">
          <template slot-scope="scope">
            <span>{{scope.row.liked===false?'否':'是'}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作"
          prop="operation"
          align="center"
          width="180"
          v-if="identity=='manager'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              background
              :layout="paginations.layout"
              :total="paginations.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog :dialog="dialog" v-on:add="add" v-on:edit="edit" :formData="formData"></Dialog>
  </div>
</template>

<script>
  import Dialog from '../components/Dialog.vue'
  export default {
    name:'fundist',
    props:[''],
    data () {
      return {
        search_data:{
          beginAt:'',
          publishedAt:''
        },
        filterTabelData:[],
        paginations:{
          page_index:1,
          total:0,
          page_size:5,
          page_sizes:[5,10,15,20],
          layout:"total,sizes,prev,next,jumper"
        },
        allTableData:[],
        tableData:[],
         formData:{
              id:'',
              desc:'',
              url:'',
              price:0,
              liked:false,
              publishedAt:''
          },
        dialog:{
          show:false,
          title:'',
          option:'edit'
        },
        identity:''
      };
    },

    components: {Dialog},

    computed: {
      
    },
    created() {
      this.getdata();
    },

    mounted() {},

    methods: {
      format_tableData(){
         this.tableData = this.tableData.map(item=>{
          item.publishedAt=new Date(item.publishedAt);
          item.publishedAt=item.publishedAt.toLocaleString();
          return item
        })
      },
      getdata(){
        this.$axios.get('https://www.apiopen.top/meituApi?page=1')
          .then(res=>{
            this.identity=localStorage.getItem('identity');
            this.allTableData=res.data.data;
            this.allTableData.map((item,idx)=>{
              item.price=300;
              item.liked=false;
              item.id=idx;
              item.publishedAt=Date.parse(item.publishedAt);
              item.desc="青春少女风";
            })
            console.log(this.allTableData);
              this.setPagination();
              this.filterTabelData = this.allTableData;
          })
          .catch(err=>{
          })
      },
      setPagination(){
        this.paginations.total=this.allTableData.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 5;
      
        this.tableData = this.allTableData.filter((item,idx)=>{
          return idx < this.paginations.page_size
        })

        this.format_tableData();
      },
      handleEdit(index,row){
        console.log('row',row)
        this.dialog={
          show:true,
          title:'修改信息',
          option:'edit'
        }
        this.formData={
              id:row.id,
              desc:row.desc,
              url:row.url,
              price:row.price,
              liked:row.liked,
              publishedAt:row.publishedAt
        }
      },
      handleDelete(index,row){
        let newArr=[];
        this.tableData.forEach((item,idx,arr)=>{
          if(item.id==row.id){
           console.log(idx)
           arr.splice(idx,1);
           newArr=arr;
          }
        })
        this.tableData=newArr;
        this.$message.error('已删除');
      },
      handleAdd(){
        console.log(333)
        this.dialog.show=true;
        this.dialog={
          show:true,
          title:'添加信息',
          option:'add'
        }
        this.formData={
              desc:'',
              url:'',
              price:0,
              liked:'',
              publishedAt:''
        }
      },
      add(newdata){
        this.tableData.push(newdata);
        this.format_tableData();
        console.log(this.tableData);
        this.$message({
          message: '已成功插入一条信息',
          type: 'success'
        });
      },
      edit(newdata){
        let id = newdata.id;
        let newArr=[];
        this.tableData.forEach((item,idx,arr)=>{
          if(item.id==id){
            item=Object.assign(item,newdata);
            item.price=item.price*1;
            item.publishedAt=item.publishedAt.toLocaleString();
            console.log('item',item);
            newArr=arr;
          }
        })
        this.tableData=newArr;
        this.$message({
          message: '已修改成功',
          type: 'success'
        });
      },
      //每页多少条
      handleSizeChange(page_size){
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.tableData = this.allTableData.filter((item,idx)=>{
          return idx < page_size
        })
        this.format_tableData();
      },
      //跳转页码
      handleCurrentChange(page){
        let index = this.paginations.page_size * (page-1);
        let nums = this.paginations.page_size * page;
        let tables = [];
        for(let i = index; i< nums ; i++){
          if(this.allTableData[i]){
            tables.push(this.allTableData[i]);
          }
          this.tableData = tables;
        }
        this.format_tableData();
      },
      handleSearch(){
        if(!this.search_data.beginAt || !this.search_data.publishedAt){
          this.$message({
            type:'warning',
            message:'请选择时间区间'
          })
          this.getdata();
          return;
        }

        const sTime = this.search_data.beginAt.getTime();
        const eTime = this.search_data.publishedAt.getTime();
        this.allTableData = this.filterTabelData.filter(item=>{
          return  item.publishedAt >= sTime && item.publishedAt <= eTime;
        })
        this.setPagination();
      }
    },

    watch: {
    }
  }

</script>
<style lang='' scoped>
img{
  width:100px;
}
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>