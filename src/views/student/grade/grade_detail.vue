<template>
  <div style="width:100%;height:calc(100vh - 70px);">
      <div style="float:left;width:300px;min-height:calc(100vh - 70px);background:white;border-right:1px solid  #d7d7d7;display:flex;justify-content:center;flex-wrap:wrap;align-content:flex-start">
    <el-input @focus="input_focus" @blur="input_blur" placeholder="Search" style="height:32px;width:250px;margin-top:30px;color:black" size="default"  >
        <template #prefix>
          <el-icon :size="10" style="top:11px;"><img id="search_icon" src="../../../assets/search.svg" style="width:20px;height:auto"></el-icon>
        </template>
    </el-input>
      <div style="width:250px;margin-top:40px">
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
  <div style="width:calc(100%-300px);height:calc(100vh - 70px);display:flex;justify-content:center;flex-wrap:wrap;align-content:start;overflow:auto">
      <div style="width:90%;display:flex;justify-content:start;margin-top:50px;">
          <div style="width:125px; height:80px;border-radius:4px;background: #c2e6d9;display:flex;box-sizing:border-box" >
              <div style="flex:1;background:;box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-wrap:wrap">
                  <img src="../../../assets/grade_detail.svg" style="width:40px;height:30px">
                  <div style="width:100%;font-size:18px;font-weight:700;text-align:center">教学情况</div>
              </div>
            
          </div>
          <div style="display:flex;margin-left:40px;width:650px;justify-content:space-between">
              <div style="width:120px;height:80px;border-radius:4px;box-sizing:border-box;border:2px solid #c2e6d9;align-items:center;display:flex;flex-wrap:wrap;justify-content:center;text-align:center;padding-top:10px;padding-bottom:10px ">
                  <p style="width:100%;color: #8c8c8c;font-weight:700;font-size:18px">参加人数</p>
                    <p style="width:100%;font-weight:1000;font-size:20px;color:black">20</p>
              </div>
                <div style="width:120px;height:80px;border-radius:4px;box-sizing:border-box;border:2px solid #c2e6d9;align-items:center;display:flex;flex-wrap:wrap;justify-content:center;text-align:center;padding-top:10px;padding-bottom:10px">
                        <p style="width:100%;color: #8c8c8c;font-weight:700;font-size:18px">通过率</p>
                    <p style="width:100%;font-weight:1000;font-size:20px;color:black">95%</p>
              </div>
                <div style="width:120px;height:80px;border-radius:4px;box-sizing:border-box;border:2px solid #c2e6d9;align-items:center;display:flex;flex-wrap:wrap;justify-content:center;text-align:center;padding-top:10px;padding-bottom:10px ">
                        <p style="width:100%;color: #8c8c8c;font-weight:700;font-size:18px">最高分</p>
                    <p style="width:100%;font-weight:1000;font-size:20px;color:black">98</p>
              </div>
                <div style="width:120px;height:80px;border-radius:4px;box-sizing:border-box;border:2px solid #c2e6d9;align-items:center;display:flex;flex-wrap:wrap;justify-content:center;text-align:center;padding-top:10px;padding-bottom:10px ">
                        <p style="width:100%;color: #8c8c8c;font-weight:700;font-size:18px">最低分</p>
                    <p style="width:100%;font-weight:1000;font-size:20px;color:black">58</p>
              </div>
                <div style="width:120px;height:80px;border-radius:4px;box-sizing:border-box;border:2px solid #c2e6d9;align-items:center;display:flex;flex-wrap:wrap;justify-content:center;text-align:center;padding-top:10px;padding-bottom:10px ">
                        <p style="width:100%;color: #8c8c8c;font-weight:700;font-size:18px">平均分</p>
                    <p style="width:100%;font-weight:1000;font-size:20px;color:black">78.5</p>
              </div>
          </div> 
      </div>
      <div style="width:90%;height:auto;margin-top:20px;flex-wrap:wrap">
         <p style="margin;font-size:18px;font-weight:700;st">各分数段成绩分布情况</p>
         <div style="width:100%;display:flex;justify-content:start;margin-top:10px;position:relative">
             <el-card id="echart_1" style="position:relative;width:300px;height:300px;border-radius:4px;margin-right:30px;border:1px solid  #d7d7d7"></el-card>
              <el-card id="echart_2" style="position:relative;width:700px;height:300px;border-radius:4px;border:1px solid  #d7d7d7"></el-card>
         </div>

      </div>
       <div style="width:90%;height:auto;margin-top:20px;flex-wrap:wrap">
         <p style="margin;font-size:18px;font-weight:700;st">知识掌握情况</p>
         <el-tabs v-model="activeName" cellpadding="0" >
           <el-tab-pane label="热力图" name="first"></el-tab-pane>
             <div v-show="activeName=='first'" id="echart_3" style="width:1100px;height:700px;"></div>
           <el-tab-pane label="表格" name="second" style="margin-bottom:50px">
           <table style="width:1000px;height:500px;" frame="border" rules="all">
             <thead style="font-size:18px;font-weight:700">知识点掌握程度</thead>
             <tr><th>一级知识点</th><th style="width:400px">二级知识点</th><th>相关题目</th><th>掌握程度</th></tr>
             <tr><td rowspan="2">一，进程</td> <td>进程同步</td><td>1,3,7</td><td>0.8</td></tr>
             <tr><td>死锁 </td><td>2,8</td><td>0.3</td></tr>
              <tr><td >二，线程</td> <td>粒度</td><td>2，4，6</td><td>0.8</td></tr>
               <tr><td rowspan="4">三，内存管理</td> <td>分段</td><td>9,10</td><td>0.8</td></tr>
                   <tr><td>分页 </td><td>11.12</td><td>0.7</td></tr>
                    <tr><td>虚拟内存 </td><td>13.14</td><td>0.7</td></tr>
                     <tr><td>连续分配 </td><td>15.16</td><td>0.7</td></tr>
              <tr><td rowspan="3">四，文件管理</td> <td>文件和文件系统</td><td>17,18</td><td>0.4</td></tr>
                 <tr><td>文件结构 </td><td>19.20</td><td>0.7</td></tr>
                   <tr><td>外存分配方式 </td><td>21.22</td><td>0.3</td></tr>
            
             
             
           </table>
           </el-tab-pane>
         </el-tabs>
      </div>
  </div>

  </div>
