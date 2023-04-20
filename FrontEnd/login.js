//Creation de l'eventlistener sur le bouton se connecter
const btnSubmit = document.querySelector("#submit");
btnSubmit.addEventListener('click', (e)=> {
    e.preventDefault();
    connexion();
})

//Creation de la fonction de connexion

async function connexion() {  

    // stockage des donnes entrees par l'utilisateur
    let utilisateur = document.getElementById("email").value;
    let motDePasse = document.getElementById("mdp").value;
    
    // Creation de la fonction fetch post
    let promise = await fetch('http://localhost:5678/api/users/login', {
        method:"POST",
        headers: {
            accept: 'applicaton/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: utilisateur,
            password: motDePasse,
        }),
        })
    let verif = await promise.json()
    console.log(verif);
    
    // Gestion de la redirection en fonction de la verification
    if (promise.status === 200) {
        sessionStorage.setItem("bearer", verif.token);
        document.location.href="./index.html";
    } else {
        alert('Echec de la connexion: l\'e-mail ou le mot de passe sont incorrects')
}}