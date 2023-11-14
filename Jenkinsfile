pipeline {
    agent any

    environment {
        // Define environment variables if needed
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                // Get the latest code from your source control
                checkout scm
            }
        }
        
        // stage('Build') {
        //     steps {
        //         // Build your Docker image
        //         script {
        //             dockerImage = docker.build('my-nodejs-app:${env.BUILD_ID}')
        //         }
        //     }
        // }

        stage('Integration Tests') {
            steps {
                script {
                    // Run your integration tests inside the Docker container
                    dockerImage.inside {
                        sh 'npm install'
                        sh 'npm run test:integration'
                    }
                }
            }
        }

        stage('UI Tests') {
            steps {
                script {
                    // Run your UI tests inside the Docker container
                    // Note that for UI tests, you might need a headless browser setup
                    dockerImage.inside {
                        sh 'npm install'
                        sh 'npm run test:ui'
                    }
                }
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
