import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { IFunction } from "aws-cdk-lib/aws-lambda";

interface ApiGatewayProps {
    userMicroservice: IFunction;
    projectMicroservice: IFunction;
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

    private createProjectApi(projectMicroservice: IFunction) {  

        const apigw = new LambdaRestApi(this, 'projectApi', {
            restApiName: 'Project Service',
            handler: projectMicroservice,
            proxy: false
        }); 

        const project = apigw.root.addResource('project');
        project.addMethod('GET'); // GET /project
        project.addMethod('POST');  // POST /project

        const singleProject = project.addResource('{id}'); // project/{id}
        singleProject.addMethod('GET'); // GET /project/{id}
        singleProject.addMethod('PUT'); // PUT /project/{id}
        singleProject.addMethod('DELETE'); // DELETE /project/{id}
    }
}


