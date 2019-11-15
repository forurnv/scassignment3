
function createimgdiv() {
  let imgdiv = document.createElement('div')
  // imgdiv.id = 'unsplashglobe'
  // using proto objects to add id and style values
  imgdiv.style = `
  height: 40vh;
  max-width: 100vw;
  background-image: url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80");
  background-repeat: no-repeat;
  background-position: center;
  `
  document.body.appendChild(imgdiv)
}
createimgdiv()