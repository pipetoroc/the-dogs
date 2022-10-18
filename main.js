const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=2';

// fetch(URL)
//   .then(response => response.json())
//   .then(data => {
//     const img = document.querySelector('img')
//     img.src = data[0].url;
//   })
async function reload () {
  const response = await fetch (API_URL);
  const data = await response.json();

  console.log(data)
  const img0 = document.getElementById('img0');
  const img1 = document.getElementById('img1');

  img0.src = data[0].url;
  img1.src = data[1].url;
}

reload();
const buttonReload = document.getElementById('reloadImg');
buttonReload.onclick = reload;
