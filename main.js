const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_HvigcgGopKeKUuoxlJNXHjPTQdzWdT6TfjSVjZVzb1qCgo941joEH8QwXZs1Din6";
const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?api_key=live_HvigcgGopKeKUuoxlJNXHjPTQdzWdT6TfjSVjZVzb1qCgo941joEH8QwXZs1Din6";
const spanError = document.getElementById("error");

// fetch(URL)
//   .then(response => response.json())
//   .then(data => {
//     const img = document.querySelector('img')
//     img.src = data[0].url;
//   })

async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();

  console.log("Random");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error" + response.status;
  } else {
    const img0 = document.getElementById("img0");
    const img1 = document.getElementById("img1");

    img0.src = data[0].url;
    img1.src = data[1].url;
  }
}

async function loadFavoritesDogs() {
  const response = await fetch(API_URL_FAVORITES);
  const data = await response.json();

  console.log("Favorites");
  console.log(data);
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + data.message;
  } else {
    data.forEach(element => { 
      const section = document.getElementById('favoritesDogs');
      const article = document.createElement(article);
      const img = document.createElement(img);
      const button = document.createElement(button);
      const btnText = document.createTextNode('Delete dog');

    });

    button.appendChild
  //   <section id="favoritesDogs">
  //   <h2 class="section-title">favorite dogs</h2>
  //   <article>
  //     <img src="" alt="favorite dog" id="img2"/>
  //     <button class="main-button" id="delete-button">Delete dog from favorites</button>
  //   </article>
  // </section>

  }
}

async function saveFavouriteDog() {
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: "dje"
    }),
  });
  const data = await response.json();

  console.log("save");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerText = "Hubo un error: " + data.message + response.status;
  }
}

loadRandomDogs();
loadFavoritesDogs();

const buttonReload = document.getElementById("button-reload");
buttonReload.onclick = loadRandomDogs;