</template>

<script>
export default {
     data(){
        return{
          activeName:'first',
            check:[],
            data:[
        {
          id: 2,
          label: "工商管理学院",
          disabled: true,
          children: [
            {
              id: 4,
              label: "人力资源管理",
            }, {
              id: 5,
              label: "企业经济学",
            }, {
              id: 6,
              label: "科学方法论",
            }, {
              id: 7,
              label: "市场营销学",
            }, {
              id: 8,
              label: "广告学",
            }, {
              id: 9,
              label: "消费者行为学",
            }, {
              id: 10,
              label: "商业心理学",
            }, {
              id: 11,
              label: "国际商务概论",
            },
          ],
        }, {
          id: 3,
          label: "旅游与城乡管理学院",
          disabled: true,
          children: [
            {
              id: 12,
              label: "休闲学",
            }, {
              id: 13,
              label: "旅游企业管理",
            }, {
              id: 14,
              label: "旅游研究方法",
            }, {
              id: 15,
              label: "城市遥感信息",
            }, {
              id: 16,
              label: "城市生态学",
            }, {
              id: 17,
              label: "旅游规划",
            }, {
              id: 18,
              label: "旅游企业会计",
            }, {
              id: 19,
              label: "酒店管理概论",
            },
          ],
        }
      ]
        }
    },
     methods:{
       
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
        }
     
    },
    created(){
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
    
    },
    mounted(){
      const hours = ['I/O输入系统','虚拟内存','分页','分段','粒度','连续分配','文件结构','外存分配方式'];
// prettier-ignore
const days =['1','2','3','4'];
// prettier-ignore
const data = [[3,1,2],[3,4,1],[3,6,2],[2,7,3],[2,5,3],[2,6,1],[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 1], [0, 4, 0], [0, 5, 2], [0, 6, 1], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 2], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [1, 6, 1], [1, 4, 2], [6, 22, 2], [6, 23, 6],[0,6,2],[0,7,3]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
     
        let newPromise=new Promise(resolve => {
      resolve()
    })
    newPromise.then(()=>{
        let myChart_1 = this.$echarts.init(document.getElementById("echart_1"))
      let myChart_2 = this.$echarts.init(document.getElementById("echart_2"))
      let myChart_3 = this.$echarts.init(document.getElementById("echart_3"))
      myChart_1.clear()
      myChart_2.clear()
      myChart_3.clear()
       myChart_3.setOption({
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '50%',
    top: '5%',
    left:'0%',
     containLabel: true

  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '25%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
 
  ]
})
 myChart_1.setOption({legend: {
    top: 'bottom'
  },
  toolbox: {
  
  },
 color:['#cce7d4','#b9e2d4','#98c9c5','#829e94','#8fbdbb','#659295'],
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [15, 120],
      center: ['50%', '45%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 10
      },
      label:{
          show:false
      },
      data: [
        { value: 30, name: '90-100' },
        { value: 52, name: '80-90' },
        { value: 100, name: '70-80' },
        { value: 70, name: '60-70' },
        { value: 60, name: '50-60' },
        { value: 0, name: '50以下' },
      ]
    }
  ]
},true)
myChart_2.setOption( {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  color:['#b9e2d4'],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['90-100', '80-90', '70-80', '60-70','50-60','50以下'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [2, 4,  9,  3, 2,0]
    }
  ]
})

   
    },true)
  


    
      
     
      

    
    
    }

}
</script>

<style scoped>
 tr td{
  text-align:center
}
*{
    font-family: "Arial Normal", "Arial", sans-serif;
}
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