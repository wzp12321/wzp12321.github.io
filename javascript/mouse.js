function init_mouse(){
    document.querySelector('head').innerHTML += `<style>.mouse{
        width: 50px;
        height: 50px;
        border-radius: 50%;;
        position: fixed;
        left: -200px;
        z-index: 1000;
        pointer-events: none;
    }</style>`;
};

function clear_mouse(){
    document.querySelector('head').innerHTML += '<style>*{cursor: none;}</style>';
};

function get_mouse_img(class){
    return document.querySelector(class);
};

function set_mouse(path){
    document.querySelector('body').innerHTML += '<img class="mouse" src=path alt="">';
};

function run(){
    clear_mouse();
    var mouse = get_mouse_img('.mouse');
    window.addEventListener('mousemove',function(event){
        mouse.style.left = event.clientX - mouse.offsetWidth/2 + 'px' ;
        mouse.style.top = event.clientY -mouse.offsetHeight/2 + 'px';
    });
};
