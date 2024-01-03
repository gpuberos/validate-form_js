const inputsList = document.querySelectorAll('input[type=text], input[type=tel], textarea');
const form = document.getElementById('contact-form');

const UserRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/u;
const PhoneNumberRegex = /^\+(?:\d{1,3})?\d{10}$/;
const AddressRegex = /^[0-9a-zA-Z\s,'-]+$/;
const SubjectRegex = /^[^<>{}$]{3,200}$/;
const MessageRegex = /^[^<>{}$]{24,}$/;

function addAfter(element) {
    // Chercher si la div existe (.nexSibling renvoie le noeud suivant)
    // https://developer.mozilla.org/fr/docs/Web/API/Node/nextSibling
    let feedbackDiv = element.nextSibling;

    // console.log(feedbackDiv);
    // console.log(feedbackDiv.tagName);
    // console.log(feedbackDiv.nodeName);

    // Si la div n'existe pas, créer une nouvelle (nodeName permet de renvoyer le nom du noeud)
    // Dans notre cas DIV en majuscule, mettre en minuscule ne fonctionnera pas.
    // https://developer.mozilla.org/fr/docs/Web/API/Node/nodeName
    // https://developer.mozilla.org/fr/docs/Web/API/Element/tagName
    if (feedbackDiv.tagName !== 'DIV') {
        feedbackDiv = document.createElement('div');
        element.after(feedbackDiv);
    }
    return feedbackDiv;
}

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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputsList.forEach(element => {
        let feedbackDiv = addAfter(element);
        // console.log(feedbackDiv);

        let regex;

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/switch
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

        validateInput(element, regex, feedbackDiv);
    })
})
