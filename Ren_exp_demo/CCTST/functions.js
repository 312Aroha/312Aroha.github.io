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

function timer_1() {
    var second = document.getElementById('timer_1')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '继续'
            button.disabled = false
        }
    }
}

//下载提醒中的倒计时
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
    //把CCTST中的数字选项转为字母选项
    var choice = 'ABCDE'
    data.response = choice.substr(data.button_pressed,1) 
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