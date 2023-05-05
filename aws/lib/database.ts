import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class SwnDatabase extends Construct {

    public readonly userTable: ITable;

    constructor(scope: Construct, id: string){
        super(scope, id);
      
        // user DynamoDb Table Creation
        const userTable = new Table(this, 'user', {
            partitionKey: {
              name: 'id',
              type: AttributeType.STRING
            },
            tableName: 'user',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
          });

        this.userTable = userTable;
    }

}