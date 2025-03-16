#!/usr/bin/env node
import * as prompts from '@clack/prompts';
import { execSync } from 'child_process';

async function main() {
  const password = await prompts.password({
    message: 'Enter password'
  });
  if (!password || password !== 'pass123') {
    console.error('Authentication error: Incorrect password or password not specified');
    return;
  }

  const response = await prompts.group({
    command: () => prompts.select({
      message: 'Choose the command',
      options: [
        { value: 'init', label: 'Project initialization' }
      ]
    }),
    template: ({ command }) => command === 'init' ? prompts.select({
        message: 'Choose a project template',
        options: [
          { value: 'next-app', label: 'Next.js app' },
        ]
      }) : null,
  });

  if (response.command === 'init') {
    switch (response.template) {
      case 'next-app':
        execSync('npx create-next-app@latest app', { stdio: 'inherit' });
        break;

      default:
        console.error('The template is not supported');
    }
  }
}

main().catch(console.error);