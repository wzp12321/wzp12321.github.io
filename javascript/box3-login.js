var wall = "1";
if(new Date().getHours()>=12&&new Date().getHours()<18){
　　wall = "2";
}else if(new Date().getHours()>=18&&new Date().getHours()<24){
　　wall = "3";
}else if(new Date().getHours()>=0&&new Date().getHours()<5){
　　wall = "3";
};
document.querySelector("head").innerHTML += `<style>body{
    background: url(/img/wallpaper${wall}.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;
}</style>`;

(function () {
    const five_day=1000*60*60*24*5;
    const LOGIN_TYPES=["box","codemao"];
    var LOGINTYPE=LOGIN_TYPES[0];
    const LOGIN_TYPE_LIST={
        "codemao":{
            setFetchBody(a,p){
                return {
                    "identity":a,
                    "password":p,
                    "pid": "ANNRvHZT"
                }
            },
            account_id:"codemao-zh",
            ps_id:"codemao-ps",
            account_error_id:"codemao-zh-error",
            pas_error_id:"codemao-pas-error",
            url:"https://api.codemao.cn/tiger/v3/web/accounts/login",
        },
        "box":{
            setFetchBody(a,p){
                return {
                    "account":a,
                    "password":p,
                }
            },
            account_id:"zh",
            ps_id:"ps",
            account_error_id:"zh-error",
            pas_error_id:"pas-error",
            url:"https://backend.box3.fun/auth/login"
        }
    }
    function onload(){
        if(localStorage.boxid){
            let data=JSON.parse(localStorage.boxid);
            if(!data.time)data.time=new Date().getTime();
            if(new Date().getTime()-data.time>five_day){
                localStorage.removeItem("boxid");
                return;
            }
            let lo=new login();
            lo.setUser((JSON.parse(localStorage.boxid)).account,(JSON.parse(localStorage.boxid)).password);
        }
    }
    class login {
        constructor(account = "", password = "") {
            this.account = account;
            this.password = password;
        }
        fetch(account, ps) {
            this.account = account;
            this.password = ps;
            var loginTypesObj=LOGIN_TYPE_LIST[LOGINTYPE];
            return fetch(loginTypesObj.url, {
                "headers": {
                    "content-type": "application/json",
                },
                "body": JSON.stringify(loginTypesObj.setFetchBody(account,ps)),
                "method": "POST",
            });
        }
        getAccount() {
            return document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].account_id).value;
        }
        getPassword() {
            return document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].ps_id).value;
        }
        accountError(n = "请输入账号") {
            document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].account_error_id).innerText = n;
        }
        passwordError(n = "请输入密码") {
            document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].pas_error_id).innerText = n;
        }
        setAccountAndPS(t, n) {
            document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].account_id).value = t;
            document.getElementById(LOGIN_TYPE_LIST[LOGINTYPE].ps_id).value = n;
        }
        setUserData(){
            return (userdata) => {
                if (userdata.msg != 'success')return;
                userdata=userdata.data;
                var userImg = "https://static.box3.codemao.cn/block/"+userdata.avatarHash;
                var userName = userdata.displayname;
                loginButton.style.display = "none";
                loginbox.style.display = "block";
                document.getElementById("userImg").src = userImg;
                document.getElementById("userName").innerText = userName;
            }
        }
        setUser() {
            let datau=JSON.parse(localStorage.boxid);
            datau.time=new Date().getTime();
            localStorage.boxid=JSON.stringify(datau);
            if(datau.pid&&datau.pid=="codemao")LOGINTYPE="codemao";
            else LOGINTYPE="box";
            this.fetch(datau.account,datau.password).then((data) => {
                return data.json();
            }).then(async(userdata) => {
                if(LOGINTYPE=="box"){
                    if (userdata.msg != 'success')return;
                }else{
                    if(userdata.error_message)return;
                    userdata=await fetch("https://backend.box3.fun/auth/login/codemao", {
                        "headers": {
                          "accept": "application/json, text/plain, */*",
                          "authorization": "",
                          "content-type": "application/json",
                        },
                        "body": JSON.stringify({auth:userdata.auth.token,recommendBy: 0}),
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    });
                    userdata=await userdata.json();
                    if(userdata.msg!="success"){
                        alert("未知错误");
                        return;
                    }
                    localStorage.setItem("boxid", JSON.stringify({ id: userdata.data.id ,account:arguments[0],password:arguments[1],pid:"codemao",time:new Date().getTime()}));
                }
                userdata=userdata.data;
                var userImg = "https://static.box3.codemao.cn/block/"+userdata.avatarHash;
                var userName = userdata.displayname;
                loginButton.style.display = "none";
                loginbox.style.display = "block";
                document.getElementById("userImg").src = userImg;
                document.getElementById("userName").innerText = userName;
                LOGINTYPE="box";
            });
        }
        relog(){
            document.getElementById("userImg").src = "";
            document.getElementById("userName").innerText = "";
            loginButton.style.display = "block";
            loginbox.style.display = "none";
            localStorage.removeItem("boxid");
        }
    }
    function onLogin() {
        var l = new login();
        var account = l.getAccount();
        var password = l.getPassword();
        var continued = true;
        if (!account || account.length == 0) {
            l.accountError();
            continued = false
        } if (!password || password.length == 0) {
            l.passwordError();
            continued = false;
        }
        if (continued) {
            l.passwordError("");
            l.accountError("");
            return l.fetch(account, password).then((d) => {
                return d.json();
            }).then((data) => {
                if(LOGINTYPE=="box"){
                    if (data.msg != 'success') {
                        l.passwordError("账号或密码错误");
                        l.accountError("");
                        return;
                    }
                }else{
                    if(data.error_message){
                        l.passwordError("账号或密码错误");
                        l.accountError("");
                        return;
                    }
                }
                if(LOGINTYPE=='box'){
                    localStorage.setItem("boxid", JSON.stringify({ id: data.data.id ,account:account,password:password}));
                }else{
                    localStorage.setItem("boxid", JSON.stringify({ account:account,password:password,pid:"codemao"}));
                }
                document.getElementById('login-dialog').close();
                l.setUser((JSON.parse(localStorage.boxid)).account,(JSON.parse(localStorage.boxid)).password);
            }).catch((error) => {
                alert("未知错误" + error);
            })
        }
    }
    const loginButton = document.getElementById("loginButton");
    const loginb = document.getElementById("login-");
    loginb.canClick = true;
    loginButton.onclick = () => {
        document.querySelector("dialog#login-dialog").showModal();
        var lo = new login();
        lo.accountError("");
        lo.passwordError("");
        lo.setAccountAndPS("", "")
    }
    loginb.onclick = function () {
        if (this.canClick == true) {
            var result = onLogin();
            if (!result) return;
            this.canClick = false;
            this.innerHTML = "登录...";
            result.then(() => {
                this.innerHTML = "登录";
            });
            this.canClick = true;
        }
    }
    onload();
    document.getElementById("relog").addEventListener("click",()=>{
        window.confirm("请问是否退出登录？",(b)=>{
            if(b==false)return;
            let lo=new login();
            lo.relog();
        })
    });
    const box_login=document.getElementById("box-login");
    const codemao_login=document.getElementById("codemao-login");
    const box_login_select=document.getElementById("box-login-select");
    const codemao_login_select=document.getElementById("codemao-login-select");
    box_login_select.addEventListener("click",()=>{
        box_login.style.display="block";
        box_login_select.className="login-select login-selecting";
        codemao_login.style.display="none";
        codemao_login_select.className="login-select login-unselecting";
        LOGINTYPE=LOGIN_TYPES[0];
    });
    codemao_login_select.addEventListener("click",()=>{
        box_login.style.display="none";
        codemao_login_select.className="login-select login-selecting";
        codemao_login.style.display="block";
        box_login_select.className="login-select login-unselecting";
        LOGINTYPE=LOGIN_TYPES[1];
    })
}())

