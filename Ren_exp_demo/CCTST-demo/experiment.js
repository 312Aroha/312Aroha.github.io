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
        同学您好，欢迎您参加本研究。<br/><br/>
        该测验共有34道单项选择题，每题的分值一样。<br/><br/>
        请合理安排时间。十分感谢您的耐心与认真!</p>`,
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


var Item_1 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:1}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>1&ensp;&emsp;一个城市的几个青年业余足球队被认为实力旗鼓相当。但事实上有些队稍强，有些队稍弱。假如上星期六烟花队胜了野花队。假如上上星期六野花队胜了野马队。下星期六烟花队与野马队比赛，结果会如何？
        </b><br/><br/>
        A&ensp;&ensp;烟花队肯定会赢。<br/>
        B&ensp;&ensp;烟花队很可能赢，也可能输。<br/>
        C&ensp;&ensp;烟花队很可能输，也可能赢。<br/>
        D&ensp;&ensp;烟花队肯定输。<br/>
        E&ensp;&ensp;比赛将以平局告终。</p>`},
    ],
    randomize_order: false
}

var Item_2_3_4 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:2}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>2&ensp;&emsp;思考这个论断：“甚至托马斯·杰弗逊有时也使用托词”，这一论断与下列理由有关：“毕竟，每个政客都必须迎合选民。杰弗逊是伟大的政治家，但也是政客。至少在有些场合，不使用托词就不能迎合选民。”设想所有作为理由的陈述为真，第一个论断：
        </b><br/><br/>
        A&ensp;&ensp;不可能为假。<br/>
        B&ensp;&ensp;很可能真，也可能假。<br/>
        C&ensp;&ensp;很可能假，也可能真。<br/>
        D&ensp;&ensp;不可能真。</p>`},
        { data: { i:3}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>3&ensp;&emsp;假如“只有那些寻求挑战和冒险的人才会参军”为真。下列哪个选项表达了同样的意思？
        </b><br/><br/>
        A&ensp;&ensp;如果你寻求挑战和冒险，你就会参军。<br/>
        B&ensp;&ensp;如果你参军，就会寻求挑战和冒险。<br/>
        C&ensp;&ensp;除了参军，你不会寻求挑战和冒险。<br/>
        D&ensp;&ensp;你不会参军，除非你寻求挑战和冒险。</p>`},
        { data: { i:4}, s: '<p style = "font: 16pt FangSong; text-align: left">第4题使用下图：</p><br/>' + 
        "<image src = '第4题.png' width=592 height=400 /><br/><br/>" + 
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>4&ensp;&emsp;Tay-Sachs是一种遗传病。这种病的基因能从携带病毒的父亲/母亲那里遗传给亲生孩子。上图显示的是Tay-Sachs疾病的可能遗传模式。如果父母双方都是携带者，他们的孩子约有75%的概率被感染。遗传概率为：父母双方都是携带者，孩子为携带者的概率是50%，真正患病的概率是25%。假如已婚的哈卫和莎兰想要孩子，在做Tay-Sachs检测时，哈卫和莎兰得知他俩都是Tay-Sachs携带者。根据以上提供的信息，可以判断：
        </b><br/><br/>
        A&ensp;&ensp;他们的孩子不是患Tay-Sachs，就是Tay-Sachs携带者。<br/>
        B&ensp;&ensp;尽管风险很大，他们的孩子还是有可能不被感染。<br/>
        C&ensp;&ensp;哈卫和莎兰考虑到这种风险，决定不要孩子。<br/>
        D&ensp;&ensp;哈卫和莎兰还想做父母，他们决定收养一个孩子。</p>`},//有图片字体大小改为18pt
    ],
    randomize_order: false
}

var Item_5 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:5}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>5&ensp;&emsp;“爱泽琳尼亚人撒谎”等同于下列哪个说法：
        </b><br/><br/>
        A&ensp;&ensp;任何人只要是爱泽琳尼亚人，那个人就是说谎者。<br/>
        B&ensp;&ensp;如果某人是个说谎者，那个人就是爱泽琳尼亚人。<br/>
        C&ensp;&ensp;至少有个说谎的爱泽琳尼亚人。<br/>
        D&ensp;&ensp;人们不会说谎，除非他们是爱泽琳尼亚人。<br/>
        E&ensp;&ensp;以上说法是一回事。</p>`},
    ],
    randomize_order: false
}

