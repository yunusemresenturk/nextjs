import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface MicroservicesProps {
  userTable: ITable;
  projectTable: ITable;
}
export interface ProjectLambdaFunctions {
  getProjectFunction: NodejsFunction;
  getAllProjectsFunction: NodejsFunction;
  createProjectFunction: NodejsFunction;
  updateProjectFunction: NodejsFunction;
  deleteProjectFunction: NodejsFunction;
}
export class Microservices extends Construct {

  getProjects() {
    throw new Error('Method not implemented.');
  }

  public readonly userMicroservice: NodejsFunction;
  public readonly projectMicroservice: ProjectLambdaFunctions;

  constructor(scope: Construct, id: string, props: MicroservicesProps) {
    super(scope, id);

    // user microservice
    this.userMicroservice = this.createUserFunction(props.userTable);
    // project microservice
    this.projectMicroservice = this.projectLambdaFunctions(props.projectTable);
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
      entry: join(__dirname, `/../functions/users/index.js`),
      ...nodeJsFunctionProps,
    });

    userTable.grantReadWriteData(userFunction);

    return userFunction;
  }

  private projectLambdaFunctions(projectTable: ITable): ProjectLambdaFunctions {
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        PRIMARY_KEY: 'id',
        DYNAMODB_TABLE_NAME: projectTable.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
    };

    // Get Project lambda function
    const getProjectFunction = new NodejsFunction(this, 'getProjectLambdaFunction', {
      entry: join(__dirname, `/../functions/projects/get-one.ts`),
      ...nodeJsFunctionProps,
    });

    // Get All Projects lambda function
    const getAllProjectsFunction = new NodejsFunction(this, 'getAllProjectsLambdaFunction', {
      entry: join(__dirname, `/../functions/projects/get-all.ts`),
      ...nodeJsFunctionProps,
    });

    // Create Project lambda function
    const createProjectFunction = new NodejsFunction(this, 'createProjectLambdaFunction', {
      entry: join(__dirname, `/../functions/projects/create.ts`),
      ...nodeJsFunctionProps,
    });
    // Update Project lambda function
    const updateProjectFunction = new NodejsFunction(this, 'updateProjectLambdaFunction', {
      entry: join(__dirname, `/../functions/projects/update-one.ts`),
      ...nodeJsFunctionProps,
    });

    // Delete Project lambda function
    const deleteProjectFunction = new NodejsFunction(this, 'deleteProjectLambdaFunction', {
      entry: join(__dirname, `/../functions/projects/delete-one.ts`),
      ...nodeJsFunctionProps,
    });

    projectTable.grantReadWriteData(getProjectFunction);
    projectTable.grantReadWriteData(getAllProjectsFunction);
    projectTable.grantReadWriteData(createProjectFunction);
    projectTable.grantReadWriteData(deleteProjectFunction);

    return {
      getProjectFunction,
      getAllProjectsFunction,
      createProjectFunction,
      updateProjectFunction,
      deleteProjectFunction,
    };
  }
}