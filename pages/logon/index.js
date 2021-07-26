var userName = document.getElementById("userName");
var tips = document.getElementsByClassName("tips")[0];
var errorTips = document.getElementsByClassName("errorTips")[0];
var submit = document.getElementById("submit");

var logonFrom = document.getElementsByClassName("logon-from")[0];
var appkey = 'yolwas05_1615211743051';


userName.onfocus = function () {
    tips.style.display = "block";
    userName.className = "";
    errorTips.innerText = "";
}

userName.onblur = function () {
    tips.style.display = "none";
    
    var count = strCharCode(userName.value);
    // console.log(count == null);
    if (count > 14) {
        // console.log(count);
        userName.className = "active";
        errorTips.innerText = "用户名超出14个英文或7个汉字";
    } else if (count == null) {
        userName.className = "active";
        errorTips.innerText = "输入字符不合法，请输入数字字母以及汉字";
    }
}

function strCharCode (optition) {
    var nameCount = 0;
    for(var i = 0; i < optition.length; i++) {
        // console.log(i);
        var strCode = optition.charCodeAt(i);
        // console.log(strCode);
        if ((strCode >= 65 && strCode <= 90) || (strCode <= 122 && strCode >= 97) || (strCode >= 48 && strCode <= 57)) {
            // console.log(strCode);
            nameCount++;
        } else if (strCode >= 19968) {
            // console.log(strCOde);
            nameCount += 2;
        } else {
            // console.log(strCode);
            return null;
        }
    }
    return nameCount;
}

submit.onclick = function (e) {
    e.preventDefault();
    var elems = logonFrom.elements;
    // console.log(elems);
    var uName = elems.userName.value;
    var account = elems.account.value;
    var passwd = elems.passwd.value;
    var repasswd = elems.repasswd.value;
    // console.log(uName, account, passwd, repasswd);

    ajax({
        url: 'https://api.duyiedu.com/api/student/stuRegister', // 请求路径
        type: 'POST', // 请求方式
        params: {
            appkey: appkey, 
            username: uName,
            account: account,
            password: passwd,
            rePassword: repasswd,
        },
        success(value) {
            console.log(value);
            var obj = JSON.parse(value);
            if (obj.status == "fail") {
                alert("错误信息：" + obj.msg);
            } else {
                alert(obj.msg);
                logonFrom.reset();
                location.href = '../login/index.html';
            }
            // JSON 文本格式 网络请求 发送文本 本地操作 数组 字符串
            // {"msg":"帐号必须为4-16位的字母数字下划线任意组合组成","status":"fail"}'
            // JSON.parse() => JSON 文本 => 对象（ 对象 （ key: value ）和数组 ）
            // JSON.stringify => 对象 => JSON 字符串
        }
    })

}



