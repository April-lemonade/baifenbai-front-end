<template>
  <div style="display: flex;flex-direction: column;margin: 2%;width: 96%">
    <div style="display: flex;flex-direction: row">
      <div
          style="width:42%;display: flex;flex-direction: row;border-style: solid;padding-top: 3%;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-right: 1%">
        <div style="display:flex;flex-direction: column;margin-bottom: 2%;width: 70%">
          <div style="font-weight: bold;font-size: 18px;margin-bottom: 20%">{{ exam.content }}</div>
          <div class="exam_info">考试时间
            <div class="exam_info_content">{{ exam.examTime }} - {{ exam.endTime }}</div>
          </div>
          <div class="exam_info">考试课程
            <div class="exam_info_content">{{ exam.courseName }}</div>
          </div>
          <div class="exam_info">开课学院
            <div class="exam_info_content">{{ exam.facultyName }}</div>
          </div>
          <!--          <div class="exam_info">总节数&nbsp;&nbsp;&nbsp;
                      <div class="exam_info_content">4</div>
                    </div>
                    <div class="exam_info">总题数&nbsp;&nbsp;&nbsp;
                      <div class="exam_info_content">56</div>
                    </div>-->
        </div>
        <div :style="note" style="width: 30%;text-align: end;position: relative">
          <!--          <div style="position:absolute;bottom:20px;right:20px;cursor: pointer" @click="goMark">
                      批阅样卷
                    </div>-->
        </div>
      </div>
      <div
          style="width: 56%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;position: relative;">
        <div style="display: flex;flex-direction: row;position:relative;">
          <div style="width: 90%;font-weight: bold;font-size: 18px;margin-top: 5%">阅卷进度</div>
          <img src="../../../assets/example_paper.png"
               style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 10%;z-index:2"/>
        </div>
        <el-card id="progress" style="width:100%;height:300px;box-shadow:none;border:none; "></el-card>
      </div>
    </div>
    <div
        style="width:97%;display: flex;flex-direction: column;border-style: solid;padding-left:3%;border-width: 1px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);border-color: #D7D7D7;margin-top: 3%">
      <div style="width: 100%;display: flex;flex-direction: row;position: relative;margin-bottom: 1%">
        <div style="width: 95%;font-weight: bold;font-size: 18px;margin-top: 2%">阅卷详情</div>
        <img src="../../../assets/example_paper.png"
             style="position: absolute;top:0;right:0;transform: rotate(270deg);width: 5%"/>
      </div>
      <div style="width: 50%;display: flex;flex-direction: row;justify-content: space-between">
        <div>阅卷进度：{{ progress.reviewedProgress * 100 }}%</div>
        <div>预计完成时间：{{ progress.estimatedTime }}</div>
      </div>
      <el-progress style="margin-right: 3%;margin-top: 1%;margin-bottom:1%;" :text-inside="true" :stroke-width="20"
                   :percentage="progress.reviewedProgress*100"
                   status="success" color="rgba(19, 137, 116, 1)"></el-progress>
      <el-table ref="table" :data="questions" style="width: 98%">
        <el-table-column type="expand">
          <template #default="props">
            <div style="display: flex;flex-direction: row">
              <div style="width: 50%;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                <div
                    style="display: flex;flex-direction: row;font-size: 13px;justify-content: space-between;width: 100%;margin-bottom: 5%">
                  <div style="font-weight: bold">{{ props.row.info.questionIndex }} &nbsp; {{
                      props.row.detail.content
                    }}
                  </div>
                  <div style="border-style: solid;border-width: 2px;border-radius: 5px;font-weight: bold">
                    <div v-if="props.row.detail.type === 1">选择题</div>
                    <div v-if="props.row.detail.type === 2">判断题</div>
                    <div v-if="props.row.detail.type === 3">填空题</div>
                  </div>
                  <div style="font-weight: bold">分值: {{ props.row.info.fullScore }}</div>
                </div>
                <div v-if="props.row.detail.type === 1" style="display: flex;flex-direction: column">
                  <div>A. {{ props.row.detail.a }}</div>
                  <div>B. {{ props.row.detail.b }}</div>
                  <div>C. {{ props.row.detail.c }}</div>
                  <div>D. {{ props.row.detail.d }}</div>
                </div>
                <div style="font-weight: bold">正确答案: {{ props.row.detail.answer }}</div>
                <div>
                  作者：{{ props.row.detail.name }} | 上传时间：{{ props.row.detail.createTime }}
                </div>
                <div>难度系数：{{ props.row.detail.difficulty }} | 知识点：{{ props.row.detail.outline }} |
                  使用次数：{{ props.row.detail.usageTimes }}
                </div>
                <!--                <div v-for="examiner in props.row.info.teachers">
                                  阅卷人：{{ examiner.name }} | 阅卷速度：{{ examiner.speed }} 题/分钟 | 批阅份数：{{ examiner.count }} |
                                  预计完成时间：{{ examiner.time }}
                                </div>-->
                <!--                <el-button style="margin-top: 5%" type="primary" plain @click="dialogFormVisible = true">调整阅卷人
                                </el-button>-->
              </div>
              <div id="progress1"
                   style="width: 50%;height:300px;border-style: solid;border-width: 1px;border-color: #D7D7D7;padding: 2%">
                {{ drawEcharts(props.row.examiners) }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="题号" prop="info.questionIndex"/>
        <el-table-column label="阅卷人">
          <template #default="scope">
            <div style="display: flex;flex-direction: row">
              <div v-for="item in scope.row.info.teachers">
                {{ item }}&nbsp;
                <!--                <el-popover
                                    placement="bottom"
                                    :title="item.name"
                                    :width="200"
                                    trigger="hover"
                                    content="this is content, this is content, this is content">
                                  <template #reference>
                                    <p>{{ item.name }}&nbsp;</p>
                                  </template>
                                  <div style="display:flex;flex-direction: row;font-size: 10px">
                                    预计完成时间：{{ item.time }}
                                  </div>
                                  <div style="font-size: 10px;display: flex;flex-direction: row">
                                    <div style="width: 80px">阅卷总进度：</div>
                                    <el-progress style="width: 50%;font-size: 10px" :stroke-width="5" :percentage="item.allProgress"
                                                 color="rgba(19, 137, 116, 1)"></el-progress>
                                  </div>
                                  <div style="font-size: 10px">
                                    <div v-for="progress in item.progresses" style="display: flex;flex-direction: row">
                                      <div style="width: 80px;">{{ progress.qid }}</div>
                                      <el-progress style="width: 50%;font-size: 10px" :stroke-width="5" :percentage="progress.progress"
                                                   color="rgba(19, 137, 116, 1)"></el-progress>
                                    </div>
                                  </div>
                                </el-popover>-->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阅卷进度" prop="progress">
          <template #default="scope">
            <el-progress style="width: 80%;" :text-inside="true" :stroke-width="15"
                         :percentage="scope.row.progress.reviewedProgress*100"
                         color="rgba(19, 137, 116, 1)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="预计完成时间" prop="progress.estimatedTime"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="toogleExpand(scope.row)">详情</el-button>
            <el-button type="text" @click="judgeMark(scope.row)">批阅</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="提示"
          v-model="dialogFormVisible"
          width="30%">
        <div style="margin-bottom: 5%">在正式批阅前，您需要先通过样卷批阅测试。</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="goMark">前 往</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "mark_console",
  data() {
    const generateData = _ => {
      const data = [];
      const cities = [{
        id: 0,
        name: '赵国庆'
      }, {
        id: 1,
        name: '王金材'
      }, {
        id: 2,
        name: '黄子键'
      }];
      cities.forEach((city, index) => {
        data.push({
          label: city.name,
          key: index,
        });
      });
      return data;
    }
    return {
      teacherAccount: '000001',
      data: generateData(),
      value: [1, 2],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      note: {
        backgroundImage: "url(" + require("../../../assets/example_paper.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop: "70px",
      },
      exam: {
        id: 2,
        name: 'test',
        course: '数学分析',
        institution: '统计与数学学院',
        time: '2022/1/1 13:40 - 15:40',
        status: '已结束',
        questionCount: 56,
        sectionCount: 4,
        progress: 62,
      },
      // onlying: false,
      dialogFormVisible: false,
      thisQid: 0,
      tableData: [
        {
          qid: '1.1',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 59,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.2',
          exampleFinished: 1,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.3',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.4',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.5',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.6',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
        {
          qid: '1.7',
          exampleFinished: 0,
          time: '2022.2.24 16:00',
          progress: 56,
          description: '人生观的核心是_____。',
          type: '填空题',
          score: 2,
          ans: '人生价值',
          updater: '陈浩',
          updateTime: '2022/2/10',
          difficulty: 0.8,
          point1: '价值观',
          point2: '人生观的核心',
          useCount: 1,
          examiners: [
            {
              id: 0,
              name: '赵国庆',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }, {
              id: 1,
              name: '王金材',
              speed: 15,
              count: 696,
              allQuestions: ['1.1', '1.3'],
              allProgress: 25,
              progresses: [{
                qid: '1.1',
                progress: 25
              }, {
                qid: '1.3',
                progress: 25
              }],
              time: '2022.2.14 16:00'
            }
          ],
        },
      ],
      examiners: [{
        name: '赵国庆',
        progress: [0, 20, 50, 76, 98]
      }],
      questions: [],
      progress: [],
      row: {}
    }
  },
  methods: {
    judgeMark(row) {
      let that = this
      this.row = row
      console.log(row.info.passExample === 0)
      if (row.info.passExample === 0) {
        this.dialogFormVisible = true
      } else {
        let rows = JSON.stringify(row)
        let exam = JSON.stringify(this.exam)
        this.$router.push({
          path: '/teacher/mark/mark_question',
          query: {row: rows, exam: exam, teacherAccount: that.teacherAccount}
        })
      }
    },
    goMark() {
      let obj = JSON.stringify(this.exam)
      let row = JSON.stringify(this.row)
      console.log(this.exam)
      let that = this
      this.$router.push({
        path: '/teacher/mark/mark_example',
        query: {obj: obj, teacherAccount: that.teacherAccount, row: row}
      })
    },
    toogleExpand(row) {
      this.value = []
      let $table = this.$refs.table
      this.thisExaminers = row.examiners
      this.thisQid = row.qid
      console.log(this.thisExaminers)
      let that = this
      this.tableData.map((item) => {
        if (row.qid != item.qid) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
      that.$getRequest('/exam/reviewed/get/teacher/progress?examinationPaperId=' + this.exam.paperId + '&questionIndex=' + row.info.questionIndex).then(res => {
        if (res.data) {
          that.examiners = res.data
          console.log(that.examiners)
        }
      })
    },
    drawEcharts(examiners) {
      console.log(this.examiners)
      let examiner_names = []
      let examiner_progress = []
      let series = []
      let total = []
      for (let i = 0; i < this.examiners.length; i++) {
        examiner_names[i] = this.examiners[i].teacherName
        examiner_progress[i] = this.examiners[i].reviewedTotalPerHour.slice(this.examiners[i].reviewedTotalPerHour.length - 5, this.examiners[i].reviewedTotalPerHour.length)
        series.push({
          name: this.examiners[i].teacherName,
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 份';
            }
          },
          data: examiner_progress[i]
        })
      }
      console.log(series)
      console.log(examiners)
      for (let i = 0; i < examiner_progress[0].length; i++) {
        total[i] = 0
        for (let j = 0; j < examiner_progress.length; j++) {
          total[i] += examiner_progress[j][i]
        }
      }
      series.push({
        name: '总计',
        type: 'line',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 份';
          }
        },
        data: total
      })
      // console.log(series)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: examiners
        },
        xAxis: [
          {
            type: 'category',
            name: '时刻',
            data: [new Date().getHours() - 4, new Date().getHours() - 3, new Date().getHours() - 2, new Date().getHours() - 1, new Date().getHours()],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '批阅份数',
            min: 0,
            max: total[total.length - 1] + 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: series
      };
      let chartId = 'tiger-' + arguments[2] + '-trend-index' + arguments[1];
      this.$nextTick(() => {
        let myChart = this.$echarts.init(document.getElementById('progress1'));
        myChart.setOption(option);
        myChart.resize();
      });
    },
    editExaminer() {
      this.dialogFormVisible = false
      this.thisExaminers = this.value
      console.log(this.thisExaminers)
      let that = this
    }
  },
  mounted() {
    let that = this
    this.exam = eval('(' + this.$route.query.obj + ')')
    console.log(this.exam)
    this.$nextTick(()=>{
      that.$getRequest('/exam/reviewed/teacher/get/question?examinationPaperId=' + this.exam.paperId + '&teacherAccount=' + this.teacherAccount).then(res => {
        if (res.data) {
          res.data.forEach(each => {
            that.$getRequest('/exam/question/info/' + each.questionId).then(res => {
              let detail = res.data
              this.$getRequest('/exam/reviewed/teacher/get/question/progress?examinationPaperId=' + this.exam.paperId + '&teacherAccount=' + this.teacherAccount).then(res => {
                if (res.data) {
                  that.progress = res.data
                  res.data.reviewedQuestionProgressList.forEach(every => {
                    that.questions.push({
                      info: each,
                      detail: detail,
                      progress: every
                    })
                  })
                }
                console.log(that.questions)
              })
            })
          })
        }
      })
      let series = []
      let name = []
      let max = 0
      this.$getRequest('/exam/reviewed/teacher/get/paper/progress?examinationPaperId=' + this.exam.paperId + '&teacherAccount=' + this.teacherAccount).then(res => {
        if (res.data) {
          console.log(res.data)
          res.data.questionProgressList.forEach(each => {
            name[name.length] = each.questionIndex + ''
            series.push({
              name: each.questionIndex + '',
              type: 'bar',
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 份';
                }
              },
              data: each.questionProgress.slice(each.questionProgress.length - 5, each.questionProgress.length)
            })
          })
          series.push({
            name: '总计',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 份';
              }
            },
            data: res.data.totalProgress.slice(res.data.totalProgress.length - 5, res.data.totalProgress.length)
          })
          max = res.data.totalProgress[res.data.totalProgress.length - 1] + 5
          /*        console.log(max)
                  console.log(series)
                  console.log(name)*/
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: name
            },
            xAxis: [
              {
                name: '时刻',
                type: 'category',
                data: [new Date().getHours() - 4, new Date().getHours() - 3, new Date().getHours() - 2, new Date().getHours() - 1, new Date().getHours()],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '批阅份数',
                min: 0,
                max: max,
              },
            ],
            series: series
          }
          let myChart = this.$echarts.init(document.getElementById('progress'));
          myChart.setOption(option);
          myChart.resize();
        }
      })
    })

  }
}
</script>

<style scoped>
.exam_info {
  width: 600px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
}

.exam_info_content {
  margin-left: 2%;
  color: #767676;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

:deep(.el-table__expand-icon) {
  display: none;
}

:deep(.el-table__body) {
  table-layout: fixed;
  border-collapse: separate;
  width: 98%;
}
</style>
