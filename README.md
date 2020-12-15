# nextjs-firebase-template
This is [Nextjs](https://nextjs.org/) on Firebase with SSR template project.

⚠️ This Repository works only Firebase paid plan. (Using CloudFunctions Node 10 runtime.)

# Usage
1. Fork this Repository
2. Create your .firebaserc from `$PROJECT_ROOT/.firebaserc.template`
3. exec `yarn firebase use`
4. build `yarn build`
5. Deploy `yarn deploy`

# Development
- `yarn dev` run only nextjs, no using Firebase functions. (Hot reloading)
- `yarn build` and `yarn serve` run on Firebase functions. (No hot reloading. You need to exec `yarn build` and `yarn serve` every update.)
