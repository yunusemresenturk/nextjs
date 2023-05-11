import { Construct } from 'constructs';
import { DeploymentService } from './deployment-service';
import { ApiGateway } from './apigateway';
import { Database } from './database';
import { Microservices } from './microservice';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsMicroservicesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new Database(this, 'Database');

    const microservices = new Microservices(this, 'Microservices', {
      userTable: database.userTable,
      projectTable: database.projectTable,
    });

    const apigateway = new ApiGateway(this, 'ApiGateway', {
      userMicroservice: microservices.userMicroservice,
      projectMicroservice: microservices.projectMicroservice,
    });

    new DeploymentService(this, 'DeploymentService');
    
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
