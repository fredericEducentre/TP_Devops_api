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
        stage('Delivery') {
            steps {
                sh '''
                    # Add docker_hub_pat parameter to the Jenkins configuration pipeline
                    docker login  -u fredericeducentre -p $docker_hub_pat
                    docker build . -t fredericeducentre/api
                    docker push fredericeducentre/api
                '''
            }
        }
    }
}
