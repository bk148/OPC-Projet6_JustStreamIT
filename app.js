
// base url du site
const base_url = "http://localhost:8000/api/v1/titles/" 
const base_url_banner = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&"
const page_size = "&page_size=17"


// requests for movies data
const requests = {
  fetchBestmovies: base_url + "?sort_by=-imdb_score" + page_size,
  fetchHorreur_Byvotes: base_url + "?genre=horror&?sort_by=-imdb_score" + page_size,
  fetchAction_Byvotes: base_url + "?genre=action&?sort_by=-imdb_score"+ page_size,
  fetchAdventure_Byvotes: base_url + "?genre=romance&?sort_by=-imdb_score" + page_size,
};

function Modal(){
  let modal = document.getElementById('film-modal');
  let infoBtn = document.getElementsByClassName('info row__posterLarge');
  
  console.log('images btn')
  console.log(infoBtn);

  for (let i = 0; i < infoBtn.length; i++) {
    if (!infoBtn[i]) {
        break;
    }
    infoBtn[i].addEventListener('click', async function() {
      fetch(base_url + this.id).then(async function (response) {

          let res = await response.json()
          console.log('response');
          console.log(res);

          const content = `
                <div class="modal__content">
                    <span class="modal__close">&times;</span>
                    <div class="modal__data">
                        <img class="modal__data--img" src="${res.image_url}" alt="con.title">
                        <div class="modal__data--details">
                            <p>Titre : ${res.title}</p>
                            <p>Genre(s) : ${res.genres}</p>
                            <p>Date de publication : ${res.date_published}</p>
                            <p>Score : ${res.rated}</p>
                            <p>Score Imbd : ${res.imdb_score}</p>
                            <p>Directeur(s) : ${res.directors}</p>
                            <p>Acteurs : ${res.actors}</p>
                            <p>Durée : ${res.duration} minutes</p>
                            <p>Pays d orgine : ${res.countries}</p>
                            <p>Box office: ${(res.worldwide_gross_income) ? res.worldwide_gross_income : "Pas disponible"}</p>
                            <p>Description : ${res.description}</p>
                        <div>    
                    </div>
                </div>`
          modal.innerHTML = content
          modal.style.display = "block";
          document.getElementsByClassName("modal__close")[0].addEventListener('click', function () {
              modal.style.display = "none";
          });

          console.log('inserted modal');
          console.log(modal);

      });
    });
  }
}

//banner_image_movies
const api_data = fetch(base_url_banner);
api_data.then((Response) => {
  const dataRequest = Response.json();
  dataRequest.then((reponseApi) => {
    const setMovie = reponseApi.results[Math.floor(Math.random() * reponseApi.results.length - 1)];
    var banner = document.getElementById("banner_image");
    banner.style.backgroundImage = "url("+ setMovie.image_url + ")";
    banner_title.innerHTML = setMovie.title;

  })
})

function fetchCategory(categoryUrl, categoryTitle) {
  // 1 ere categorie choisie
  return fetch(categoryUrl)
      .then((Response) => Response.json())
      .then((data) => {
        const headrow = document.getElementById("headrow");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("Films");
        headrow.appendChild(row);
        const title = document.createElement("h2");
        title.className = "row__title";
        title.innerText = categoryTitle;
        row.appendChild(title);
        const row_posters = document.createElement("div");
        row_posters.className = "row__posters";
        row.appendChild(row_posters);
        data.results.forEach(movie => {
          const poster = document.createElement("img");
          poster.className = "info row__posterLarge";
          var s2 = movie.id;
          poster.id = s2;
          poster.src = movie.image_url
          row_posters.appendChild(poster);
        });
      });
}

fetchCategory(requests.fetchBestmovies, 'Films les mieux notés')
.then(function(){
  Modal()
}).then(async function() {
  fetchCategory(requests.fetchHorreur_Byvotes, 'Horreur')
  .then(function(){
    Modal();
  }).then(fetchCategory(requests.fetchAdventure_Byvotes, 'Romance')
  ).then(async function(){
    fetchCategory(requests.fetchAction_Byvotes, 'Action')
    .then(function(){
      Modal()
    })
  })
})






