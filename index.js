#!/usr/bin/env node
import * as prompts from '@clack/prompts';
import { execSync } from 'child_process';

async function main() {
  prompts.intro('cbvcode CLI');

  const password = await prompts.password({
    message: 'Enter password'
  });
  if (!password || password !== 'pass123') {
    console.error('Authentication error: Incorrect password or password not specified');
    prompts.outro('Goodbye!');
    return;
  }

  const command = await prompts.select({
    message: 'Choose the command',
    options: [
      { value: 'init', label: 'Project initialization' }
    ]
  });

  if (prompts.isCancel(command)) {
    prompts.outro('The operation has been canceled');
    return;
  }

  let template = null;

  if (command === 'init') {
    template = await prompts.select({
      message: 'Choose a project template',
      options: [
        { value: 'next-app', label: 'Next.js app' },
      ]
    });

    if (prompts.isCancel(template)) {
      prompts.outro('The operation has been canceled');
      return;
    }
  }

  if (command === 'init' && template) {
    console.log(`The template is selected: ${template}`);

    switch (template) {
      case 'next-app':
        console.log('Initialization Next.js app ...');
        execSync('yarn create next-app app', { stdio: 'inherit' });
        break;

      default:
        console.error('The template is not supported');
    }
  }

  prompts.outro('Done!');
}

main().catch(err => {
  console.error('An error occurred:', err);
  process.exit(1);
});