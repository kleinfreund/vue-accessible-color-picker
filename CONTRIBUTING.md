# Contributing guidelines

Hello there!

This project follows a [code of conduct](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CODE_OF_CONDUCT.md). Please read it. All contributions are subject to it.

## Development setup

1. Clone this repository.
2. Open a terminal application and navigate to the location of the cloned repository.
3. Run `npm install` to install the project’s dependencies.

### Watch and re-build the contents of the `dist` directory

```sh
npm start
```

### Build the contents of the `dist` directory

```sh
npm run build
```

### Run tests

```sh
npm test
```

### Committing changes

This project follows the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for naming commits.

**Examples**:

```
feat: added support for Lab/LCH color formats
```

```
fix: fixes a bug with color conversions to RGB
```

## Pull request guidelines

- In case of submitting a contribution for a new feature, please explain briefly why you think the feature is necessary. Ideally, an issue for a feature request was submitted and approved beforehand, but this is not a requirement.
- In case of submitting a contribution that changes or introduces a user interface, ensure that the user interface remains accessible: It must be navigable using either a pointer device (e.g. mouse, track pad), a keyboard, or a screen reader. This can be tested manually and/or with the help of automated accessibility checkers such as axe.
- Please provide unit tests for feature or bug fix contributions.
