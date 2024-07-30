import {
  CfnOutput,
  CfnParameter,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { ArnPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { existsSync } from 'fs';
import { join } from 'path';

export class DeploymentStack extends Stack {
  public readonly deploymentBucket: IBucket;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucketName = new CfnParameter(this, 'BucketName', {
      type: 'String',
      description: 'The name of the branch to deploy the frontend to',
    });

    this.deploymentBucket = new Bucket(this, 'DeploymentBucket', {
      bucketName: bucketName.valueAsString,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    const buildDir = join(__dirname, '..', '..', 'dist', 'task-tracker');

    if (existsSync(buildDir)) {
      new BucketDeployment(this, 'task-tracker-deployment', {
        destinationBucket: this.deploymentBucket,
        sources: [Source.asset(buildDir)],
      });

      new CfnOutput(this, 'task-tracker-deploymentS3Url', {
        value: this.deploymentBucket.bucketWebsiteUrl,
      });
    } else {
      console.warn('Ui directory not found: ' + buildDir);
    }
  }
}
