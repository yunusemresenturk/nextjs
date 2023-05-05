import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface SwnMicroservicesProps {
    userTable: ITable;
}

export class SwnMicroservices extends Construct {

    public readonly userMicroservice: NodejsFunction;

    constructor(scope: Construct, id: string, props: SwnMicroservicesProps){
        super(scope, id);        
        
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling: {
              externalModules: [
                'aws-sdk'
              ]
            },
            environment: {
              PRIMARY_KEY: 'id',
              DYNAMODB_TABLE_NAME: props.userTable.tableName
            },
            runtime: Runtime.NODEJS_14_X
          }
      
          // user microservices lambda function
          const userFunction = new NodejsFunction(this, 'userLambdaFunction', {
            entry: join(__dirname, `/../src/users/index.js`),
            ...nodeJsFunctionProps,
          })
      
        props.userTable.grantReadWriteData(userFunction);

        this.userMicroservice = userFunction;
    }
}