var Item_6_7_8_9 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:6}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>6&ensp;&emsp;“不是所有的候选人都有资格胜任”表达的意思与下列哪个相同？
        </b><br/><br/>
        A&ensp;&ensp;没有一个候选人有资格胜任。<br/>
        B&ensp;&ensp;有些候选人没有资格胜任。<br/>
        C&ensp;&ensp;有资格胜任的不是候选人。<br/>
        D&ensp;&ensp;所有候选人都没有资格胜任。</p>`},
        { data: { i:7}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>7&ensp;&emsp;“这个池塘的微生物通常在冰点以上繁殖。现在是冬季，池塘已结冰。因此，如果这个池塘中有我们研究的微生物，它们现在不会繁殖。”假如以上论据都为真，这个段落的结论：        </b><br/><br/>
        A&ensp;&ensp;不可能不正确。<br/>
        B&ensp;&ensp;很可能正确，但也可能不正确。<br/>
        C&ensp;&ensp;很可能不正确，但也可能正确。<br/>
        D&ensp;&ensp;不可能正确。</p>`},
        { data: { i:8}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>8&ensp;&emsp;思考这一组命题：“尼禄是公元一世纪时的罗马皇帝。每个罗马皇帝都喝酒，他们喝酒时用的酒具一律是锡铅合金做的酒壶和高脚杯。无论谁使用锡铅合金，即使一次，也会导致铅中毒。铅中毒的症状通常是精神错乱。”如果以上所有命题为真，下列哪一个一定为真？        </b><br/><br/>
        A&ensp;&ensp;那些精神错乱者至少使用过一次锡铅合金器具。<br/>
        B&ensp;&ensp;不论怎样，尼禄皇帝一定精神错乱。<br/>
        C&ensp;&ensp;使用锡铅合金是罗马皇帝的特权。<br/>
        D&ensp;&ensp;铅中毒在罗马帝国时代的居民中很常见。</p>`},
        { data: { i:9}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">第9题和第10题使用下图：</p>' + 
        "<image src = '第9、10题.png' width=681 height=550 /><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2em">
        <b>9&ensp;&emsp;根据上图，如果你正在十层高的旅馆第四层的房间看电视，突然听到火警警报，你很可能：
        </b><br/><br/>
        A&ensp;&ensp;从楼梯出去。<br/>
        B&ensp;&ensp;睡觉。<br/>
        C&ensp;&ensp;从电梯出去。<br/>
        D&ensp;&ensp;待在房间里。<br/>
        E&ensp;&ensp;摸门的温度。</p>`},//有图片字体大小改为18pt
    ],
    randomize_order: false
}

