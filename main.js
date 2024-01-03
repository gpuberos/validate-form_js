// Récupère le formulaire avec l'ID 'contact-form'
const form = document.getElementById('contact-form');

// Définit les expressions régulières pour la validation des différents champs du formulaire

// Valide le nom d'utilisateur
// Permet d'accepter uniquement des caractères alphabétiques, y compris les caractères accentués.
const UserRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/u;

// Valide le numéro de téléphone
// Valide un numéro de téléphone au format international.
const PhoneNumberRegex = /^\+(?:\d{1,3})?\d{10}$/;

// Valide l'adresse
// Accepte des caractères alphanumériques, espaces, virgules, apostrophes et tirets, couramment utilisés dans les adresses.
const AddressRegex = /^[0-9a-zA-Z\s,'-]+$/;

// Valide le sujet
// Limite la longueur et exclut certains caractères spéciaux dans le champ du sujet.
const SubjectRegex = /^[^<>{}$]{3,200}$/;

// Valide le message
// Limite la longueur du champ du message et exclut certains caractères spéciaux.
const MessageRegex = /^[^<>{}$]{24,}$/;

// Fonction pour valider un champ d'entrée en fonction d'une expression régulière (Regex)
// La fonction prend deux paramètres : l'ID d'un champ d'entrée (inputId) et l'expression régulière correspondante (regex)
// À chaque soumission du formulaire, cette fonction est appelée pour chaque champ, affichant un message de validation ou d'erreur 
// en fonction de la validité du contenu du champ par rapport à l'expression régulière (Regex) associée.
function validateInput(inputId, regex) {
    // Récupère l'élément d'entrée par son ID
    var input = document.getElementById(inputId);
    // Crée un nouvel élément div pour afficher les commentaires de validation
    var feedbackDiv = document.createElement('div');
    // Insère le div de commentaires après l'élément d'entrée
    input.after(feedbackDiv);

    // Vérifie si le champ d'entrée est vide
    if (input.value == "") {
        feedbackDiv.innerHTML = "Le champ ne peut pas être vide.";
        feedbackDiv.style.color = "red";
    }
    // Vérifie si la valeur du champ d'entrée correspond à l'expression régulière
    else if (regex.test(input.value)) {
        feedbackDiv.innerHTML = "Votre contenu est valide";
        feedbackDiv.style.color = "green";
    }
    // Si la valeur du champ d'entrée ne correspond pas à l'expression régulière
    else {
        feedbackDiv.innerHTML = "Le contenu n'est pas valide.";
        feedbackDiv.style.color = "red";
    }
}

// Ajoute un gestionnaire d'événements 'submit' au formulaire
form.addEventListener('submit', (e) => {
    // Empêche le comportement par défaut de l'événement 'submit'
    e.preventDefault();

    // Appelle la fonction de validation pour chaque champ d'entrée
    validateInput('fname', UserRegex);
    validateInput('lname', UserRegex);
    validateInput('tel', PhoneNumberRegex);
    validateInput('address', AddressRegex);
    validateInput('subject', SubjectRegex);
    validateInput('msg', MessageRegex);
})