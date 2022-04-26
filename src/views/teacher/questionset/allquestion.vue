<template>
  <div style="width:100%;height:cal(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap">
      <div style="width:90%;flex-wrap:wrap;align-items:center;display:flex;justify-content:space-between;margin-top:10px">
      <div style="display:flex;align-items:center">
        <span style="font-size:24px;font-weight:700">学院:</span><el-select v-model="school_value"  placeholder="Select" size="large" style="width:180px;margin-left:10px">
            <el-option
            :change="getCourse()"
             v-for="item in school_options"
             :key="item.id"
            :label="item.facultyName"
            :value="item.id"
              />
        </el-select>
       <span style="font-size:24px;font-weight:700;margin-left:30px">课程:</span> <el-select v-model="course_value"  placeholder="Select" size="large" style="width:180px;margin-left:10px">
            <el-option
             v-for="item in course_options"
             :key="item.id"
            :label="item.course"
            :value="item.id"
              />
        </el-select>
      </div>
      <div>
          <el-button type="text" style="font-size:10px;color:#71c9c7">
              知识点大纲
          </el-button>
          <el-button type="primary" size="default" style="margin-left:60px;width:120px;height:35px;background:#71c9c7;border:none">
              新建试题
          </el-button>
      </div>
      </div>
      <div style="width:90%;display:flex;margin-top:15px">
          <el-button type="primary" size="large" style="width:120px; background: #71c9c7;color:white;border:none">全部试题</el-button>
          <el-button type="primary" size="large" style="width:120px;background: #d7d7d7;color: #333333;border:none">待审核试题</el-button>
      </div>
      <el-table style="width:1300px"
    ref="allquestion_tabel"
   
      :data=" allquestion_data">
          <el-table-column
          type="expand">
          <template #default="props">
              <div style="height:250px;display:flex;flex-wrap:wrap">
                  <div style="display:flex;width:100%;flex-direction:row;font-size:18px;font-weight:700">
                      <span >题目:</span><el-input style="width:300px" type="textarea" v-model="this_question.des" disabled=false></el-input>
                      <div style="border:2px solid black;border-radius:2px;height:28px;line-height:28px;margin-left:20px;padding:0 5px">{{this_question.type}}</div>

                  </div>

                  
              </div>
          </template>
          </el-table-column>
          <el-table-column
          label="学院"
          prop="school"
          align="center"
          >
          </el-table-column>
            <el-table-column
          label="课程"
          prop="course"
            align="center"
          >
          </el-table-column>
              <el-table-column
          label="试题类型"
          prop="type"
            align="center"
          >
          </el-table-column>
            <el-table-column
          label="试题描述"
          prop="des"
            align="center"
          >
          </el-table-column>
            <el-table-column
          label="知识点"
          prop="knowledge"
            align="center"
          >
          </el-table-column>
            <el-table-column
          label="出题人"
          prop="author"
            align="center"
          >
          </el-table-column>
            <el-table-column
          label="出题时间"
          prop="time"
            align="center"
          >
          </el-table-column>
             <el-table-column
          label="功能"
            align="center"
          >
          <template #default="scope">
              <el-button type="text" @click="toggleExpand(scope.row)">
                  查看详情
              </el-button>
          </template>
          </el-table-column>
      </el-table>

  </div>
</template>

<script>
export default {
    data(){
        return{
            this_question:{
                des:"（）是我们理解当前所处历史方位的关键词",
                type:"选择题"

            },
            allquestion_data:[
                {
                    school:"马克思学院",
                    course:"思修",
                    type:"选择题",
                    des:"（）是我们理解当前所处历史方位的关键词。",
                    knowledge:"第一章 人生的青春之问",
                    author:"赵国庆",
                    time:"2022/02/06",

                },
                 {
                    school:"马克思学院",
                    course:"思修",
                    type:"选择题",
                    des:"（）是我们理解当前所处历史方位的关键词。",
                    knowledge:"第一章 人生的青春之问",
                    author:"赵国庆",
                    time:"2022/02/06",

                },
                 {
                    school:"马克思学院",
                    course:"思修",
                    type:"选择题",
                    des:"（）是我们理解当前所处历史方位的关键词。",
                    knowledge:"第一章 人生的青春之问",
                    author:"赵国庆",
                    time:"2022/02/06",

                }
            ],
            active:"",
            school_value:'',
            course_value:"",
            school_options:[{
                label:"全部",
                value:"1"
            },
            {
                label:"马克思学院",
                value:"2"
            },
            ],
             course_options:[
            {
                label:"全部",
                value:"1"
            },
            {
                label:"毛概",
                value:"2"
            },
            {
                label:"思修",
                value:"3"
            },
            {
                label:"马原",
                value:"4"
            }
            
        ]
        }
       
    },
    methods:{
        getQuestion(){
            let that=this
            this.$$props

        },
        getCourse(){
            let that=this
            this.$getRequest('/user/course/list',{'facultyId':that.school_value}).then(res=>{
                if(res.data){
                    that.course_options=res.data
                    console.log(res.data)
                }

            })


        },
        toogleExpand(row){
            let $table=this.$refs.allquestion_table
         this.tableData.map((item) => {
        if (row.qid != item.qid) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
        }
    },
    created(){
        let that=this
        this.$getRequest('/user/faculty/list').then(res=>{
           
            if(res.data){
                that.school_options=res.data
                console.log(that.school_options)
            }else{
                console.log(res.data)
            }
        })
    }

}
</script>

<style scoped>
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

*{
    box-sizing: border-box;
    margin:0;
    padding: 0;
    font-family: "Arial Normal", "Arial", sans-serif;
}
:deep(.el-table__body) {
  table-layout: fixed;
  border-collapse: separate;
  width: 98%;
}
</style>