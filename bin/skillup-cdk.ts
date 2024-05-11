#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SkillupCdkStack } from '../lib/stack';

const app = new cdk.App();
new SkillupCdkStack(app, 'SkillupCdkStack', {});
