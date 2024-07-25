import { CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class S3DataStack extends Stack {
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
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });
  }
}
