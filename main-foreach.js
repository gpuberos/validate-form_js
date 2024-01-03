// Sélectionne tous les éléments d'entrée de type texte, de type téléphone et les zones de texte dans le document
const inputsList = document.querySelectorAll('input[type=text], input[type=tel], textarea');

// Sélectionne l'élément avec l'ID 'contact-form'
const form = document.getElementById('contact-form');

// Définit les expressions régulières pour la validation des entrées
const UserRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/u;
const PhoneNumberRegex = /^\+(?:\d{1,3})?\d{10}$/;
const AddressRegex = /^[0-9a-zA-Z\s,'-]+$/;
const SubjectRegex = /^[^<>{}$]{3,200}$/;
const MessageRegex = /^[^<>{}$]{24,}$/;

// Fonction pour ajouter un élément div après l'élément d'entrée
function addAfter(element) {
    let feedbackDiv = element.nextSibling;
    if (feedbackDiv.tagName !== 'DIV') {
        feedbackDiv = document.createElement('div');
        element.after(feedbackDiv);
    }
    return feedbackDiv;
}

// Fonction pour valider l'entrée de l'utilisateur
function validateInput(element, regex, feedbackDiv) {
    if (element.value == "") {
        feedbackDiv.innerHTML = "Le champ ne peut pas être vide.";
        feedbackDiv.style.color = "red";
    } else if (regex.test(element.value)) {
        feedbackDiv.innerHTML = "Votre contenu est valide";
        feedbackDiv.style.color = "green";
    } else {
        feedbackDiv.innerHTML = "Le contenu n'est pas valide";
        feedbackDiv.style.color = "red";
    }
}

// Ajoute un écouteur d'événements sur le formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputsList.forEach(element => {
        let feedbackDiv = addAfter(element);
        let regex;

        // Détermine l'expression régulière à utiliser en fonction de l'ID de l'élément
        switch (element.id) {
            case 'tel':
                regex = PhoneNumberRegex;
                break;
            case 'address':
                regex = AddressRegex;
                break;
            case 'subject':
                regex = SubjectRegex;
                break;
            case 'msg':
                regex = MessageRegex;
                break;
            default:
                regex = UserRegex;
        }

        // Valide l'entrée de l'utilisateur
        validateInput(element, regex, feedbackDiv);
    })
})
