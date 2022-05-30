const BASE_URL = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json';

function requestAndReadDataFlickr() {
    fetch(BASE_URL)
    .then(response => response.text())
    .then(result => createCarouselCards(result))
    .catch(error => console.log(error));
}


//// FUNCTION CHE RIPULISCE IL TESTO FORNITO DALLA CHIAMATA ALL'API
function cleanJson(text) {
const cleanedJson1 = text.replace('jsonFlickrFeed(', '');
const cleanedJson2 = cleanedJson1.slice(0, -1);

const json = JSON.parse(cleanedJson2);
return json;
// console.log(json)
}


//// FUNCTION CHE CREA, PER OGNI OBJECT, L'HTML PER CONTENERLO E VISUALIZZARLO SULLO SCHERMO
function createCarouselCards(result){
    const parsedResult = cleanJson(result);
    const items = parsedResult.items;

    const template = `
            <img src="#URL"class="centered d-block w-100" alt="#ALT">
            <div class="carousel-caption d-none d-md-block">
              <h5 class="div-background">#TITLE</h5>
            </div>
          `
    
    const container = document.getElementById('carousel-container');
    container.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const div = document.createElement('div');
        div.classList.add('carousel-item');

        if (i === 0) {
            div.classList.add('active');
        }

        const internalHtml = template.replace('#URL', item.media.m)
                                     .replace('#ALT', item.tags)
                                     .replace('#TITLE', item.title)
        
        div.innerHTML = internalHtml;
        container.appendChild(div);
    }
}

function search() {
    const input = document.getElementById('search-input');
    // console.log('parola cercata',input.value)
    const searchWords = input.value.trim();
    const tags = searchWords.replaceAll(' ', ',');
    const tagsUrl = BASE_URL + "&tags=" + tags;

    fetch(tagsUrl)
    .then(response => response.text())
    .then(result => createCarouselCards(result))
    .catch(error => console.log(error));
}


requestAndReadDataFlickr();
