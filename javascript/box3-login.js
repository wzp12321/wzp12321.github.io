var islogin = document.querySelector("._3AspHqpBNnv2Z9vUyC6Fnx","._12b-ZtA2Hl4-wYcKqK83AR","._1SS6wc-FMtveQU1rUrkRW","._1CxJtBjdQtSJMiKtkt_Dvl", "._2eyZue_TPS-k5Q8e4IXi4H").innerText != '登录 / 注册' ? "登录" : "未登录";
if (islogin == "登录"){
    var touxiang = document.querySelector("body > div.desktop.website.app > header > div > div._2QvUYn1UWh6Jtz4XUSQ-3g > div.EtLtetKegDmJNWnqZpFw7 > div > div > picture > img").src;
    var touxiang_hash = touxiang.substr("https://static.box3.codemao.cn/img/".length+1, "https://static.box3.codemao.cn/img/QmSHCR3aLropjVDjWrbK8Ydj9i5M8HNBkV3nevcYtFYTv8".length);
    alert(touxiang_hash);
};
