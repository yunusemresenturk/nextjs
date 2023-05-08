import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class Database extends Construct {

  public readonly userTable: ITable;
  public readonly projectTable: ITable;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // user table
    this.userTable = this.createUserTable();
    // project table
    this.projectTable = this.createProjectTable();
  }

  // User DynamoDb Table Creation
  // User : UR: id -- name - surname - mail - password

  private createUserTable(): ITable {
    const userTable = new Table(this, 'user', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: 'user',
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });
    return userTable;
  }

  private createProjectTable(): ITable {
    const projectTable = new Table(this, 'project', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: 'project',
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });
    return projectTable;
  }
}