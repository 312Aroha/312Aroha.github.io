/**
 * Original Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 * Adopted by Ren xy
 */


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的研究</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    华东师范大学心理与认知科学学院<br/>2020年</p>`,
    choices: [' '],
    post_trial_gap: 100
}


var warmup = {
    type: 'html-button-response',
    stimulus: `
    <p style="text-align: left">
    同学您好，感谢您参加本研究。<br/><br/>
    本问卷分为两个部分，第一部分为36道自评题，第二部分为70道自评题。<br/><br/>
    请您先填写个人基本信息，谢谢您的配合和耐心！</p>`,
    choices: ['<span id="timer">3</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_5 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        接下来将会呈现36条陈述，请表明您对这些陈述的同意程度。<br/><br/></p>
        <p style="text-align: left; width:300px; margin:0 auto">        
        1 = 非常不同意<br/>
        2 = 比较不同意<br/>
        3 = 既不同意也不反对<br/>
        4 = 比较同意<br/>
        5 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_6 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        接下来有70条陈述，请表明您对这些陈述的赞同程度。<br/><br/></p>
        <p style="text-align: left; width:300px; margin:0 auto">
        1 = 非常不赞同<br/>
        2 = 不赞同<br/>
        3 = 不太赞同<br/>
        4 = 基本赞同<br/>
        5 = 赞同<br/>
        6 = 非常赞同</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Surveys */
    
        
var Subject_Number = {
    type: 'survey-html-form',
    data: {varname: 'Subject_Number'},
    preamble: '您的编号',
    html:`
    <p><input name = "Q0" type = "number" placeholder = "4位数字" style="width:60px;"
    oninput="if(value.length>4) value=value.slice(0,4)" required /></p>`,//不知道如何设置至少输入4位数
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '您的性别',
    choices: ['男', '女'],//删除‘其他’
    on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '您的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="18~99" min=18 max=99 style="width:50px;"
    oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Major = {
    type: 'survey-html-form',
    data: { varname: 'Major' },
    preamble: '您的专业',
    html: `
    <p><select name="Q0" size=14 style = "font-size: 13pt">
    <option>哲学</option>
    <option>经济学</option>
    <option>法学</option>
    <option>教育学</option>
    <option>文学</option>
    <option>历史学</option>
    <option>理学</option>
    <option>工学</option>
    <option>农学</option>
    <option>医学</option>
    <option>军事学</option>
    <option>管理学</option>
    <option>艺术学</option>
    <option>其他</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Now_Level = {
    type: 'survey-html-form',
    data: { varname: 'Now_Level' },
    preamble: '您目前的受教育水平<br>', //棒！！可以修改为radio//选项左对齐
    html: `
    <p style="text-align: left"> 
    <input name="Q0" type="radio" value="本科">本科<br>
    <input name="Q0" type="radio" value="硕士">硕士<br>
    <input name="Q0" type="radio" value="博士">博士<br>
    <input name="Q0" type="radio" value="博士以上">博士以上</p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Expect_Level = {
    type: 'survey-html-form',
    data: { varname: 'Expect_Level' },
    preamble: '您<span style="color:DimGray">期望</span>的受教育水平',//灰色强调“目前” 
    html: `
    <p style="text-align: left"> 
    <input name="Q0" type="radio" value="本科">本科<br>
    <input name="Q0" type="radio" value="硕士">硕士<br>
    <input name="Q0" type="radio" value="博士">博士<br>
    <input name="Q0" type="radio" value="博士以上">博士以上</p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var BFAS = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明您对该陈述的同意程度<br/>
        （1 = 非常不同意，5 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4', '5'],
        on_finish: function(data) { addRespFromButtonScale(data, 'BFAS') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1}, s: '执行自己的计划。' },
        { data: { i:2}, s: '做事有始有终。' },
        { data: { i:3}, s: '很快完成事情。' },
        { data: { i:4}, s: '总是知道自己在做什么。' },
        { data: { i:5}, s: '浪费自己的时间。' },
        { data: { i:6}, s: '发现很难踏实工作。' },
        { data: { i:7}, s: '把事情弄糟。' },
        { data: { i:8}, s: '不能把心思放在手头的工作上。' },
        { data: { i:9}, s: '推迟决定。' },
        { data: { i:10}, s: '很容易分心。' },
        { data: { i:11}, s: '喜欢有秩序。' },
        { data: { i:12}, s: '保持物品整洁。' },
        { data: { i:13}, s: '按计划进行。' },
        { data: { i:14}, s: '懂得遵守规则。' },
        { data: { i:15}, s: '照顾每一个细节。' },
        { data: { i:16}, s: '乱放自己的东西。' },
        { data: { i:17}, s: '不介意邋遢的人。' },
        { data: { i:18}, s: '不介意杂乱，无秩序。' },
        { data: { i:19}, s: '理解事物快。' },
        { data: { i:20}, s: '能处理大量信息。' },
        { data: { i:21}, s: '喜欢解决复杂问题。' },
        { data: { i:22}, s: '有丰富的词汇。' },
        { data: { i:23}, s: '思维敏捷。' },
        { data: { i:24}, s: '能清楚地表达想法。' },
        { data: { i:25}, s: '理解抽象的概念有困难。' },
        { data: { i:26}, s: '避免困难的阅读材料。' },
        { data: { i:27}, s: '学东西慢。' },
        { data: { i:28}, s: '享受大自然的美。' },
        { data: { i:29}, s: '相信艺术的重要性。' },
        { data: { i:30}, s: '爱思考。' },
        { data: { i:31}, s: '能深深沉浸在音乐中。' },
        { data: { i:32}, s: '能发现别人没有注意到的美。' },
        { data: { i:33}, s: '需要一个具有创造性的发泄方法。' },
        { data: { i:34}, s: '不喜欢诗歌。' },
        { data: { i:35}, s: '很少陷入沉思。' },
        { data: { i:36}, s: '很少注意到绘画和图片的情感方面。' },
    ],
    randomize_order: true
}

