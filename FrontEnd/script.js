// Recuperation des travaux depuis le backend avec fetch
let worksApi = await fetch(`http://localhost:5678/api/works`)
let works = await worksApi.json()
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

    let sectionGallery = document.querySelector(".gallery");

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
        let figureSite = document.createElement("figure");
        figureSite.id = 'figure' + work.id;
        let imgSite = document.createElement("img");
        let figCaptionSite = document.createElement("figcaption");
        imgSite.src = work.imageUrl;
        figCaptionSite.innerHTML = work.title;
        figureSite.appendChild(imgSite);
        figureSite.appendChild(figCaptionSite);
        sectionGallery.appendChild(figureSite);
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
    modaleAjoutFerme();
})
// Creation fermeture de la modale
function fermeModale() {
    overlay.classList.remove("flex");
   
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

        let figureModale = document.createElement("figure");
        figureModale.id = 'figure-modale' + work.id;
        figureModale.classList.add('figure-modale')
        let imgModale = document.createElement("img");
        imgModale.id = "img-modale";
        const figCaptionModale = document.createElement("figcaption");
        figCaptionModale.id = "figCaption-modale";
        let btnSuppProjet = document.createElement("button");
        btnSuppProjet = document.createElement('img');
        btnSuppProjet.classList.add("btnPoubelle");
        btnSuppProjet.id = work.id;
        btnSuppProjet.src = './assets/images/Group 10.png';
        btnSuppProjet.addEventListener('click', (e) => {
            e.preventDefault();
            suppressionTravaux(work.id);
        })
        imgModale.src = work.imageUrl;
        figCaptionModale.innerHTML = "éditer";

        let btnFleches = document.createElement('img');
        btnFleches.src = './assets/images/Move.png';
        btnFleches.id = "btn-fleches";
        btnFleches.classList.add('visibility');
        figureModale.addEventListener('mouseenter', () => {
            btnFleches.classList.remove('visibility');
        })
        figureModale.addEventListener('mouseleave', () => {
            btnFleches.classList.add('visibility');
        })



        figureModale.appendChild(btnSuppProjet);
        figureModale.appendChild(imgModale);
        figureModale.appendChild(figCaptionModale);
        figureModale.appendChild(btnFleches);
        conteneurModale.appendChild(figureModale);



    })
}





//Supression des travaux


function suppressionTravaux(id) {
    // let id = btnSuppProjet.id;
    console.log('suppression du projet ' + id)
    const bearer = sessionStorage.getItem("bearer");

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${bearer}`,
            'content-type': 'application/json',
        }
    })

        .then(response => {

        
            if (response.status === 204) {

                let figureSiteDelete = document.getElementById(`figure${id}`);
                    if (figureSiteDelete){
                        figureSiteDelete.remove();
                    }
                let figureModaleDelete = document.getElementById(`figure-modale${id}`);
                    if (figureModaleDelete){
                        figureModaleDelete.remove();
                    }
        
                // alert('Projet supprim\é avec succes');
            } else {
                alert('Erreur lors de la suppression du projet');
            }
        })


}





//Modale ajout de photos

// Stockage des variables                
const modaleAjout = document.querySelector(".modale-ajout");
const btnAjouter = document.querySelector("#btnAjouterPhoto");
const btnRetour = document.querySelector(".btn-retour");

// Declaration de l'eventListener
btnAjouter.addEventListener('click', (e) => {
    e.preventDefault();
    modaleAjoutAffiche();
});

btnRetour.addEventListener('click', (e) => {
    e.preventDefault();
    modaleAjoutFerme();
});

//Creation de la fonction d'ouverture et de fermeture de la modale d'ajout
function modaleAjoutAffiche() {
    modaleAjout.classList.add("flex");
}

let btnFermeModaleAjout = document.querySelector('.btn-fermeture');
btnFermeModaleAjout.addEventListener('click', modaleAjoutFerme());

function modaleAjoutFerme() {
    // btnFermeModaleAjout.addEventListener('click',)
    modaleAjout.classList.remove("flex");
    let preview = document.querySelector('#file-preview');
    preview.classList.add('hidden');
}


// Creation de la fonctionalite d'ajout d'images.


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
    let documentCharge = document.querySelector('#btn-ajout-fichier').files[0];
    let choixTitre = document.querySelector('#titre').value;
    let choixCategorie = document.querySelector('#categories').value;
    let bearer = sessionStorage.getItem("bearer");

    let formData = new FormData();
    formData.append('image', documentCharge);
    formData.append('title', choixTitre);
    formData.append('category', choixCategorie);



    //Appel a l'api via fetch

    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            'accept': 'application/json',
            "Authorization": `Bearer ${bearer}`,

        },
        body: formData,
    })
        .then(async response => {
            if (response.status === 201) {

                // alert('Projet ajout\é avec succes')
                // let documentCharge = document.querySelector('#btn-ajout-fichier').files[0];
                // let work = works
                // let sectionGallery = document.querySelector(".gallery");
                // let conteneurModale = document.querySelector(".galerie-modale");
                // let workObject = works.length[-1];
                // let lastUploadWork = Object.keys(workObject);
                // let lastUploadUrl = imageUrl[imageUrl.length - 1];
                // let lastUploadUrlValue = workObject[lastUploadUrl];

                // sectionGallery.innerHTML = "";
                // conteneurModale.innerHTML = "";


                // afficheTravaux();
                // afficheTravauxModale();


                // let figureSite = document.createElement("figure");
                // figureSite.id = 'figure' + choixCategorie;
                // let imgSite = document.createElement("img");
                // imgSite.src = work.length.imageUrl[-1]
                // let figCaptionSite = document.createElement("figcaption");
                // figCaptionSite.innerHTML = choixTitre;

                // let figureModale = document.createElement("figure");
                // figureModale.id = 'figure-modale' + choixCategorie;
                // figureModale.classList.add('figure-modale')
                // let imgModale = document.createElement("img");
                // imgModale.src = work.length.imageUrl[-1];
                // imgModale.id = 'img-modale';
                // let figCaptionModale = document.createElement("figcaption");
                // figCaptionModale.id = 'figcaption-modale';
                // figCaptionModale.innerHTML = 'éditer';

                // figureSite.appendChild(imgSite);
                // figureSite.appendChild(figCaptionSite);
                // figureModale.appendChild(imgModale);
                // figureModale.appendChild(figCaptionModale);
                // sectionGallery.appendChild(figureSite);
                // conteneurModale.appendChild(figureModale);

                worksApi = await fetch(`http://localhost:5678/api/works`);
                works = await worksApi.json();
                afficheTravaux(0);
                afficheTravauxModale();
                modaleAjoutFerme();

            }

        })
    // .then(res => res.json())
    // .then(data => {
    // console.log(data);
    // ajouter vignettes sur la page principale et sur la modale n1
    // })
    // 



}

//eventlistener sur le bouton valider et appel de la fonction
const btnValider = document.getElementById('btn-valider');
btnValider.addEventListener('click', (e) => {
    e.preventDefault();
    chargerFichier();
})

// Fonctionnalite d'affichage du fichier telecharge 
let documentCharge = document.querySelector('#btn-ajout-fichier');

const previewImage = () => {
    const file = documentCharge.files;
    let preview = document.getElementById('file-preview');
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
    preview.classList.remove('hidden');

};

documentCharge.addEventListener("change", previewImage);



