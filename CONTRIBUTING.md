# Contributing guidelines

Hello there!

This project follows a [code of conduct](https://github.com/kleinfreund/vue-accessible-color-picker/blob/main/CODE_OF_CONDUCT.md). Please read it. All contributions are subject to it.

## Prerequisites

The following software will be required to contribute to this project:

- git
- Node.js (version 16 or higher)
- npm (version 8 or higher)

## Development

### Install dependencies

```sh
npm install
```

### Stard development server with a small demo

```sh
npm start
```

### Run tests

```sh
npm test
```

### Build the contents of the `dist` directory

```sh
npm run build
```

### Committing changes

This project follows the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for naming commits.

**Examples**:

```
feat: adds support for Lab/LCH color formats
```

```
fix: fixes a bug with color conversions to RGB
```

```
docs: expands examples
```

## Pull request guidelines

- In case of submitting a contribution for a new feature, please explain briefly why you think the feature is necessary. Ideally, an issue for a feature request was submitted and approved beforehand, but this is not a requirement.
- In case of submitting a contribution that changes or introduces a user interface, ensure that the user interface remains accessible: It must be navigable using a pointer device (e.g. mouse, track pad), a keyboard, and a screen reader. This can be tested manually and with the help of automated accessibility checkers such as axe.
- Please provide unit tests for feature or bug fix contributions.
