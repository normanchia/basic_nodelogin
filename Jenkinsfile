pipeline {
    agent any
    tools {
        nodejs 'NodeJS_20'
    }

    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    // Building the Docker image
                    sh 'docker build -t simple-node-login -f node.Dockerfile .'
                    
                    // Checking if the container is already running
                    def isRunning = sh(script: "docker ps -q -f name=\\^app\\\$", returnStdout: true).trim()
                    if (isRunning) {
                        // Stop the existing container
                        sh 'docker stop app'
                        // Remove the existing container
                        sh 'docker rm app'
                    }
                    
                    // Running the Docker container
                    sh 'docker run -d -p 3000:3000 --name app simple-node-login'
                    
                    // Optional: Print a message indicating successful deployment
                    echo "simple-node-login app is deployed and running at: http://localhost:3000"
                }
            }
        }

        stage('Integration Tests') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run test:integration'
                }
            }
        }

        stage('UI Tests') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run test:ui'
                }
            }
        }

        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --disableAssembly
                    --disableYarnAudit
                    --prettyPrint
                ''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'

                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
    }

    post {
        always {
            // Clean up and post-actions if necessary
            echo 'Cleaning up...'
        }
        success {
            // Actions to perform on success
            echo 'Integration and UI tests passed successfully!'
        }
        failure {
            // Actions to perform if the pipeline fails
            echo 'Tests failed. Check console output for details.'
        }
    }
}
