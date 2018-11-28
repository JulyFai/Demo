/**
 * Created by yang on 2018/11/4.
 */
/*
 * 该函数是返回的是指定格式的日期,是字符串类型
 * 参数:date ----日期
 * 返回值: 字符串类型的日期
 * */
function getDatetoString(date) {
    var strDate;//存储日期的字符串
    //获取年
    var year=date.getFullYear();
    //获取月
    var month=date.getMonth()+1;
    //获取日
    var day=date.getDate();
    //获取小时
    var hour=date.getHours();
    //获取分钟
    var minute=date.getMinutes();
    //获取秒
    var second=date.getSeconds();
    hour=hour<10?"0"+hour:hour;
    minute=minute<10?"0"+minute:minute;
    second=second<10?"0"+second:second;
    //拼接
    strDate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;//隐藏问题,关于变量声明的位置
    return strDate;
}

/**
 * 根据id属性的值，返回对应的标签元素
 * @param id id属性的值，string类型的
 * @returns {Element} 元素对象
 */
function my$(id) {
    return document.getElementById(id);
}

//设置任意标签中间的任意文本内容
function setInnerText(element,text) {
    //判断浏览器是否支持这个属性
    if(typeof element.textContent=="undefined"){//不支持
        element.innerText=text;
    }else {//支持这个属性
        element.textContent=text;
    }
}
//获取任意标签中间的文本内容
function getInnerText(element) {
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else {
        return element.textContent;
    }
}

//为任意元素绑定任意的事件，任意的元素，事件的类型，事件处理函数
function addEventlistener(element,type,fn) {
    //判断浏览器是否支持这个方法
    if (element.addEventlistener){
        element.addEventlistener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else {
        element["on"+type]=fn;
    }
}

//为任意一个元素，解绑对应的事件
function removeEventListener(element,type,fnName) {
    if(element.removeEventlistener){
        element.removeEventListener(type,fnName,false);
    }else if (element.detachEvent){
        element.detachEvent("on"+type,fnName);
    }else {
        element["on"+type]=null;
    }
}

//获取浏览器向上卷曲的距离的值，向左卷曲出去的距离
function getScroll() {
    return{
        left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}

//设置任意的一个元素,移动到指定的目标位置
function animate(element,attr,target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        //var current = element.offsetLeft;
        var current = parseInt(getStyle(element,attr));
        //每次移动的距离
        var step = (target-current)/10;
        step = step>0 ? Math.ceil(step) : Math.floor(step);
        //当前移动到位置
        current += step;
        element.style[attr] = current + "px";
        if(current==target){
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码
        console.log("目标位置:"+target+"当前位置："+current+"每次移动步数："+step);
    }, 20);
}

//获取任意一个元素的任意一个样式属性的值---字符串类型
function getStyle(element,attr) {
    //判断浏览区是否支持这个方法
    return window.getComputedStyle? window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}