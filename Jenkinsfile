pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
		# Ici mettre le code pour le clone de votre projet                
		  git branch: 'main', url: 'https://github.com/ericnoel92/TouriWeather'
            }
        }
        stage('Build') {
            steps {
		# Si votre projet nécessite un build mettre les commandes nécessaire ci-dessous
        sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'      
            }
        }
       
         
    }
}
