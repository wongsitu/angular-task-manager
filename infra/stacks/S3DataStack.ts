import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface S3DataStackProps extends StackProps {
  bucketName: string;
}

export class S3DataStack extends Stack {
  public readonly deploymentBucket: IBucket;
  constructor(scope: Construct, id: string, props: S3DataStackProps) {
    super(scope, id, props);

    this.deploymentBucket = new Bucket(this, 'DeploymentBucket', {
      bucketName: props.bucketName,
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