// var islogin = document.querySelector("._3AspHqpBNnv2Z9vUyC6Fnx","._12b-ZtA2Hl4-wYcKqK83AR","._1SS6wc-FMtveQU1rUrkRW","._1CxJtBjdQtSJMiKtkt_Dvl", "._2eyZue_TPS-k5Q8e4IXi4H").className.includes("color-font-black");
// if (islogin){
//     document.querySelector(".popupContent").click();
//     var userdata = {
//         name: document.querySelectorAll(".text")[0].textContent,/*名称*/
//         faith: Number(document.querySelectorAll(".text")[1].textContent),/*信誉值*/
//         concern: Number(document.querySelectorAll(".text")[2].textContent.slice(3)),/*关注人数*/
//         fans: Number(document.querySelectorAll(".text")[3].textContent.slice(3)),/*粉丝人数*/
//         avatar_url: document.querySelectorAll(".web-img")[0].src,/*头像链接*/
//         avatar_hash: document.querySelectorAll(".web-img")[0].src.substr(35, 46),/*头像hash*/
//     };
//     console.log(userdata);
// } else {
//     document.querySelector("body").innerHTML += `<form action="" class="login">
//         <p>登录岛三账号</p>
//         <input id="name" type="text" placeholder="手机号/邮箱/代码岛ID">
//         <input id="password" type="password" placeholder="密码">
//         <input id="login" type="submit" class="btn" value="登  录">
//     </form>`;
// };
