let main = document.querySelector('.weather-main'),
    search = document.querySelector('.weather-main_search'),
    btn = document.querySelector('.weather-main_btn'),
    info = document.querySelector('.weather-main_info');

function runAnimation(event, style){
    search.addEventListener(event, () => {
        btn.style.animation = style;
    });
}    

runAnimation('mouseover', 'none');
runAnimation('mouseout', 'radial-pulse 1s infinite');

btn.addEventListener('click', () =>{
    main.style.transform = 'translate(-2500%, -50%)';
    info.style.transform = 'translateY(0)';
});
