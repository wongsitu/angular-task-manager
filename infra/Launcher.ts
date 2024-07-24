import { App } from 'aws-cdk-lib';
import { S3DataStack } from './stacks/S3DataStack';
import { DeploymentStack } from './stacks/DeploymentStack';

const app = new App();
const s3DataStack = new S3DataStack(app, 'S3DataStack');
new DeploymentStack(app, 'DeploymentStack', {
  deploymentBucket: s3DataStack.deploymentBucket,
});
