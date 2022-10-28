const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_URL_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}`;

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
    const buttonRandom1 = document.getElementById("button-save1");
    const buttonRandom2 = document.getElementById("button-save2");

    img0.src = data[0].url;
    img1.src = data[1].url;

    buttonRandom1.onclick = () => saveFavouriteDog(data[0].id);
    buttonRandom2.onclick = () => saveFavouriteDog(data[1].id);
  }
}

async function loadFavoritesDogs() {
  const response = await fetch(API_URL_FAVORITES, {
    method: "GET",
    headers: {
       'X-API-KEY': 'live_HvigcgGopKeKUuoxlJNXHjPTQdzWdT6TfjSVjZVzb1qCgo941joEH8QwXZs1Din6'
    },
  });
  const data = await response.json();

  console.log("Favorites");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + data.status + data.message;
  } else {
    const section = document.getElementById("favoritesDogs");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Favorites Dogs");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((element) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const button = document.createElement("button");
      const btnText = document.createTextNode("Delete dog from favorites");

      img.src = element.image.url;
      button.appendChild(btnText);
      button.onclick = () => deleteFavouriteDog(element.id);

      article.appendChild(img);
      article.appendChild(button);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteDog(id) {
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY":
        "live_HvigcgGopKeKUuoxlJNXHjPTQdzWdT6TfjSVjZVzb1qCgo941joEH8QwXZs1Din6",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();

  console.log("save");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerHTML =
      "There is an error: " + data.message + response.status;
  } else {
    console.log("Dog save satisfactory");
    loadFavoritesDogs();
  }
}

async function deleteFavouriteDog(id) {
  const response = await fetch(API_URL_DELETE(id), {
    method: "DELETE",
    headers: {
      'X-API-KEY': 'live_HvigcgGopKeKUuoxlJNXHjPTQdzWdT6TfjSVjZVzb1qCgo941joEH8QwXZs1Din6',
    }
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML =
      "There is an error: " + response.status + data.message;
  } else {
    console.log("Dog deleted from favorites");
    loadFavoritesDogs();
  }
}

loadRandomDogs();
loadFavoritesDogs();

const buttonReload = document.getElementById("button-reload");
buttonReload.onclick = loadRandomDogs;
