// Recuperation des travaux depuis le backend avec fetch
const worksApi = await fetch(`http://localhost:5678/api/works`)
const works = await worksApi.json()
//console.log(works)

// Recuperation des catégories depuis le backend avec fetch
const categoriesApi = await fetch(`http://localhost:5678/api/categories`)
const categories = await categoriesApi.json()
//console.log(categories)

const estConnecte = (sessionStorage.getItem("bearer") != null)
// alert(estConnecte)

// Definition de la condition generale (la connexion) qui optimise l'affichage de la page

if (!estConnecte) {
    document.querySelectorAll('.connexion').forEach(function (element) {
         element.classList.add('non-connecte')
    })
    afficheFiltres();
}

afficheTravaux(0);

// Fonction d'affichage des travaux

document.querySelector("#btn-publier").addEventListener('click', function () {
    sessionStorage.removeItem('bearer')
    document.location.href = './index.html';
})



function afficheTravaux(categorie) {
    
    const sectionGallery = document.querySelector(".gallery");
    
    // Remise à zéro de la section gallery
    sectionGallery.innerHTML = "";
    
    // Filtrage des travaux
    let travauxFiltres = works;
    if (categorie != 0) {
        travauxFiltres = works.filter(function (work) {
            return work.categoryId === categorie
        })
    }

    // Affichage des travaux
    travauxFiltres.forEach(function (work) {    
        const figure = document.createElement("figure")
        const img = document.createElement("img");
        const figCaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figCaption.innerHTML = work.title;
        figure.appendChild(img);
        figure.appendChild(figCaption);
        sectionGallery.appendChild(figure);
    })
      
}

// Creation des filtres
function afficheFiltres() {
    
    const sectionFiltres = document.querySelector(".filtres")
    
    // Création du bouton Tous
    const button = document.createElement("button");
    button.id = "btn-0";
    button.innerText = "Tous";
    button.classList.add("btn-filtres");
    button.addEventListener("click", function () {
        afficheTravaux(0)
    });
    sectionFiltres.appendChild(button)
    
    // Création des autres boutons
    categories.forEach(function (categorie) {
        const button = document.createElement("button");
        button.id = "btn-" + categorie.id;
        button.innerText = categorie.name;
        button.classList.add("btn-filtres");
        button.addEventListener("click", function () {
            afficheTravaux(categorie.id)
        });
        sectionFiltres.appendChild(button);
    }

    )
}




                        // Creation de la fonctionalite d'ouverture et de fermeture de la modale




// Selection des valeurs dans des variables des differents boutons: 
let modale = document.querySelector(".modale-premiere");
let overlay = document.querySelector(".overlay");
let btnLanceModale = document.querySelector("#btn-modale");
let btnFermeModale = document.querySelector(".btn-fermeture");

// ajout de l'eventlistner sur le bouton de lancement
btnLanceModale.addEventListener("click", (e) => {
    e.preventDefault();
    ouvreModale();
});

// Creation de la fonction qui permet le lancement de la modale
function ouvreModale() {
    overlay.classList.add("flex");
    afficheTravauxModale();
}

// Creation de l'eventListener sur le bouton de fermeture
btnFermeModale.addEventListener("click", (e) => {
    e.preventDefault();
    fermeModale();
})
// Creation fermeture de la modale
function fermeModale() {
    overlay.classList.remove("flex");
    //modaleAjout.classList.add("modif");
}


// Creation de l'eventListener qui permet la fermeture de la modale en cliquant en dehors de celle ci

overlay.addEventListener("click", windowOnClick);

// Creation de la fonction qui permet la fermeture de la modale en cliquant en dehors de celle ci

function windowOnClick(event) {
    if (event.target === overlay) {
        fermeModale();
    }
}

//affichage des projets a l'interieur de la modale 
function afficheTravauxModale() {

    let conteneurModale = document.querySelector(".galerie-modale");
    conteneurModale.innerHTML = "";

    let travauxModale = works;
    travauxModale.forEach(function (work) {
        const figure = document.createElement("figure");
        figure.id = "figure-modale";
        const img = document.createElement("img");
        img.id = "img-modale";
        const figCaption = document.createElement("figcaption");
        figCaption.id = "figCaption-modale";
        const btnSuppProjet = document.createElement("span")
        btnSuppProjet.innerHTML = "delete"
        btnSuppProjet.classList.add("material-symbols-outlined")
        btnSuppProjet.id = "btnPoubelle";
        img.src = work.imageUrl;
        figCaption.innerHTML = "éditer";
        figure.appendChild(btnSuppProjet);
        figure.appendChild(img);
        figure.appendChild(figCaption);
        conteneurModale.appendChild(figure);

    })
}

                //Modale ajout de photos

// Stockage des variables                
const modaleAjout = document.querySelector(".modale-ajout");
const btnAjouter = document.querySelector("#btnAjouterPhoto");
const btnRetour = document.querySelector(".btn-retour");

// Declaration de l'eventListener
btnAjouter.addEventListener('click', (e)=> {
    e.preventDefault();
    modaleAjoutAffiche();
});

btnRetour.addEventListener('click', (e)=> {
    e.preventDefault();
    modaleAjoutFerme();
});

//Creation de la fonction d'ouverture et de fermeture de la modale d'ajout
function modaleAjoutAffiche() {
    modaleAjout.classList.add("flex");
}

function modaleAjoutFerme() {
    modaleAjout.classList.remove("flex");
}


        // Creation de la fonctionalite d'ajout d'images.




//

//fonctionalite qui permet l'affichage du fichier telecharge

//

//creation des options select

let selectInput = document.querySelector("select")
categories.forEach(function (categorie) {
    let optionChoice = document.createElement('option')
    optionChoice.innerHTML = categorie.name;
    optionChoice.value = categorie.id;
    selectInput.appendChild(optionChoice);

})

// Creation de la fonction chargerFichier




  function chargerFichier() {

    //declaration des variables
    const documentCharge = document.querySelector('#btn-ajout-fichier').files[0];
    const choixTitre = document.querySelector('#titre').value;
    const choixCategorie = document.querySelector('#categories').value;
    const bearer = sessionStorage.getItem("bearer");

    let formData = new FormData();
    formData.append('image', documentCharge);
    formData.append('title', choixTitre);
    formData.append('category', choixCategorie);

    //creation du formData


    //Appel a l'api via fetch

        fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers:{
            'accept': 'application/json',
            "Authorization": `Bearer ${bearer}`,

        },
        body: formData,
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // ajouter vignettes sur la page principale et sur la modale n1
    })
    
}

//eventlistener sur le bouton valider et appel de la fonction
const btnValider = document.getElementById('btn-valider');
btnValider.addEventListener('click', (e)=> {
    e.preventDefault();
    chargerFichier();
})