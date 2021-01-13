/**
 * Original Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 * Adopted by Ren xy
 */

/* Custom JS Functions */

// NOTE: When using JS functions, parameters should be defined in order!

function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}

function inputDialog(title, default_text) {
    var input = prompt(msg = title, defaultText = default_text)
    return input
}

// 用在demographics_pre
function timer_1() {
    var second = document.getElementById('timer_1')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '我很认真！开始！'
            button.disabled = false
        }
    }
}

// 下载提醒中的倒计时
function timer_2() {
    var second = document.getElementById('timer_2')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '下载'
            button.disabled = false
        }
    }
}


// 用于attention check
function attention_check (data) {
    data.correct = false;
    check_false_count += 1;
    if (check_false_count == 2){
        alert('您已2次不认真作答，本次测验终止!\n\n请您准备好后重新作答，或联系主试退出本研究。')
        jsPsych.init({
            timeline: [close_fullscreen],
            on_finish: function() {
                document.getElementById('jspsych-content').innerHTML += '本次测验已终止。'
            }
        })
    } else {
        alert('请仔细阅读题目并做出选择！\n\n第2次不认真作答将终止测验。');
    }
}

// alert之后，继续全屏
var exitFullscreen = false
function handleFullScreen() {
    var element = document.documentElement;
    if(this.fullscreen) {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

function addRespFromButton(data) {
    // compute variables from button-plugin response (for simple item)
    var d = new Date();
    data.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromButtonScale(data, scale_name, var_i = 'i') {
    // compute variables from button-plugin response (for likert scale)
    var d = new Date();
    data.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    data.scale = scale_name
    data.varname = scale_name + data[var_i]
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromSurvey(data, parse_int = false) {
    // only for single response ('Q0' in survey-plugin responses)
    var d = new Date();
    data.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    var resp = String(JSON.parse(data.responses).Q0)
    data.responses = resp
    data.response = (parse_int) ? resp.match(/\d+/) : resp
}

function replaceComma(data, sep = '|') {
    // only for single response ('Q0' in survey-plugin responses)
    var d = new Date();
    data.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    data.responses = String(JSON.parse(data.responses).Q0).split(',').join(sep)
}

/* JS Functions from the R package 'jspsychr' */

save_locally = function() {
    var data = jsPsych.data.get().csv()
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'submit')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ filedata: data }))
};

