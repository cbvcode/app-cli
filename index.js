#!/usr/bin/env node
import * as prompts from '@clack/prompts';
import { execSync } from 'child_process';

async function main() {
  prompts.intro('cbvcode CLI');

  const password = await prompts.password({
    message: 'Enter password'
  });
  if (!password || password !== 'pass123') {
    prompts.cancel('Incorrect password. Goodbye!');
    return;
  }

  const command = await prompts.select({
    message: 'Choose the command',
    options: [
      { value: 'init', label: 'Project initialization' }
    ]
  });

  if (prompts.isCancel(command)) {
    prompts.cancel('The operation has been canceled');
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
      prompts.cancel('The operation has been canceled');
      return;
    }
  }

  if (command === 'init' && template) {
    prompts.log.info(`The template is selected: ${template}`);

    switch (template) {
      case 'next-app':
        prompts.log.info('Initialization Next.js app ...');

        execSync('yarn create next-app app', { stdio: 'inherit' });
        break;

      default:
        prompts.cancel('The template is not supported');
    }
  }

  prompts.log.success('Done!');
}

main().catch(err => {
  prompts.outro(`An error occurred: ${JSON.stringify(err, null, 2)}`);
});