  import { ITable } from "aws-cdk-lib/aws-dynamodb";
  import { Runtime } from "aws-cdk-lib/aws-lambda";
  import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
  import { Construct } from "constructs";
  import { join } from "path";

  interface MicroservicesProps {
    userTable: ITable;
    projectTable: ITable;
  }

  export class Microservices extends Construct {

    public readonly userMicroservice: NodejsFunction;
    public readonly projectMicroservice: NodejsFunction;

    constructor(scope: Construct, id: string, props: MicroservicesProps) {
      super(scope, id);

      // user microservice
      this.userMicroservice = this.createUserFunction(props.userTable);
      // project microservice
      this.projectMicroservice = this.createProjectFunction(props.projectTable);
    }

    private createUserFunction(userTable: ITable): NodejsFunction {
      const nodeJsFunctionProps: NodejsFunctionProps = {
        bundling: {
          externalModules: ['aws-sdk'],
        },
        environment: {
          PRIMARY_KEY: 'id',
          DYNAMODB_TABLE_NAME: userTable.tableName,
        },
        runtime: Runtime.NODEJS_14_X,
      }

      // User microservices lambda function
      const userFunction = new NodejsFunction(this, 'userLambdaFunction', {
        entry: join(__dirname, `/../src/users/index.js`),
        ...nodeJsFunctionProps,
      });

      userTable.grantReadWriteData(userFunction);

      return userFunction;
    }

    private createProjectFunction(projectTable: ITable): NodejsFunction {
      const nodeJsFunctionProps: NodejsFunctionProps = {
        bundling: {
          externalModules: ['aws-sdk'],
        },
        environment: {
          PRIMARY_KEY: 'id',
          DYNAMODB_TABLE_NAME: projectTable.tableName,
        },
        runtime: Runtime.NODEJS_14_X,
      }

      // Project microservices lambda function
      const projectFunction = new NodejsFunction(this, 'projectLambdaFunction', {
        entry: join(__dirname, `/../src/projects/index.js`),
        ...nodeJsFunctionProps,
      });

      projectTable.grantReadWriteData(projectFunction);

      return projectFunction;
    }
  }
  // Path: aws\lib\index.ts