var Item_10_11_12_13_14_15 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:10}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">第9题和第10题使用下图：</p>' + 
        "<image src = '第9、10题.png' width=681 height=550 /><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>10&ensp;&emsp;假如火警声把你吵醒，你摸了门，温度正常。然后又检查了走廊。在门厅地板上的每个门口都放着一份叠好的早报。在隔壁门口你看到托盘上放一些玻璃杯、酒杯和一摞脏盘子。你还看到一些人拎着衣箱不慌不忙地乘电梯下楼。设想电梯离你的房间比楼梯近。在这种情况下，你很可能：
        </b><br/><br/>
        A&ensp;&ensp;从楼梯出去。<br/>
        B&ensp;&ensp;待在房间。<br/>
        C&ensp;&ensp;打包衣箱。<br/>
        D&ensp;&ensp;乘电梯下楼。<br/>
        E&ensp;&ensp;给服务台打电话咨询。</p>`},//题号2位数，悬挂增加0.5em //有图片字体大小改为18pt
        { data: { i:11}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>11&ensp;&emsp;“近来公司新开了许多专卖分店。这证明公司对使用更为复杂的方法占领市场很感兴趣。”这段话省掉了：
        </b><br/><br/>
        A&ensp;&ensp;结论，“公司将在占领市场方面做得更好”。<br/>
        B&ensp;&ensp;结论，“管理层想用更好的方式占领市场”。<br/>
        C&ensp;&ensp;前提，“在开这些新店之前，公司的市场销售很失败”。<br/>
        D&ensp;&ensp;前提，“这些新店在用复杂的新方法打入市场”。<br/>
        E&ensp;&ensp;结论，“公司存在的首要目的，即使不是唯一目的，是为其所有者谋利益”。</p>`},
        { data: { i:12}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>12&ensp;&emsp;“对州立大学快乐学前班的研究表明，参加9个月全日制快乐学前班的孩子在预备一年级的标准化测试中，平均得分58分。研究也表明那些只在上午上学、为期9个月的4岁孩子的平均成绩为52分；只在下午上学、为期9个月的4岁孩子的平均成绩为51分。第二个研究对象是参加了9个月的全日制教会学前班的4岁孩子，研究表明这些孩子在同样测试中的平均成绩54分。第三个研究对象是那些没有参加过学前班学习、来自低收入家庭的孩子，他们在同样的考试中平均成绩是32分。32分同其他分数相比呈显著性差异。”根据这一数据能得出的最可能的科学假设是：
        </b><br/><br/>
        A&ensp;&ensp;一个得了50分以上的孩子已为上小学预备级做好了准备。<br/>
        B&ensp;&ensp;在一个似真假设得出之前需要更多的测试。<br/>
        C&ensp;&ensp;学前班学习与小学预备级学习没有关系。<br/>
        D&ensp;&ensp;应该有资金支持4岁孩子参加学前班。<br/>
        E&ensp;&ensp;学前班学习和小学预备级学习相关。</p>`},
        { data: { i:13}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>13&ensp;&emsp;思考这段短文：“（1）波兰1926年时不是君主制国家。（2）确实，许多欧洲历史学家认为，第一次世界大战结束了欧洲的君主制。（3）事隔一代以后，当第二次世界大战开始时，欧洲或者西半球除了那些纯粹的仪式上的君主立宪国家，君主制国家已经不存在。（4）然而，没有认真考虑中东的情况就下结论说我们目睹了最后的君主统治，这种想法是错误的。”以上短文被最好表述为：
        </b><br/><br/>
        A&ensp;&ensp;试图说明（1）为真。<br/>
        B&ensp;&ensp;试图说明（2）为真。<br/>
        C&ensp;&ensp;试图说明（3）为真。<br/>
        D&ensp;&ensp;试图说明（4）为真。<br/>
        E&ensp;&ensp;并未试图说明上述任何一个。</p>`}, 
        { data: { i:14}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">14和15题依据以下虚构的情景：</p><br/>' + 
        `<p style="font: 18pt 仿宋; text-align: left; width:900px; margin:0 auto;text-indent: 2em">
        一所大学正好有7个学生俱乐部：1、2、3、4、5、6、7。校长必须从不同的俱乐部选5个俱乐部成员担任重要委员。
        除了下列情况外，任何组合都行：如果从第1个俱乐部选了1人，第5个就不能选。同样，如果从第3个选了人，第5个必须选1人。
        如果第2个有1人入选委员会，第6个必须有成员进入委员会。</p><br/><br/>` +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>14&ensp;&emsp;下面是委员会的五种可能组合。哪种组合满足所有条件？
        </b><br/><br/>
        A&ensp;&ensp;1、2、4、5、6<br/>
        B&ensp;&ensp;2、3、4、5、6<br/>
        C&ensp;&ensp;2、3、4、6、7<br/>
        D&ensp;&ensp;1、4、5、6、7<br/>
        E&ensp;&ensp;1、2、3、6、7</p>`},
        { data: { i:15}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">14和15题依据以下虚构的情景：</p><br/>' + 
        `<p style="font: 18pt 仿宋; text-align: left; width:900px; margin:0 auto;text-indent: 2em">
        一所大学正好有7个学生俱乐部：1、2、3、4、5、6、7。校长必须从不同的俱乐部选5个俱乐部成员担任重要委员。
        除了下列情况外，任何组合都行：如果从第1个俱乐部选了1人，第5个就不能选。同样，如果从第3个选了人，第5个必须选1人。
        如果第2个有1人入选委员会，第6个必须有成员进入委员会。</p><br/><br/>` +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>15&ensp;&emsp;假如校长不准备从俱乐部7中选人，在这种情况下，哪个俱乐部的成员也不能入选委员会？
        </b><br/><br/>
        A&ensp;&ensp;5<br/>
        B&ensp;&ensp;4<br/>
        C&ensp;&ensp;3<br/>
        D&ensp;&ensp;2<br/>
        E&ensp;&ensp;1</p>`},
    ],
    randomize_order: false
}

