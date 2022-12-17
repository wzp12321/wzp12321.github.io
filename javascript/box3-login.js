var islogin = document.querySelector("._3AspHqpBNnv2Z9vUyC6Fnx","._12b-ZtA2Hl4-wYcKqK83AR","._1SS6wc-FMtveQU1rUrkRW","._1CxJtBjdQtSJMiKtkt_Dvl", "._2eyZue_TPS-k5Q8e4IXi4H").innerText != '登录 / 注册' ? "登录" : "未登录";
if (islogin == "登录"){
    document.querySelector("._3AspHqpBNnv2Z9vUyC6Fnx","._12b-ZtA2Hl4-wYcKqK83AR","._1SS6wc-FMtveQU1rUrkRW","._1CxJtBjdQtSJMiKtkt_Dvl", "._2eyZue_TPS-k5Q8e4IXi4H").click();
    var userdata = {
        "name": document.querySelectorAll(".text")[0].textContent,//名称
        "faith": Number(document.querySelectorAll(".text")[1].textContent),//信誉值
        "concern": Number(document.querySelectorAll(".text")[2].textContent.slice(3)),//关注人数
        "fans": Number(document.querySelectorAll(".text")[3].textContent.slice(3)),//粉丝人数
    };
};
