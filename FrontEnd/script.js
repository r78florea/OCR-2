

// Recuperation des travaux depuis le backend avec fetch


// async function getWorks() {
//     const response = await fetch(`http://localhost:5678/api/works`);
//     const works = await response.json();
//     console.log(works);
// }  

// getWorks();
function getWorks() {
    fetch(`http://localhost:5678/api/works`)
    .then(resp => resp.json())
    .then(data => afficheTravaux(data))
    // .then(data => piecesFiltres(data))
}


function afficheTravaux(data) {

    for (i of data) {

    const sectionGallery = document.querySelector(".gallery");


    const nomElement = document.createElement("figcaption");
    const imageElement = document.createElement("img");
    // imageElement.dataset.id = i.id;
    // nomElement.dataset.id = i.id;


    nomElement.innerHTML = i.title;
    imageElement.src = i.imageUrl;
    
    sectionGallery.appendChild(imageElement);
    sectionGallery.appendChild(nomElement);
    
}
}
getWorks();
afficheTravaux();

//     // const response = await fetch('http://localhost:5678/api/works')
//         // const works = await response.json()


// Creation des filtres 

// const boutonTous = document.getElementById("btn-tous");
// boutonTous.addEventListener("click", function () {
//      getWorks();
//      afficheTravaux();
// })

const boutonObjets = documents.querySelector("btn-objets");
boutonObjets.addEventListener("click", function () {
    
    const objetsFiltres = data.filter(function (data) {
        return data.categoryId = 1;
    })

    document.querySelector(".gallery").innerHTML = "";
    afficheTravaux(objetsFiltres);
})