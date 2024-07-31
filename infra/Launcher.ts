import { App } from 'aws-cdk-lib';
import { DeploymentStack } from './stacks/DeploymentStack';

const app = new App();
new DeploymentStack(app, process.env['STACK_NAME']!);
app.synth();
