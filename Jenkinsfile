pipeline {
    // Indique que le pipeline peut être exécuté sur n'importe quel agent Jenkins disponible
    agent any

    stages {
        // Étape pour cloner le dépôt Git
        stage('Clone') {
            steps {
                // Clone la branche principale ('main') du dépôt Git spécifié
                // Cela récupère le code source du projet afin qu'il puisse être construit et testé
                git branch: 'main', url: 'https://github.com/ericnoel92/TouriWeather'
            }
        }

        // Étape pour installer les dépendances du projet
        stage('Build') {
            steps {
                // Utilise la commande npm install pour installer toutes les dépendances listées dans le fichier package.json
                // Cette étape est essentielle pour que le projet puisse être exécuté et testé correctement
                sh 'npm install'
            }
        }

        // Étape pour exécuter l'analyse de la qualité du code avec SonarQube
        stage('Contrôle qualité') {
            steps {
                // Exécute l'outil SonarQube pour analyser la qualité du code du projet
                // Les paramètres incluent la clé du projet, les sources du code, l'URL du serveur SonarQube, et un token d'authentification
                // Cette étape permet de vérifier la qualité du code, en détectant d'éventuelles erreurs, vulnérabilités, et mauvaises pratiques
                sh '''
                # Assurez-vous que sonarqube_project et sonarqube_token sont bien configurés dans Jenkins
                sonar-scanner \
                  -Dsonar.projectKey=$sonarqube_project \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://sonarqube:9000 \
                  -Dsonar.token=$sonarqube_token
                '''
            }
        }
    }
}
