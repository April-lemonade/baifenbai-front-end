<template>
  <div style="width:100%;height:calc(100vh - 70px);">
      <div style="float:left;width:400px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;display:flex;justify-content:center;flex-wrap:wrap;align-content:flex-start">
    <el-input @focus="input_focus" @blur="input_blur" placeholder="Search" style="height:32px;width:300px;margin-top:30px;color:black" size="default"  >
        <template #prefix>
          <el-icon :size="10" style="top:11px;"><img id="search_icon" src="../../../assets/search.svg" style="width:20px;height:auto"></el-icon>
        </template>
    </el-input>
      <div style="width:300px;margin-top:40px">
          <el-tree class="filter-tree" ref="tree" node-key="id" :filter-node-method="filterNode" :data="data"
                   accordion  show-checkbox
                   :default-expanded-keys="[1,2]"
                   :props="defaultProps"
                   check-strictly
                   @check-change="handleCheckChange"
          >
          </el-tree>
        </div>
  </div>
    <el-scrollbar>
  <div style="width:calc(100%-400px);height:calc(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap;align-content:start;">
    
    <div style="width:90%;">
      <div style="width:100%;">
        <img src="../../../assets/grade_home.png" style="height:150px;width:100%">
      </div>
      <div v-if="!checked[0]" style="height:calc(100vh - 250px);margin-top:10px;width:100%;background: #eefcfe;display:flex;justify-content:center" >

       <div style="margin-top:300px;font-weight:700;font-size:18px"> <img src="../../../assets/pointer.svg" style="width:30px;height:30px;position:relative;top:5px;">请选择左侧的学院和科目，查看考试情况吧~</div>

      </div>
      <div v-if="checked[0]" style="height:calc(100vh - 250px);margin-top:10px;width:100%;display:flex;justify-content:center;flex-wrap:wrap;;align-content:start">
        <div style="width:92%;display:flex;justify-content:end;margin-top:20px">
        </div>
        <div style="width:100%;display:flex;flex-wrap:wrap;justify-content:center;margin-top:0px">
          <div v-for="(exam,index) in exams" :key="exam.id" 
           style="border-style: solid;border-width: 1px;border-color: #D7D7D7;margin:5px;width: 90%;border-radius: 10px;display: flex;flex-direction: column;padding: 2%;height:100px">
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;margin-bottom: 8%">
          <div>{{ exam.content }}</div>
          <el-tag v-if="exam.status === 3" class="mx-1" type="" effect="dark" style="justify-self: flex-end">
                待开始
              </el-tag>
              <el-tag v-if="exam.status === 4" class="mx-1" type="success" effect="dark" style="justify-self: flex-end">
                进行中
              </el-tag>
              <el-tag v-if="exam.status === 5" class="mx-1" type="warning" effect="dark" style="justify-self: flex-end">
                批阅中
              </el-tag>
              <el-tag v-if="exam.status === 6" class="mx-1" type="info" effect="dark" style="justify-self: flex-end">
                已结束
              </el-tag>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;font-size:12px;align-self:flex-end">
          <div style="display:flex;justify-content:space-between;width:60%">
          <div>{{ exam.course }}</div>
          <div>|</div>
          <div>{{ exam.facultyName }}</div>
          <div>|</div>
          <div>{{ exam.examTime }}</div>
          <div>-</div>
          <div>{{ exam.endTime }}</div>
          </div>
          <div>
               <el-button type="text" @click="$router.push('/admin/grade/detail')">
            成绩
          </el-button>
               <el-button type="text" >
            查看试卷
          </el-button>
          </div>
        </div>
      
        
      </div>
        </div>


      </div>

     </div>
      
  </div>
  </el-scrollbar>
  </div>
</template>

<script>
export default {
    data(){
        return{
           value:'',
            checked:[],
            data:[],
        exams: []
        }
    },
     methods:{
          show_detail(data) {
      console.log(data)
      let obj = JSON.stringify(this.exams[data])
      this.$router.push({path:'/student/mark/mark_console',query: {obj:obj}})
    },
        input_focus(){
            var input=document.getElementById("search_icon")
            input.style.position="relative";
            input.style.left="-80px";
            input.style.filter="drop-shadow(80px 0 #f8c863)";
        },
        input_blur(){
              var input=document.getElementById("search_icon")
                input.style.position="relative";
            input.style.left="-80px";
            input.style.filter="drop-shadow(80px 0 black)";
        },
         handleCheckChange(data, checked, indeterminate) {
      let that = this
      let {id} = data
      let index = this.checked.indexOf(id)
      // 当前节点不在this.checked中,且当前节点为选中状态
      if (index < 0 && this.checked.length && checked) {
        this.$message.warning('只能同时选中一门课程')
        console.log(data)
        this.$refs.tree.setChecked(data, false) // 取消当前节点的选中状态
        return
      }
      // 当前节点在this.checked中,当前节点为未选中状态(主动去掉当前选中状态)
      if (!checked && index >= 0 && this.checked.length) {
        this.checked = []
        this.$postRequest('/exam/examinationPaper/list').then(res => {
          if (res.data) {
            that.exams = res.data.data
          }
        })
        return
      }
      // 当前节点不在this.checked(长度为0)中,当前节点为选中状态,this.checked中存储当前节点id
      if (index < 0 && !this.checked.length && checked) {
        this.checked.push(id)
        this.$postRequest('/exam/examinationPaper/list?courseId=' + data.courseId + "&facultyId=" + data.institutionId).then(res => {
          // console.log(res)
          if (res.data) {
            that.exams = res.data.data
          }
        })
      }
      console.log("1",this.exams)
    },
       handleNodeClick(data, checked, node) {
      console.log(data);
      if (checked) {
        this.$refs.tree.setCheckedNodes([data]);
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

     
    },
    mounted(){
       this.data = []
    let that = this
    this.$getRequest('/user/faculty/list').then(res => {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          let id1 = res.data[i].id
          that.data.push({
            id: res.data[i].id,
            label: res.data[i].facultyName,
            disabled: true,
            children: []
          })
          that.$getRequest('/user/course/list?facultyId=' + res.data[i].id).then(res => {
            for (let j = 0; j < res.data.data.length; j++) {
              let id = res.data.data[j].id + i
              that.data[i].children.push({
                id: id,
                courseId: res.data.data[j].id,
                institutionId: id1,
                label: res.data.data[j].course
              })
            }
          })
        }
      }
    })
    this.$postRequest('/exam/examinationPaper/list').then(res => {
      console.log(res)
      if (res.data) {
        that.exams = res.data.data
        console.log(that.exams)
      }
    })
    }

}
</script>

<style scoped>
:deep(.el-tree-node__content) {
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  margin-bottom: 10px;
}

:deep(.el-tree-node__label) {
  font-size: 18px;
}
.el-input>>>.el-input__inner:focus{
    border-color: #f8c863}
</style>