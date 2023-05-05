import { LambdaRestApi, CfnAuthorizer, AuthorizationType } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { UserPool } from 'aws-cdk-lib/aws-cognito'

interface SwnApiGatewayProps {
    userMicroservice: IFunction;
}

export class SwnApiGateway extends Construct {

    constructor(scope: Construct, id: string, props: SwnApiGatewayProps) {
        super(scope, id);

        // User microservices api gateway

        const apigw = new LambdaRestApi(this, 'userApi', {
            restApiName: 'User Service',
            handler: props.userMicroservice,
            proxy: false,
        });

        // Cognito User Pool with Email Sign-in Type.
        const userPool = new UserPool(this, 'userPool', {
            signInAliases: {
                email: true
            }
        })

        // Authorizer for the User Service API that uses the
        // Cognito User pool to Authorize users.
        const authorizer = new CfnAuthorizer(this, 'cfnAuth', {
            restApiId: apigw.restApiId,
            name: 'UserServiceAPIAuthorizer',
            type: 'COGNITO_USER_POOLS',
            identitySource: 'method.request.header.Authorization',
            providerArns: [userPool.userPoolArn],
        })

        const user = apigw.root.addResource('user');
        user.addMethod('GET', undefined, {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: { authorizerId: authorizer.ref }
        });
        user.addMethod('POST', undefined, {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: { authorizerId: authorizer.ref }
        });

        const singleUser = user.addResource('{id}');
        singleUser.addMethod('GET', undefined, {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: { authorizerId: authorizer.ref }
        });
        singleUser.addMethod('PUT', undefined, {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: { authorizerId: authorizer.ref }
        });
        singleUser.addMethod('DELETE', undefined, {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: { authorizerId: authorizer.ref }
        });
    }
}
