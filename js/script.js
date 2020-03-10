let search = document.querySelector('.weather-main_search'),
    btn = document.querySelector('.weather-main_btn');

function runAnimation(event, style){
    search.addEventListener(event, () => {
        btn.style.animation = style;
    });
}    

runAnimation('mouseover', 'none');
runAnimation('mouseout', 'radial-pulse 1s infinite');
