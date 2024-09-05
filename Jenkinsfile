pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/ericnoel92/TouriWeather'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Contrôle qualité') {
            steps {
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
