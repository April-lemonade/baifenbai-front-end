<template>
  <div style="width:100%;height:calc(100vh - 70px);background:  #f3f4f8;display:flex">
      <div style="float:left;border-right:2px solid  rgba(121, 121, 121, 0.1);height:calc(100vh - 70px);width:400px;">
          <div style="display:flex;width:100%;flex-wrap:wrap;align-items:start;justify-align:start">
          <div style="width:100%;border-bottom:2px solid rgba(121, 121, 121, 0.1);height:80px;display:flex">
          </div>
          <div style="width:100%;display:flex;justify-content:center;flex-wrap:wrap;justify-align:start;align-self:flex-start;margin-top:10px">
              <div style="display:flex;align-items:center;justify-content:center;width:95%;height:60px;border-radius:4px;box-shadow:1px 1px 6px  #797979;background:white;margin-top:10px">
                  <div style="display:flex;align-items:center;justify-content:space-between;width:90%;">
                      <div style="display:flex;align-items:center;">
                          <img src="../../../assets/select_icon.png" style="width:30px;height:30px">
                          <span style="font-size:18px;color: rgba(0, 0, 0, 0.65);margin-left:30px">选择题</span>
                      </div>
                          <div>
                              <img src="../../../assets/edge_icon.png" style="width:25px;height:25px">
                          </div>
                  </div>
              </div>
               <div style="display:flex;align-items:center;justify-content:center;width:95%;height:60px;border-radius:4px;box-shadow:1px 1px 6px  #797979;background:white;margin-top:10px">
                  <div style="display:flex;align-items:center;justify-content:space-between;width:90%;">
                      <div style="display:flex;align-items:center;">
                          <img src="../../../assets/judge_icon.png" style="width:30px;height:30px">
                          <span style="font-size:18px;color: rgba(0, 0, 0, 0.65);margin-left:30px">判断题</span>
                      </div>
                          <div>
                              <img src="../../../assets/edge_icon.png" style="width:25px;height:25px">
                          </div>
                  </div>
              </div>
               <div style="display:flex;align-items:center;justify-content:center;width:95%;height:60px;border-radius:4px;box-shadow:1px 1px 6px  #797979;background:white;margin-top:10px">
                  <div style="display:flex;align-items:center;justify-content:space-between;width:90%;">
                      <div style="display:flex;align-items:center;">
                          <img src="../../../assets/fill_icon.png" style="width:30px;height:30px">
                          <span style="font-size:18px;color: rgba(0, 0, 0, 0.65);margin-left:30px">填空题</span>
                      </div>
                          <div>
                              <img src="../../../assets/edge_icon.png" style="width:25px;height:25px">
                          </div>
                  </div>
              </div>
               <div style="display:flex;align-items:center;justify-content:center;width:95%;height:60px;border-radius:4px;box-shadow:1px 1px 6px  #797979;background:white;margin-top:10px">
                  <div style="display:flex;align-items:center;justify-content:space-between;width:90%;">
                      <div style="display:flex;align-items:center;">
                          <img src="../../../assets/brief_icon.png" style="width:30px;height:30px">
                          <span style="font-size:18px;color: rgba(0, 0, 0, 0.65);margin-left:30px">简答题</span>
                      </div>
                          <div>
                              <img src="../../../assets/edge_icon.png" style="width:25px;height:25px">
                          </div>
                  </div>
              </div>
             
             
          </div>
          </div>

      </div>
      <div style="width:calc(100vw - 400px);height:calc(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap">
          <div style="width:95%;margin-top:30px">
              <p style="font-size:22px;font-weight:700">科目</p>
              <el-select size="large" v-model="course" style="margin-top:5px">
                  <el-option v-for="item in course_list" :label="item.course" :value="item.id" :key="item.id">
                  </el-option>
              </el-select>
          </div>

      </div>
  </div>

</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    components:{
        quillEditor
    },
    data(){
        return{
            course_list:[],
            course:''
        }
    },
    created(){
        let that=this
        this.$getRequest("/user/course/list").then(res=>{
            if(res.data){
                that.course_list=res.data.data
                

            }
        })
    }

}
</script>

<style scoped>
*{
    box-sizing: border-box;
   
    font-family: "Arial Normal", "Arial", sans-serif;
}

</style>