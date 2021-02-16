# Automatic Azubiheft 
The plan is to get data from WebUntis and something like Jira so you can generate a azubiheft CSV which then will be imported into your azubiheft so you have to do less work yourself.

### Feature checklist:

- [ ] Get data from WebUntis
- [ ] Sort data (Day, Class and Topic)
- [ ] Export Data in CSV

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
git clone https://github.com/forstudentsbystudents/automatic-azubiheft.git
```

2. Go in the folder
```bash
cd automatic-azubiheft
```

3. Setup your authentication credentials for WebUntis
```bash
cp json/secret.example.json json/secret.json
```
(ONLY FILL THE NOW GENERATED `secret.json` WITH YOUR CREDENTIALS! 
THIS FILE IS IGNORED BY GIT AND WILL NOT BE DETECTED!)

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

###### Copyright (c) [ForStudentsByStudents][github-team]. All rights reserved | Licensed under the MIT license. | 2020 - today

<!-- Variables -->
[github-team]: https://github.com/forstudentsbystudents

[github-license]: https://github.com/forstudentsbystudents/automatic-azubiheft/blob/master/LICENSE
[github-contribute]: https://github.com/forstudentsbystudents/automatic-azubiheft/blob/master/CONTRIBUTING.md
[github-codeofconduct]: https://github.com/forstudentsbystudents/automatic-azubiheft/blob/master/CODE_OF_CONDUCT.md
[github-issues]: https://github.com/forstudentsbystudents/automatic-azubiheft/issues
[github-pulls]: https://github.com/forstudentsbystudents/automatic-azubiheft/pulls
[github-security]: https://github.com/forstudentsbystudents/automatic-azubiheft/blob/master/SECURITY.md

[commit-info]: https://img.shields.io/github/last-commit/forstudentsbystudents/automatic-azubiheft?style=flat-square

[contributors-info]: https://img.shields.io/github/contributors/forstudentsbystudents/automatic-azubiheft?style=flat-square

[reposize-info]: https://img.shields.io/github/repo-size/forstudentsbystudents/automatic-azubiheft?style=flat-square
