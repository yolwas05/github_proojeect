
/* 实现选项卡 */
var list = document.getElementsByClassName("left")[0];
var contentBox = document.getElementsByClassName("right")[0];
var content = contentBox.children;
var headNameElem = document.getElementsByClassName("head")[0].getElementsByTagName("p")[0];
var quit = document.getElementsByClassName("quit")[0];

var uname = "";

function getName() {
    return location.search.slice(1).split("=")[1];
}

uname = getName();
headNameElem.innerText = uname;
// console.log(uname);
// console.log(headNameElem);
// 页面导航，页面守卫
if (!uname) {
    location.href = "../login/index.html";
}

quit.onclick = function () {
    location.href = "../login/index.html"
}

list.onclick = function (e) {
    if (e.target == this) {
        return;
    }
    // if (e.target.getAttribute("glob") == "userList") {
    //     location.reload(true);
    // }

    var rmActive = this.getElementsByClassName("active")[0];
    var len = content.length;
    // console.log(e.target.getAttribute("glob"));

    rmActive.classList.remove("active");
    e.target.classList.add("active");
    for (var i = 0; i < len; i++) {
        if (content[i].id == e.target.getAttribute("glob")) {
            content[i].classList.add("active");
        } else {
            content[i].classList.remove("active");
        }
    }
}




/* 添加学生 */
var addForm = document.getElementById("addForm");
var addBtn = document.getElementById("add-btn");
// console.log(addForm);

addBtn.onclick = function (e) {
    e.preventDefault();
    // console.log(addFrom.elements);
    var elems = addForm.elements;
    var data = {};
    data.appkey = appkey;
    data.sNo = elems.sNo.value;
    data.name = elems.name.value;
    data.sex = elems.sex.value;
    data.birth = elems.birth.value;
    data.phone = elems.phone.value;
    data.address = elems.address.value;
    data.email = elems.email.value;

    ajax({
        url: "http://api.duyiedu.com/api/student/addStudent",
        type: "GET",
        params: data,
        success(value) {
            var obj = JSON.parse(value);
            if (obj.status == "fail") {
                alert(obj.msg);
            } else {
                alert(obj.msg);
                location.reload(true);
                addForm.reset();
            }
        }
    })
}




/* 学生列表 */
var stuList = [];
var listBody = content[0];
var appkey = "DuYiyongzhi_1564986206465";
var tbody = document.getElementById("tbody");
var mask = listBody.getElementsByClassName("mask")[0];
var editForm = mask.getElementsByClassName("edit-form")[0];
var editBtn = document.getElementById("edit-btn");

var pagingList = document.getElementById("paging-list");
var lastBtn = document.getElementById("last-btn");
var preBtn = document.getElementById("pre-btn");
var count = 1;
var len;
// var delBtn = document
// console.log(tbody);
// console.log(editBtn);

ajax({
    url: "http://api.duyiedu.com/api/student/findAll",
    type: "GET",
    params: {
        appkey: appkey,
    },
    success(value) {
        // console.log(value);
        var obj = JSON.parse(value);
        // console.log(obj);
        stuList = obj.data;
        len = Math.ceil(stuList.length / 12);
        pagingListRender(stuList, len);
        listRander(stuList, stuList.length);
    }
})

function pagingListRender(list, len) {
    for (var i = 2; i <= len; i++) {
        var li = document.createElement("li");
        li.innerText = i;
        pagingList.appendChild(li);
    }
}

function listRander(list) {
    // console.log(tbody);
    tbody.innerHTML = "";
    var num = 0;
    if (count * 12 >= list.length) {
        num = list.length;
    } else {
        num = count * 12;
    }
    for (var i = (count - 1) * 12; i < num; i++) {
        var tr = document.createElement("tr");
        // console.log(list[i]);
        var trList = list[i];
        tr.innerHTML = "<td>" + trList.sNo + "</td> \
        <td>" + trList.name + "</td> \
        <td>" + getSex(trList.sex) + "</td> \
        <td>" + getBirth(trList.birth) + "</td> \
        <td>" + trList.phone + "</td> \
        <td>" + trList.email + "</td> \
        <td>" + trList.address + "</td> \
        <td> \
            <span class='edit-btn'>编辑</span> \
            <span class='del-btn'>删除</span> \
        </td>"
        tbody.appendChild(tr);
    }
    pagingListClick();
}

