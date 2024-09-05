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
        stage('Test') {
            steps {
                sh 'npm test'      
            }
        }
       
         
    }
}
