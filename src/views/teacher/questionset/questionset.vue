<template>
  <div style="width:100%;height:calc(100vh - 70px)">
      <div style="position:relative;width:100%;height:330px;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;">
              <div style="position:absolute;left:0;top:0;z-index:1;width:150px;height:150px;display:flex;flex-wrap:wrap;align-content:center">
             <div v-for="i in 20" :key="i" style="margin-left:13px;margin-right:12px;margin-bottom:10px;margin-top:7px;width:7px;height:7px;border-radius:50%;background: #f3cb65"></div>
    </div>
      <div style="position:absolute;right:0;bottom:0;z-index:1;width:150px;height:150px;display:flex;flex-wrap:wrap;align-content:center">
             <div v-for="i in 20" :key="i" style="margin-left:13px;margin-right:12px;margin-bottom:10px;margin-top:7px;width:7px;height:7px;border-radius:50%;background: #dabafa"></div>
    </div>
        <div  style="height:200px;width:750px;display:flex;flex-wrap:wrap;align-items:center">
            <div style="height:90%;width:150px;">
               <img src="../../../assets/questionset_home.png" style="width:170px;"/>
            </div>
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;width:200px;height:90%;margin-left:90px">
                <div style="width:60%;align-self:start;text-align:left">
                    <p style="font-size:26px;font-weight:600;line-height:50px">试题库</p>
                    <p style="font-size:8px">试题库的描述</p>
                </div>
                <div @click="$router.push('/admin/questionset/allquestion')"  style="cursor:pointer;width:120px;height:40px;border:2px solid #797979;align-self:end;border-radius:4px;text-align:center;line-height:40px">
                    所有试题
                </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;width:100px;height:90%;margin-left:200px">
                <div style="cursor:pointer;height:110px;width:90px;border:1px solid #797979;border-radius:4px;align-self:start;align-items:center;justify-content:center;display:flex">
                    <img src="../../../assets/add_question.png" style="width:45px;height:45px">
                </div>
                <div style="height:40px;width:100%;text-align:center;font-size:20px;font-weight:700;color: rgba(0, 0, 0, 0.65);align-self:flex-end;margin-bottom:10px">
                    新建题目
                </div>
            </div>
        </div>
      </div>
      <div style="width:100%;min-height:calc(100vh - 400px);background: #e5e6e8;display:flex;justify-content:center">
          <div style="width:90%;display:flex;flex-wrap:wrpa;justify-content:center;align-items:start;margin-top:20px">
              <div style="width:1200px;height:120px;background:white;display:flex;justify-content:center;flex-wrap:wrap">
                  <div style="width:95%;display:flex;justify-content:space-between;align-items:center;height:70px">
                      <div style="height:50px;display:flex;align-items:center">
                        <img src="../../../assets/school_icon.svg" style="width:45px;height:30px"/>
                         <span style="line-height:50px;font-size:24px;font-weight:700;margin-left:10px">马克思学院</span>
                      </div>
                      <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                        <template #reference>
                             <img src="../../../assets/more_course.svg" style="width:20px;height:10px;cursor:pointer">
                        </template>
                         </el-popover>
              </div>
              <div style="width:85%;display:flex;justify-content:start;align-items:center;height:50px;">
                  <div style="width:200px;height:30px;color: rgba(51, 51, 51, 0.65)">
                      <span class="course" >思修</span>
                  </div>
                    <div style="width:200px;height:30px;color: rgba(51, 51, 51, 0.65)">
                      <span class="course" >马原</span>
                  </div>
                    <div style="width:200px;height:30px;color: rgba(51, 51, 51, 0.65)">
                      <span class="course" >毛概</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.course{
    border-left:2px solid rgba(51, 51, 51, 0.65);
    padding:0px 5px;
    font-size:18px;
    cursor:pointer;
}
.course:hover{
  border-left:2px solid  #71c9c7;
  color: #71c9c7;
}
*{
    box-sizing: border-box;
    margin:0;
    padding: 0;
    font-family: "Arial Normal", "Arial", sans-serif;
}

</style>