var Item_16_17 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:16}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>16&ensp;&emsp;“自从1991年阿拉斯加州艾克森游艇失事和1991年中东战争以来，喷气机燃料的费用急剧增长；与此同时，汽油的其他同类产品的价格也迅速增长，这两个事实证明喷气机燃料是一种汽油的衍生物。”对该推理的最佳评估是：
        </b><br/><br/>
        A&ensp;&ensp;好思维。因为喷气机燃料是汽油的衍生物。<br/>
        B&ensp;&ensp;好思维。但是，并非所有事实都表述得准确。<br/>
        C&ensp;&ensp;坏思维。食物的费用在同一时间也在上涨，但是那并不能证明喷气燃料是食物。<br/>
        D&ensp;&ensp;坏思维。给定关于石油衍生物的事实，人们不能得出关于喷气燃料结论。</p>`},
        { data: { i:17}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>17&ensp;&emsp;“黎明时分，克里斯托夫·约瑟夫静静地坐在那儿，鼻子贴在卧室的凉玻璃窗上。他期望这时是清晨，这样他就能出去玩垒球了。他苦苦地想着、盼着太阳的出现。在这样盼望的时候，天空开始亮了。他继续盼望着。确实，太阳移出了地平线，升到了清晨的空中。他很自豪。克里斯托夫想想所发生的一切，断然认为他有能力把所有清冷寂寞的夜晚变成明亮快乐的夏日早晨，只要他想。”对克里斯托夫推理的最好评价是：
        </b><br/><br/>
        A&ensp;&ensp;差。期望后发生的事情并不意味着因为期望而发生了。<br/>
        B&ensp;&ensp;差。他期望或不期望，地球都绕着太阳转。<br/>
        C&ensp;&ensp;好。克里斯托夫才是个孩子。<br/>
        D&ensp;&ensp;好。有什么证据能证明，如果他不期望的话，就不会发生所发生的一切。</p>`},
    ],

    randomize_order: false
}