function btnActive(count, pagingLi) {
    console.log(count, pagingLi.length);
    if (count == 1) {
        lastBtn.classList.add("active");
    } else {
        lastBtn.classList.remove("active");
        console.log("ssss" + count);
    }
    if (count == pagingLi.length) {
        preBtn.classList.add("active");
    } else {
        preBtn.classList.remove("active");
    }
}

function pagingListClick() {
    setTimeout(function () {
        var pagingLi = pagingList.getElementsByTagName("li");
        for (var i = 0; i < pagingLi.length; i++) {
            (function (i) {
                pagingLi[i].onclick = function () {
                    for (var j = 0; j < pagingLi.length; j++) {
                        pagingLi[j].classList.remove("active");
                    }
                    this.classList.add("active");
                    count = this.innerText;
                    console.log(count);
                    listRander(stuList, stuList.length);
                }
            }(i))
        }
        var liActive = pagingList.getElementsByClassName("active")[0];
        // console.log(liActive);
        liActive.classList.remove("active");
        pagingLi[count - 1].classList.add("active");
        btnActive(count, pagingLi);
    }, 0)
}

lastBtn.onclick = function () {
    if (count == 1) {
        return;
    }
    count--;
    listRander(stuList);
}

preBtn.onclick = function () {
    if (count == len) {
        return;
    }
    count++;
    listRander(stuList);
}

function getSex(target) {
    return target == 0 ? "男" : "女";
}

function getBirth(target) {
    var data = new Date().getFullYear();
    return data - target;
}

// console.log(editForm.elements[0]);

tbody.onclick = function (e) {
    // console.log(e.target);
    var elemens = editForm.elements;
    // console.log(target);
    // var elem = e.target;
    // console.log(elem.parentNode);
    var elem = e.target.parentNode.parentNode.children;
    if (e.target.classList.contains("edit-btn")) {
        // console.log(elem);
        // console.log(elem[0]);
        elemens.sNo.value = elem[0].innerText;
        elemens.name.value = elem[1].innerText;
        elemens.sex.value = getRequSex(elem[2].innerText);
        elemens.birth.value = getRequBirth(elem[3].innerText);
        elemens.phone.value = elem[4].innerText;
        elemens.email.value = elem[5].innerText;
        elemens.address.value = elem[6].innerText;

        mask.style.display = "block";
    } else if (e.target.classList.contains("del-btn")) {
        // var temp = ;
        ajax({
            url: "http://api.duyiedu.com/api/student/delBySno",
            type: "GET",
            params: {
                appkey: appkey,
                sNo: elem[0].innerText,
            },
            success(value) {
                var obj = JSON.parse(value);
                alert(obj.msg);
                // console.log(obj.msg);
                location.reload(true);
            }
        })
    }
}

mask.onclick = function () {
    this.style.display = "none";
}

editForm.onclick = function (e) {
    e.stopPropagation();
}

editBtn.onclick = function (e) {
    e.preventDefault();
    var elemens = editForm.elements;
    console.log(getRequSex(elemens.sex.value));
    var data = {};
    data.appkey = appkey;
    data.sNo = elemens.sNo.value;
    data.name = elemens.name.value;
    data.sex = elemens.sex.value;
    data.birth = elemens.birth.value;
    data.phone = elemens.phone.value;
    data.email = elemens.email.value;
    data.address = elemens.address.value;
    console.log(data);

    ajax({
        url: "http://api.duyiedu.com/api/student/updateStudent",
        type: "GET",
        params: data,
        success(value) {
            var obj = JSON.parse(value);
            alert(obj.msg);
            location.reload(true);
        }
    })
}

function getRequSex(target) {
    return target == "男" ? 0 : 1;
}

function getRequBirth(target) {
    var data = new Date().getFullYear();
    return data - target;
}




/* 查询学生 */


