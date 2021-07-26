var submit = document.getElementById("submit");
var loginFrom = document.getElementsByClassName("login-from")[0];
var appkey = "yolwas05_1615211743051";

submit.onclick = function (e) {
    e.preventDefault();
    var username = loginFrom.elements.username.value;
    var passwd = loginFrom.elements.passwd.value;
    // console.log(username, passwd);
    if (username && passwd) {
        ajax({
            url: 'https://api.duyiedu.com/api/student/stuLogin',
            type: 'POST',
            params: {
                appkey: appkey,
                account: username,
                password: passwd,
            },
            success(value) {
                // console.log(value);
                var obj = JSON.parse(value);
                if (obj.status == "fail") {
                    alert("错误信息" + obj.msg);
                } else {
                    alert(obj.msg);
                    // BOM
                    location.href = '../main/index.html?name=' + username;
                }
            }
        })
    } else if (!username) {
        alert("请填写用户名");
    } else if (!passwd) {
        alert("请填写密码");
    }
}


