/*
Déclarer mes variables
*/
   
    let myNav = document.querySelectorAll('nav a');
    
   
    console.log(myNav)
//

/*
Activer la navigation
*/
    //faire une boucle sur myNav (collection de liens)
    for( let item of myNav){
        //item => lien de ma nav
        console.log(item);

        //capter le clic sur le lien
        item.addEventListener( 'click', (event) => {
            //bloquer le comportement naturel de la balise
            event.preventDefault();

            //récuperer la valeur de l'attribut link-date
            const pageName = item.getAttribute('link-data')

            //Ajouter le contenu dans le dom
            fetchHtmlData(pageName)
        })
    };

/*
Création d'une fonction fetch
*/
    const fetchHtmlData = (page = 'accueil') => {
        fetch(`./content/${page}.html`)
    //premier callback : analyse et traitement du fetch
    .then( rawResponse => {
        console.log(rawResponse)

        //renvoyer la réponse au format texte
        return rawResponse.text()
    })
    //Deuxième callback: manipuler les données
    .then( textResponse =>{
        console.log(textResponse)

        document.querySelector('main').innerHTML = textResponse
        //Envoyer le nom de la page dans le dernier then
        return page
    } )
    .then( page => {
        
        //vérifier le nom de la page active
        if( page === 'contacts') submitForm()
        
    })
    //Capter les erreurs
    .catch( error => {
        console.error(error)
    })
    }

/*
Gestion du formulaire
*/
    const submitForm = () => {
        //Déclaration de mes variables
        let myForm = document.querySelector('form');
        let msgSubject = document.querySelector('[placeholder="Sujet"]');
        let msgEmail = document.querySelector('[placeholder="Email"]');
        let msgMessage = document.querySelector('[placeholder="Message"]');
        let messageList = document.querySelector('form + ul');

            //Capter le submit du formulaire
            myForm.addEventListener('submit', (event) =>{
                //Initier une variable pour la gestion des erreurs
                let formError = 0;

                //bloquer le comportement naturel de la balise
                event.preventDefault();
                
              

                //Le sujet est valide s'il contient au minimum 2 caractères
                if(msgSubject.value.length < 2){
                    formError++

                    //Ajouter la class formError sur msgSubject
                    msgSubject.classList.add('formError')
                }

                if(msgEmail.value.length < 5){
                    formError++

                    //Ajouter la class formError sur msgEmail
                    msgEmail.classList.add('formError')
                }

                
                if(msgMessage.value.length <= 5){
                    formError++

                    //Ajouter la class formError sur msgMessage
                    msgMessage.classList.add('formError')
                }

                //Validation finale du formulaire
                if( formError === 0){
                    console.log('Le formulaire est validé')

                    //Afficher le message dans la liste
                    messageList.innerHTML += `
                        <li>
                            <h3>${msgSubject.value} <b>${msgEmail.value}</b></h3>
                            <p>${msgMessage.value}</p>
                        </li>
                    `

                    //vider le formulaire
                    msgSubject.value = ''
                    msgEmail.value = ''
                    msgMessage.value = ''
                }else{
                    formError++
                    console.log("le formulaire n'est pas validé")
                }


            })

            //supprimer les messages d'erreurs au focus
            msgSubject.addEventListener('focus', () =>{
                msgSubject.classList.remove('formError')
            })

            msgEmail.addEventListener('Focus', () => {
                msgEmail.classList.remove('formError')
            })

            msgMessage.addEventListener('Focus', () => {
                msgMessage.classList.remove('formError')
            })
    }



/*
Charger le contenu de la page d'accueil
*/
    fetchHtmlData()
