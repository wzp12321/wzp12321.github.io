VanillaTilt.init(document.querySelector(".your-element"), {
    max: 25,
    speed: 400,
    glare:true,
    "max-glare":1,
});
var mini = false;
function toggleSidebar() {
     if (mini) {
    	console.log("opening sidebar");
    	document.getElementById("mySidebar").style.width = "250px";
    	document.getElementById("main").style.marginLeft = "250px";
    	this.mini = false;
      } else {
    	console.log("closing sidebar");
    	document.getElementById("mySidebar").style.width = "85px";
    	document.getElementById("main").style.marginLeft = "85px";
    	this.mini = true;
      }
}
