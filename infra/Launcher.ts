import { App } from 'aws-cdk-lib';
import { DeploymentStack } from './stacks/DeploymentStack';

const app = new App();
new DeploymentStack(app, 'DeploymentStack', {
  stackName: process.env['STACK_NAME'],
});
