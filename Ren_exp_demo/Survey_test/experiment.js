/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
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
    stimulus: '<p>请做好准备……</p>',
    choices: ['<span id="timer">1</span>秒后继续'],/* 暂时先改成1s，正式为3s */
    button_html: btn_html_timer
}

var instr_1 = {
    type:'instructions',
    pages:[
        `<p style="text-align: left">
        同学您好，感谢您参加本研究。<br/><br/>
        该测验共有34道单项选择题，每题的分值一样。<br/><br/>
        请合理安排时间。十分感谢您的耐心与认真！</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_5 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明您对这些陈述的同意程度。<br/><br/>
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
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明您对这些陈述的赞同程度。<br/><br/>
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
    <p><input name = "Q0" type = "number" placeholder = "0001" min=0001 max=1199 
    oninput="if(value.length>4) value=value.slice(0,4)" required /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}


var Big_Five = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明您对该陈述的同意程度<br/>
        （1 = 非常不同意，5 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4', '5'],
        on_finish: function(data) { addRespFromButtonScale(data, 'Big_Five') 
        jsPsych.setProgressBar(0.85)},
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1}, s: '执行自己的计划。' },
        { data: { i:2}, s: '做事有始有终。' },
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


var surveys = {
    timeline: [
        instr_6, CCTDI,
        instr_5, Big_Five,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
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