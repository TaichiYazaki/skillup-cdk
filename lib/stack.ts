import {
  Stack,
  StackProps,
  aws_s3,
  aws_s3_deployment,
  aws_iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SkillupCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new aws_s3.Bucket(this, 'CreateWebsite', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });
    const webSiteBucketPolicyStatement = new aws_iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: aws_iam.Effect.ALLOW,
      principals: [new aws_iam.AccountRootPrincipal()],
      resources: [`${websiteBucket.bucketArn}/*`],
    });

    // websiteBucket.addToResourcePolicy(webSiteBucketPolicyStatement);

    // const distribution = new aws_cloudfront.Distribution(this, 'Distribution', {
    //   defaultBehavior: {
    //     origin: new aws_cloudfront_origins.S3Origin(websiteBucket),
    //   },
    // });

    const deployment = new aws_s3_deployment.BucketDeployment(
      this,
      'WebsiteDeploy',
      {
        sources: [
          // aws_s3_deployment.Source.data(
          //   'index.html',
          //   '<html><body><h1>Hello World</h1></body></html>'
          // ),
          aws_s3_deployment.Source.asset('./website'),
        ],
        destinationBucket: websiteBucket,
      }
    );
  }
}