var Item_18 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:18}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>18&ensp;&emsp;设想一位植物学家在做有关园林植物的演讲时说：“玫瑰有许多颜色。”下述哪个是对这一论断的最好解释？
        </b><br/><br/>
        A&ensp;&ensp;有一种玫瑰，它不止一种颜色。<br/>
        B&ensp;&ensp;有一种东西，它不止一种颜色，这种东西是玫瑰。<br/>
        C&ensp;&ensp;所有的玫瑰都不止一种颜色。<br/>
        D&ensp;&ensp;并非每一种玫瑰都是同样的颜色。<br/>
        E&ensp;&ensp;以上都是同样能接受的解释。</p>`},
    ],
    randomize_order: false
}

var Item_19_20 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:19}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>19&ensp;&emsp;“对于死刑似乎有两种流行的论证支持它。一个是对死亡的畏惧将会阻止其他人犯同样可怕的罪行。第二种是死刑比替代形式——终身监禁显得更经济。但是到目前为止，每项科学研究都表明经济现实强烈支持终身监禁。人们通常认为死刑省钱，但这并不能改变经济事实！因此，死刑应被废除。”对说话者推理的最佳评价是：
        </b><br/><br/>
        A&ensp;&ensp;差。它没有表明公众的相关意见。<br/>
        B&ensp;&ensp;差。它没有涉及有关阻止他人犯罪的论证。<br/>
        C&ensp;&ensp;好。它表明死刑很可能应该被取消。<br/>
        D&ensp;&ensp;好。但对废除死刑的论证实际上是错误的。</p>`},
        { data: { i:20}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>20&ensp;&emsp;“特利，别担心。将来某一天你会毕业的。你是个大学生，对吧？所有的大学生迟早都会毕业的。”假如这段话里所有的论据为真，结论：
        </b><br/><br/>
        A&ensp;&ensp;不可能假。<br/>
        B&ensp;&ensp;很可能真，但也可能假。<br/>
        C&ensp;&ensp;很可能假，但也可能真。<br/>
        D&ensp;&ensp;不可能真。</p>`},
    ],
    randomize_order: false
}

var Item_21_22 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:21}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">第21题使用下图：</p>' + 
        "<image src = '第21题.png' width=415 height=150 /><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>21&ensp;&emsp;桌子上有3张三角形的卡片。毎张的两面都印着1个字母。为了证明论断：“如果一面印着字母K另一面印着母B。”永远为真，必须翻哪张或哪几张卡片？
        </b><br/><br/>
        A&ensp;&ensp;只翻第1张。<br/>
        B&ensp;&ensp;只第2张。<br/>
        C&ensp;&ensp;1、2、3张都翻。<br/>
        D&ensp;&ensp;翻第1、2张，不翻第3张。<br/>
        E&ensp;&ensp;翻第2、3张，不翻第1张。</p>`},//有图片字体大小改为18pt
        { data: { i:22}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>22&ensp;&emsp;“对蒙福得中学的中学生的研究发现，在那些每天喝2到3瓶啤酒、持续60天的学生中，75%的学生明显感到肝功能退化。这些结果是碰巧发生的说法，已被高信度的实验排除。”如果是真的，蒙福得中学的信息会证实：
        </b><br/><br/>
        A&ensp;&ensp;酒与青少年肝功能退化呈显著意义的相关。<br/>
        B&ensp;&ensp;饮酒导致青少年肝功能退化。<br/>
        C&ensp;&ensp;性在酒与肝功能退化的关系中不是一个因素。<br/>
        D&ensp;&ensp;研究者想证明年轻人不应该喝酒。<br/>
        E&ensp;&ensp;喝酒年龄的法律已经过时，应当修改。</p>`},
    ],
    randomize_order: false
}

var Item_23_24_25_26_27_28_29_30 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:23}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>23&ensp;&emsp;思考这个论证：“L比X矮，Y比L矮，但M比Y矮。因此，Y比J矮。”假如所有的前提为真，必须加上什么信息才使得结论为真？
        </b><br/><br/>
        A&ensp;&ensp;L比J高。<br/>
        B&ensp;&ensp;X比J高。<br/>
        C&ensp;&ensp;J比L高。<br/>
        D&ensp;&ensp;J比M高。</p>`},
        { data: { i:24}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>24&ensp;&emsp;“一副52张的标准扑克牌包括4个国王，4个皇后和4个丑角。为了方便起见，我们称这12张是花牌。其他的牌从A到10用数字标识。为简单起见，我们称它们为数字牌。现在，假如拿着一副洗好了的52张的标准扑克牌，根据我们所了解的可以得出结论，在这52张牌中有4张丑角，4张皇后和4张国王。”对作者结论的最恰当评价是：
        </b><br/><br/>
        A&ensp;&ensp;差。结论如同“天空是蓝色的，因为它是蓝色”的中的结论一样，没有证明任何东西。<br/>
        B&ensp;&ensp;好。结论是对给出事实的精确重述。<br/>
        C&ensp;&ensp;好。推理充分考虑了每张牌。<br/>
        D&ensp;&ensp;差。结论没有考虑画一张花牌的可能性。</p>`},
        { data: { i:25}, s: `
        <p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>25&ensp;&emsp;“保密是医生和病人之间关系很重要的内容。但是保护无辜者不被伤害也很重要。没人能肯定指出这两者哪个更为重要。这种情况有时会让人进退两难。比如，医生在无意间知道病人要去伤害某一儿童。这时选择保密还是把危险性告知相关部门，对医生而言是很难做岀决策的。”对该推理的最佳评估是：
        </b><br/><br/>
        A&ensp;&ensp;好思维。因为保密不能被损害。<br/>
        B&ensp;&ensp;好思维。因为在理论上，这些价值互相冲突。<br/>
        C&ensp;&ensp;坏思维。因为在实践中，医生确实在两种价值中作取舍。<br/>
        D&ensp;&ensp;坏思维。因为法律明文规定保护儿童的权益更为重要。</p>`},
        { data: { i:26}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">26题和27题相互联系。</p><br/>' +
        `<p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>26&ensp;&emsp;往返于机场与租车部之间有一部满载10人的公交车。现有36人在租车部等着去机场，有14人在机场等着去租车部。如果公交车从机场出发，途中再无他人乘车，公共车要在机场和租车部之间跑多少次才能把这50人运到他们的目的地？
        </b><br/><br/>
        A&ensp;&ensp;5<br/>
        B&ensp;&ensp;6<br/>
        C&ensp;&ensp;7<br/>
        D&ensp;&ensp;8</p>`},
        { data: { i:27}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">26题和27题相互联系。</p><br/>' +
        `<p style="font: 20pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>27&ensp;&emsp;公交车从机场往租车部开始第二轮的运送时，另外25人到达了机场，他们想乘车到租车部。汽车在每个方向再要跑多少次才能把这增加的25人送到地方？
        </b><br/><br/>
        A&ensp;&ensp;0<br/>
        B&ensp;&ensp;1<br/>
        C&ensp;&ensp;2<br/>
        D&ensp;&ensp;3</p>`},
        { data: { i:28}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">28、29和30题与下列两个“员工乘车上班计划”的饼图有关。</p><br/>' +
        "<image src = '第28、29、30题.png' width=556 height=400/><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>28&ensp;&emsp;从第一次调查到一年以后的情况来看，员工自驾车上班的比例减少到：
        </b><br/><br/>
        A&ensp;&ensp;最初的89%。<br/>
        B&ensp;&ensp;最初的93%。<br/>
        C&ensp;&ensp;与地铁和合用车的增长比例一致。<br/>
        D&ensp;&ensp;与步行上班下降的比例一致。</p>`},//有图片字体大小改为18pt
        { data: { i:29}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">28、29和30题与下列两个“员工乘车上班计划”的饼图有关。</p><br/>' +
        "<image src = '第28、29、30题.png' width=556 height=400/><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>29&ensp;&emsp;对合用车的增长幅度最好表述为：
        </b><br/><br/>
        A&ensp;&ensp;增长了33%。<br/>
        B&ensp;&ensp;增长了25%。<br/>
        C&ensp;&ensp;从自驾车到合用车有5%的转移。<br/>
        D&ensp;&ensp;比地铁增长的幅度比例大。</p>`},//有图片字体大小改为18pt
        { data: { i:30}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">28、29和30题与下列两个“员工乘车上班计划”的饼图有关。</p><br/>' +
        "<image src = '第28、29、30题.png' width=556 height=400/><br/><br/>" +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>30&ensp;&emsp;第一次调查得出数据一星期后，公司制定了一项激励措施，鼓励员工使用合用车，并且用地铁来替代自驾车。下列哪种情况与提供的数据最不符合？
        </b><br/><br/>
        A&ensp;&ensp;自驾车上班大量减少。<br/>
        B&ensp;&ensp;鼓励合用车和地铁的激励措施似乎开始起作用。<br/>
        C&ensp;&ensp;使用地铁的员工总数比例增加了。<br/>
        D&ensp;&ensp;以前步行的员工，现在几乎有一半乘地铁上班。</p>`},//有图片字体大小改为18pt
],
    randomize_order: false
}

