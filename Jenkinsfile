pipeline {
    agent any
    tools {
            nodejs 'NodeJS_20'
        }

    stages {

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
                        sh 'npm install puppeteer --save-dev'
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
