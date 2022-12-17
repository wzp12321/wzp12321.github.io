VanillaTilt.init(document.querySelector(".your-element"), {
    max: 25,
    speed: 400,
    glare:true,
    "max-glare":1,
});
var next = true;
function toggleSidebar() {
    if (next) {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        next = false;
    } else {
        document.getElementById("mySidebar").style.width = "85px";
        document.getElementById("main").style.marginLeft = "85px";
        next = true;
    };
};
