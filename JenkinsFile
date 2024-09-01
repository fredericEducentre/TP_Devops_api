pipeline {
    agent {
        label 'agent_node'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/fredericEducentre/TP_Devops_api.git'
            }
        }
        stage('Build') {
            steps {
                sh '''
                    npm install
                '''
            }
        }
        stage('Contrôle qualité') {
            steps {
                sh '''
                    # Add sonarqube_project and sonarqube_token parameters to the Jenkins configuration pipeline
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
