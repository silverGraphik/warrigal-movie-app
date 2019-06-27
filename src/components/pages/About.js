import React from 'react';

const About = () => {
    return (
        <div className="container">
            <h1>A propos de cet application</h1>
            <p>Une application pour effectuer une recherche de film à l'aide d'une API, de permettre à l'utilisateur de se créer un compte
                utilisateur, de se connecter, de mettre à jour et supprimer son profil, l'utilisateur pourra également enregistrer un film 
                sur son compte le supprimer, rechercher des sous-tires et torrent approprier.
            </p>
            <ol>
                <li>
                    Etape 1 : <strong>FRONT-END</strong> Connecter l'app à l'API effectuer une requête de recherche et le montrer sur la page
                </li>
                <li>
                    Etape 2 : <strong>FRONT-END</strong> Montrer sur la page le film choisit à l'aide d'une nouvelle requête API
                </li>
                <li>
                    Etape 3 : <strong>FRONT-END</strong> Création des fonctionalité utilisateur et compte (création) 
                </li>
                <li>
                    Etape 4 : <strong>BACK-END</strong> Envoie des données renseigner par l'utilisateur vers une bdd
                </li>
                <li>
                    Etape 5 : <strong>BACK-END</strong> Création des fonctionalité CRUD pour le compte 
                </li>
                <li>
                    Etape 6 : <strong>BACK-END</strong> Création des fonctionalité CRUD pour les films 
                </li>
            </ol>
            <p>Version: 1.0.0</p>
        </div>
    )
}

export default About
