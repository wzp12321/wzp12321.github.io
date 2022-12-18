var test = $("#box3").contents().find(".text"); 
alert(test.html());
var islogin = document.querySelector("._3AspHqpBNnv2Z9vUyC6Fnx","._12b-ZtA2Hl4-wYcKqK83AR","._1SS6wc-FMtveQU1rUrkRW","._1CxJtBjdQtSJMiKtkt_Dvl", "._2eyZue_TPS-k5Q8e4IXi4H").className.includes("color-font-black");
if (islogin){
    document.querySelector(".popupContent").click();
    var userdata = {
        name: document.querySelectorAll(".text")[0].textContent,/*名称*/
        faith: Number(document.querySelectorAll(".text")[1].textContent),/*信誉值*/
        concern: Number(document.querySelectorAll(".text")[2].textContent.slice(3)),/*关注人数*/
        fans: Number(document.querySelectorAll(".text")[3].textContent.slice(3)),/*粉丝人数*/
        avatar_url: document.querySelectorAll(".web-img")[0].src,/*头像链接*/
        avatar_hash: document.querySelectorAll(".web-img")[0].src.substr(35, 46),/*头像hash*/
    };
    console.log(userdata);
} else {
    document.querySelector("body").innerHTML += `<form action="" class="login">
        <p>登录岛三账号</p>
        <input id="name" type="text" placeholder="手机号/邮箱/代码岛ID">
        <input id="password" type="password" placeholder="密码">
        <input id="login" type="submit" class="btn" value="登  录">
    </form>`;
};