var CCTDI = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明您对该陈述的同意程度<br/>
        （1 = 非常不赞同，6 = 非常赞同）</p>`,
        choices: ['1', '2', '3', '4', '5', '6'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTDI') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1}, s: '面对有争议的论题，要从不同的见解中选择其一，是极不容易的。' },
        { data: { i:2}, s: '对某件事如果有四个理由赞同，而只有一个理由反对，我会选择赞同这件事。' },
        { data: { i:3}, s: '即使有证据与我的想法不符，我都会坚持我的想法。' },
        { data: { i:4}, s: '处理复杂的问题时，我感到惊惶失措。' },
        { data: { i:5}, s: '当我表达自己的意见时，要保持客观是不可能的。' },
        { data: { i:6}, s: '我只会寻找一些支持我看法的事实，而不会去找一些反对我看法的事实。' },
        { data: { i:7}, s: '有很多问题我会害怕去寻找事实的真相。' },
        { data: { i:8}, s: '既然我知道怎样作这决定，我便不会反复考虑其他的选择。' },
        { data: { i:9}, s: '我们不知道应该用什么标准来衡量绝大部分问题。' },
        { data: { i:10}, s: '个人的经验是验证真理的唯一标准。' },
        { data: { i:11}, s: '了解别人对事物的想法，对我来说是重要的。' },
        { data: { i:12}, s: '我正尝试少做主观的判断。' },
        { data: { i:13}, s: '研究外国人的想法是很有意义的。' },
        { data: { i:14}, s: '当面对困难时，要考虑事件所有的可能性，这对我来说是不可能做到的。' },
        { data: { i:15}, s: '在小组讨论时，若某人的见解被其他人认为是错误的，他便没有权利去表达意见。' },
        { data: { i:16}, s: '外国人应该学习我们的文化，而不是要我们去了解他们的文化。' },
        { data: { i:17}, s: '他人不应该强逼我去为自己的意见作辩护。' },
        { data: { i:18}, s: '对不同的世界观（例如:进化论、有神论）持开放态度，并不是那么重要。' },
        { data: { i:19}, s: '各人有权利发表他们的意见，但我不会理会他们。' },
        { data: { i:20}, s: '我不会怀疑众人都认为是理所当然的事。' },
        { data: { i:21}, s: '当他人只用浅薄的论据去为好的构思护航，我会感到着急。' },
        { data: { i:22}, s: '我的信念都必须有依据支持。' },
        { data: { i:23}, s: '要反对别人的意见，就要提出理由。' },
        { data: { i:24}, s: '我发现自己常评估别人的论点。' },
        { data: { i:25}, s: '我可以算是个有逻辑的人。' },
        { data: { i:26}, s: '处理难题时，首先要弄清楚问题的症结所在。' },
        { data: { i:27}, s: '我善于有条理地去处理问题。' },
        { data: { i:28}, s: '我并不是一个很有逻辑的人，但却常常装作有逻辑。' },
        { data: { i:29}, s: '要知道哪一个是较好的解决方法，是不可能的。' },
        { data: { i:30}, s: '生活的经验告诉我，处事不必太有逻辑。' },
        { data: { i:31}, s: '我总会先分析问题的重点所在，然后才解决它。' },
        { data: { i:32}, s: '我很容易整理自己的思维。' },
        { data: { i:33}, s: '我善于策划一个有系统的计划去解决复杂的问题。' },
        { data: { i:34}, s: '我经常反复思考在实践和经验中的对与错。' },
        { data: { i:35}, s: '我的注意力很容易受到外界环境影响。' },
        { data: { i:36}, s: '我可以不断谈论某一问题，但不在乎问题是否得到解决。' },
        { data: { i:37}, s: '当我看见新产品的说明书复杂难懂时，我便放弃继续阅读下去。' },
        { data: { i:38}, s: '人们说我作决定时过于冲动。' },
        { data: { i:39}, s: '人们认为我作决定时犹豫不决。' },
        { data: { i:40}, s: '我对争议性话题的意见，大多跟随最后与我谈论的人。' },
        { data: { i:41}, s: '我欣赏自己拥有精确的思维能力' },
        { data: { i:42}, s: '需要思考而非全凭记忆作答的测验较适合我。' },
        { data: { i:43}, s: '我的好奇心和求知欲受到别人欣赏' },
        { data: { i:44}, s: '面对问题时，因为我能做出客观的分析，所以我的同辈会找我作决定。' },
        { data: { i:45}, s: '对自己能够想出有创意的选择，我很满足。' },
        { data: { i:46}, s: '做决定时，其他人期待我去制定适当的准则作指引。' },
        { data: { i:47}, s: '我的求知欲很强。' },
        { data: { i:48}, s: '对自己能够了解其他人的观点，我很满足' },
        { data: { i:49}, s: '当问题变得棘手时，其他人会期待我继续处理。' },
        { data: { i:50}, s: '我不害怕在课堂上提问' },
        { data: { i:51}, s: '研究新事物能使我的人生更丰富。' },
        { data: { i:52}, s: '当面对一个重要抉择前，我会先尽力搜集一切有关的资料。' },
        { data: { i:53}, s: '我期待去面对富有挑战性的事物。' },
        { data: { i:54}, s: '解决难题是富有趣味性的。' },
        { data: { i:55}, s: '我喜欢去找出事物是如何运作的。' },
        { data: { i:56}, s: '无论什么话题，我都渴望知道更多相关的内容。' },
        { data: { i:57}, s: '我会尽量去学习每一样东西，即使我不知道它们何时有用' },
        { data: { i:58}, s: '学校里大部分的课程是枯燥无味的，不值得去选修' },
        { data: { i:59}, s: '学校里的必修科目是浪费时间的。' },
        { data: { i:60}, s: '主动尝试去解决各样的难题，并非那么重要。' },
        { data: { i:61}, s: '最好的论点，往往来自于对某个问题的瞬间感觉' },
        { data: { i:62}, s: '所谓真相，不外乎个人的看法。' },
        { data: { i:63}, s: '付出高的代价（例如：金钱、时间、精力），便一定能换取更好的意见。' },
        { data: { i:64}, s: '当我持开放的态度，便不知道什么是真、什么是假。' },
        { data: { i:65}, s: '如果可能的话，我会尽量避免阅读' },
        { data: { i:66}, s: '对我自己所相信的事，我是坚信不疑的。' },
        { data: { i:67}, s: '用“比喻”去理解问题，像在公路上驾驶小船。' },
        { data: { i:68}, s: '解决难题的最好方法是向别人问取答案。' },
        { data: { i:69}, s: '事物的本质和它的表象是一致的。' },
        { data: { i:70}, s: '有权势的人所作的决定便是正确的决定。' },        
    ],
    randomize_order: true
}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '测验已全部完成，您可以分享任何疑问或想法：',
        placeholder: '非必答',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}

/* 添加下载提醒 */
var DownloadReminding = {
    type: 'html-button-response',
    stimulus: `
    在您点击“完成”按钮后，将会开始下载文件。<br/>
    请您允许下载，并将文件名修改为您的编号后发送给主试。<br/><br/>
    再次感谢您的耐心与配合！
    <p style="color: DodgerBlue">o(≧v≦)o</p>`,
    choices: ['完成']
}

/* Combine Timelines */

var demographics = {
    timeline: [
        Subject_Number, Sex, Age, Major, Now_Level, Expect_Level,
    ]
}

var surveys = {
    timeline: [
        instr_5, BFAS,
        instr_6, CCTDI,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    surveys,
    OpenEnded,
    DownloadReminding,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `请重命名为您的编号并发给主试.csv`) // download from browser // 把csv后缀改掉
        document.getElementById('jspsych-content').innerHTML += '测验结束，感谢您的参与！'
    }
})