var Item_31 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D','E'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:31}, s: `
        <p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>31&ensp;&emsp;假如不管什么时候下雪，街道和人行道都又湿又滑。鉴于这种假设，下列哪种情况为真？
        </b><br/><br/>
        A&ensp;&ensp;如果人行道又湿又滑，那么是在下雪。<br/>
        B&ensp;&ensp;如果不下雪，则街道和人行道不滑。<br/>
        C&ensp;&ensp;如果人行道湿，街道滑，则天在下雪。<br/>
        D&ensp;&ensp;如果人行道滑但街道干，则没有下雪。<br/>
        E&ensp;&ensp;天在下雪，人行道湿，并且街道滑。</p>`},
    ],
    randomize_order: false
}

var Item_32_33_34 = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: ` `,
        choices: ['A', 'B', 'C', 'D'],
        on_finish: function(data) { addRespFromButtonScale(data, 'CCTST') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i:32}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">32、33和34题基于下列要求解雇员工的情景：</p><br/>' +
        `<p style="font: 18pt 仿宋; text-align: left; width:900px; margin:0 auto;text-indent: 2em">
        昨天你就命令让你的助手寄出一份重要邮包，但是你发现直到今天助手还没有把该邮包寄出。起初，你在询问助手包裹一事时，他很恼怒，坚持说他按时寄出了。
        但是最终他意识到你不会相信他。然后他说他放错了地方并找借口说是由于在忙着做你交代给他的其他事情。
        两小时后，他到你面前说他在一堆其他东西中找到了邮包，现在已经寄出了。
        对此，你不知如何是好，便去征求上司的意见。你的上司说：“把他炒了。”你不同意，说：“我认为弄丢了邮包犯不着炒鱿鱼。再说，我们不能炒他，这样做会违反合同。”
        你的上司回答道：“不管怎样，把他炒了。你这样做的时候，必须告诉他是你坚持要炒他。”</p><br/><br/>` +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>32&ensp;&emsp;思考以下陈述：如果因为解雇员工而造成违反合同的麻烦，你的上司想让你说这是你的想法而不是她的想法。结合以上情景，这一陈述：
        </b><br/><br/>
        A&ensp;&ensp;肯定符合实情。<br/>
        B&ensp;&ensp;似真，但也可能不符合实情。<br/>
        C&ensp;&ensp;难以置信，但也可能是实情。<br/>
        D&ensp;&ensp;肯定不符合实情。</p>`},
        { data: { i:33}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">32、33和34题基于下列要求解雇员工的情景：</p><br/>' +
        `<p style="font: 18pt 仿宋; text-align: left; width:900px; margin:0 auto;text-indent: 2em">
        昨天你就命令让你的助手寄出一份重要邮包，但是你发现直到今天助手还没有把该邮包寄出。起初，你在询问助手包裹一事时，他很恼怒，坚持说他按时寄出了。
        但是最终他意识到你不会相信他。然后他说他放错了地方并找借口说是由于在忙着做你交代给他的其他事情。
        两小时后，他到你面前说他在一堆其他东西中找到了邮包，现在已经寄出了。
        对此，你不知如何是好，便去征求上司的意见。你的上司说：“把他炒了。”你不同意，说：“我认为弄丢了邮包犯不着炒鱿鱼。再说，我们不能炒他，这样做会违反合同。”
        你的上司回答道：“不管怎样，把他炒了。你这样做的时候，必须告诉他是你坚持要炒他。”</p><br/><br/>` +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>33&ensp;&emsp;一个和你不在一起工作的朋友告诉你：“别管合同，有充足的理由解雇你的助手。他撒谎。他邋遢并且丢掉了重要物品。当找到包裹又把它推迟寄出时，也不跟你打招呼。”朋友的推理是：
        </b><br/><br/>
        A&ensp;&ensp;差。因为朋友不知道你办公室的实际工作情况。<br/>
        B&ensp;&ensp;差。因为朋友没有给助手辩护的机会。<br/>
        C&ensp;&ensp;好。因为助手的差劲工作损坏了你的工作和名声。<br/>
        D&ensp;&ensp;好。因为助手就是使用了这些下策。</p>`},
        { data: { i:34}, s: '<p style = "font: 16pt FangSong; text-align: left; color = grey">32、33和34题基于下列要求解雇员工的情景：</p><br/>' +
        `<p style="font: 18pt 仿宋; text-align: left; width:900px; margin:0 auto;text-indent: 2em">
        昨天你就命令让你的助手寄出一份重要邮包，但是你发现直到今天助手还没有把该邮包寄出。起初，你在询问助手包裹一事时，他很恼怒，坚持说他按时寄出了。
        但是最终他意识到你不会相信他。然后他说他放错了地方并找借口说是由于在忙着做你交代给他的其他事情。
        两小时后，他到你面前说他在一堆其他东西中找到了邮包，现在已经寄出了。
        对此，你不知如何是好，便去征求上司的意见。你的上司说：“把他炒了。”你不同意，说：“我认为弄丢了邮包犯不着炒鱿鱼。再说，我们不能炒他，这样做会违反合同。”
        你的上司回答道：“不管怎样，把他炒了。你这样做的时候，必须告诉他是你坚持要炒他。”</p><br/><br/>` +
        `<p style="font: 18pt 微软雅黑; text-align: left; width:900px; margin:0 auto;text-indent:-2.5em">
        <b>34&ensp;&emsp;假如你12岁的女儿对你说：“如果你解雇了助手，你就会违反合同；但是如果你不解雇他，你将和你的上司发生麻烦！不论哪种情况，你最终都会陷入麻烦中。”你女儿的推理是：
        </b><br/><br/>
        A&ensp;&ensp;差。因为12岁的孩子还不能理解事情的真相<br/>
        B&ensp;&ensp;差。因为你不能肯定工会将怎样做。<br/>
        C&ensp;&ensp;好。因为当下似乎没有其他选择。<br/>
        D&ensp;&ensp;好。因为你一直有权选择辞职。</p>`},
        
    ],
    randomize_order: false
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
    type: 'image-button-response',
    stimulus: 'DownloadReminding.png',
    stimulus_height: '409',
    stimulus_width:'600',
    prompt: `
    <p style="text-align: left">在您点击“完成”按钮后，将会开始下载文件。<br/>
    请您选择“允许”，并将文件名修改为您的被试编号发送给主试。<br/>
    再次感谢您的耐心与配合！</p>`,
    choices: ['完成']
}

/* Combine Timelines */


var surveys = {
    timeline: [
        Item_1,
        Item_2_3_4,
        Item_5,
        Item_6_7_8_9,
        Item_10_11_12_13_14_15,
        Item_16_17,
        Item_18,
        Item_19_20,
        Item_21_22,
        Item_23_24_25_26_27_28_29_30,
        Item_31,
        Item_32_33_34,
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
        jsPsych.data.get().localSave('csv', `(重命名为您的编号)-CCTST.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '测验结束，感谢您的参与！'
    }
})