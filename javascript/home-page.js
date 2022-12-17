VanillaTilt.init(document.querySelector(".your-element"), {
    max: 25,
    speed: 400,
    glare:true,
    "max-glare":1,
});
var mini = true;
function toggleSidebar() {
    if (mini) {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        mini = false;
    } else {
        document.getElementById("mySidebar").style.width = "85px";
        document.getElementById("main").style.marginLeft = "85px";
        mini = true;
    };
};
