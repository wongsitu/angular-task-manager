import { App, CfnParameter } from 'aws-cdk-lib';
import { S3DataStack } from './stacks/S3DataStack';
import { DeploymentStack } from './stacks/DeploymentStack';

const app = new App();

const bucketNameParam = new CfnParameter(app, 'BucketName', {
  type: 'String',
  description: 'The name of the bucket to deploy the frontend to',
});

const s3DataStack = new S3DataStack(app, 'S3DataStack', {
  bucketName: bucketNameParam.valueAsString,
});

new DeploymentStack(app, 'DeploymentStack', {
  deploymentBucket: s3DataStack.deploymentBucket,
});
