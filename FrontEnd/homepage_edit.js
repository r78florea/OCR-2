// Recuperation des travaux depuis le backend avec fetch
const worksApi = await fetch(`http://localhost:5678/api/works`)
const works = await worksApi.json()
//console.log(works)

// Recuperation des catégories depuis le backend avec fetch
const categoriesApi = await fetch(`http://localhost:5678/api/categories`)
const categories = await categoriesApi.json()
//console.log(categories)

afficheFiltres();
afficheTravaux(0);


// Fonction d'affichage des travaux
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

