# WebUntis LessonTopic Generator 
The plan is to get the lesson topic data from WebUntis so you can generate a file which then can be copy pasted into your azubiheft so you have less work to do yourself.

## Warning:
This is still in heavy development and also just a side project so don't expect 
much code quality or functionality and customizability yet.

### Feature checklist:

- [x] Get data from WebUntis
- [x] Sort data (Day, Class and Topic)
- [x] Make data customizable (Schoolyear)
- [ ] Remove *ts-ignore* and *ts-nocheck* in code

---- 

  ![commit-info][commit-info]
  ![contributors-info][contributors-info]
  ![reposize-info][reposize-info]

----

## Contributing

If you want to take part in contribution, like fixing issues and contributing directly to the code base, plase visit the [How to Contribute][github-contribute] document.

## Requirements:
- [pnpm](https://pnpm.js.org/en/installation)

## Getting started:
1. Clone the repository
```bash
git clone https://github.com/elias-knodel/webuntis-lessontopic.git
```

2. Go in the folder
```bash
cd webuntis-lessontopic
```

3. Setup your authentication credentials for WebUntis
```bash
cp json/secret.example.json json/secret.json
```
(ONLY FILL THE NOW GENERATED `secret.json` WITH YOUR CREDENTIALS! 
THIS FILE IS IGNORED BY GIT AND WILL NOT BE PUSHED!)

4. Install needed packages (we use pnpm as a package manager)
```bash
pnpm install
```

## Commands for developing:
- Compiles on file-save for development
```
pnpm run autobuild
```

- Compiles and minifies for production
```
pnpm run build
```

- Lints and fixes files
```
pnpm run lint
```

## Useful links:
[License][github-license] - 
[Contributing][github-contribute] - 
[Code of conduct][github-codeofconduct] - 
[Issues][github-issues] - 
[Pull requests][github-pulls] - 
[Security][github-security] 

<hr>  

###### Copyright (c) [Elias-Knodel][github-team]. All rights reserved | Licensed under the MIT license. | 2021

<!-- Variables -->
[github-team]: https://github.com/elias-knodel

[github-license]: https://github.com/elias-knodel/webuntis-lessontopic/blob/master/LICENSE
[github-contribute]: https://github.com/elias-knodel/webuntis-lessontopic/blob/master/CONTRIBUTING.md
[github-codeofconduct]: https://github.com/elias-knodel/webuntis-lessontopic/blob/master/CODE_OF_CONDUCT.md
[github-issues]: https://github.com/elias-knodel/webuntis-lessontopic/issues
[github-pulls]: https://github.com/elias-knodel/webuntis-lessontopic/pulls
[github-security]: https://github.com/elias-knodel/webuntis-lessontopic/blob/master/SECURITY.md

[commit-info]: https://img.shields.io/github/last-commit/elias-knodel/webuntis-lessontopic?style=flat-square

[contributors-info]: https://img.shields.io/github/contributors/elias-knodel/webuntis-lessontopic?style=flat-square

[reposize-info]: https://img.shields.io/github/repo-size/elias-knodel/webuntis-lessontopic?style=flat-square
