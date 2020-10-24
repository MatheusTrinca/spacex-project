// Toggle NavBar
const menuMobile = document.getElementById('mobile-icon');

function toggleMenuMobile(){
  const container = document.querySelector('.nav-mobile-container')
  let display = container.style.display;
  if(display === "none"){
    container.style.display = "block";
  }else{
    container.style.display = "none";
  }
}

menuMobile.addEventListener('click', e => {
  toggleMenuMobile();
  e.preventDefault();
})

