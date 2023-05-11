import { LambdaIntegration, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { ProjectLambdaFunctions } from './microservice';

interface ApiGatewayProps {
    userMicroservice: IFunction;
    projectMicroservice: ProjectLambdaFunctions;
}

export class ApiGateway extends Construct {

    constructor(scope: Construct, id: string, props: ApiGatewayProps) {
        super(scope, id);

        // user api gateway
        this.createUserApi(props.userMicroservice);
        // project api gateway
        this.createProjectApi(props.projectMicroservice);
    }

    private createUserApi(userMicroservice: IFunction) {

        const apigw = new LambdaRestApi(this, 'userApi', {
            restApiName: 'User Service',
            handler: userMicroservice,
            proxy: false
        });

        const user = apigw.root.addResource('user');
        user.addMethod('GET'); // GET /user
        user.addMethod('POST');  // POST /user

        const singleUser = user.addResource('{id}'); // user/{id}
        singleUser.addMethod('GET'); // GET /user/{id}
        singleUser.addMethod('PUT'); // PUT /user/{id}
        singleUser.addMethod('DELETE'); // DELETE /user/{id}
    }

    private createProjectApi(projectMicroservice: ProjectLambdaFunctions) {  

        const apigw = new LambdaRestApi(this, 'projectApi', {
            restApiName: 'Project Service',
            handler: projectMicroservice.getProjectFunction,
            proxy: false
        }); 
        
        const getProjectIntegration = new LambdaIntegration(projectMicroservice.getProjectFunction);
        const getAllProjectsIntegration = new LambdaIntegration(projectMicroservice.getAllProjectsFunction);
        const createProjectIntegration = new LambdaIntegration(projectMicroservice.createProjectFunction);
        const updateProjectIntegration = new LambdaIntegration(projectMicroservice.updateProjectFunction);
        const deleteProjectIntegration = new LambdaIntegration(projectMicroservice.deleteProjectFunction);

        const project = apigw.root.addResource('project');
        project.addMethod('GET', getAllProjectsIntegration); // GET /project
        project.addMethod('POST', createProjectIntegration);  // POST /project

        const singleProject = project.addResource('{id}'); // project/{id}
        singleProject.addMethod('GET', getProjectIntegration); // GET /project/{id}
        singleProject.addMethod('PUT', updateProjectIntegration); // PUT /project/{id}
        singleProject.addMethod('DELETE', deleteProjectIntegration); // DELETE /project/{id}
    }
}



 /* const projectIntegrations: Record<keyof ProjectLambdaFunctions, LambdaIntegration> = {} as any;
        for (const [key, lambdaFunction] of Object.entries(projectMicroservice)) {
            projectIntegrations[key as keyof ProjectLambdaFunctions] = new LambdaIntegration(lambdaFunction);
        }

        const getProjectIntegration = projectIntegrations.getProjectFunction;
        const getAllProjectsIntegration = projectIntegrations.getAllProjectsFunction;
        const createProjectIntegration = projectIntegrations.createProjectFunction;
        const updateProjectIntegration = projectIntegrations.updateProjectFunction;
        const deleteProjectIntegration = projectIntegrations.deleteProjectFunction; */