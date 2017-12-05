let seq = [];
const hov = document.getElementsByClassName('game')[0];
console.log(hov);

hov.addEventListener('mouseover', (e) => {
  console.log(e.target.id);
  let colorSelected = document.getElementById(e.target.id);
  try {
    colorSelected.classList.add('light');
  } catch(e){}
});
hov.addEventListener('mouseout', (e) => {
  console.log(e.target.id);
  let colorSelected = document.getElementById(e.target.id);
  try {
    colorSelected.classList.remove('light');
  } catch(e){}
});

