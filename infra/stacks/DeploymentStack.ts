import { CfnOutput, CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { existsSync } from 'fs';
import { join } from 'path';

interface DeploymentStackProps extends StackProps {
  deploymentBucket: IBucket;
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props);

    const buildDir = join(__dirname, '..', '..', 'dist');

    if (existsSync(buildDir)) {
      new BucketDeployment(this, 'task-tracker-deployment', {
        destinationBucket: props.deploymentBucket,
        sources: [Source.asset(buildDir)],
      });

      new CfnOutput(this, 'task-tracker-deploymentS3Url', {
        value: props.deploymentBucket.bucketWebsiteUrl,
      });
    } else {
      console.warn('Ui directory not found: ' + buildDir);
    }
  }
}
