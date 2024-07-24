import { App } from 'aws-cdk-lib';
import { DataStack } from './stacks/DataStack';
import { DeploymentStack } from './stacks/DeploymentStack';

const app = new App();
const dataStack = new DataStack(app, 'DataStack');
new DeploymentStack(app, 'DeploymentStack', {
  deploymentBucket: dataStack.deploymentBucket,
});
