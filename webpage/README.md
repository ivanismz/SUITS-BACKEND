# Standard README.md for React-based applications.

Months can be wasted if a project doesn't start well.

Please be patient and read through this doc. It takes up to 1 hour.

## Prerequisites

1. vscode (Visual Studio Code).
2. node.js (https://nodejs.org/en/download/).

## How to Run?

`npm start`

If it doesn't work and shows you the error "Can't find module ...", do `npm install` first.

## How to Build?

`npm run build`

If you are deploying on a remote server, please search that server for related manuals. This build command only provides you a package that help you to preview locally (and potentially distribute) the content in the build mode, while npm start can only provide you a development mode (go to _./package.json_ then you'll see the `npm start` command actually corresponds to `npm run dev`).

**Some variables could be different according to the mode.**

For instance, the _./src/utils/LogUtil.tsx_ file utilizes the process environment to decide whether to output logs or not. Many API endpoints can also be different according to different process environments.

## Important Notes:

Think "separately" when you are working on different functions, files, etc. Always keep in mind that your colleagues should be able to call your function and use your component even if they don't have your context or knowledge.

## Prettier & ESLint setup in VSCode

This helps you write and format your code according to the general standard.
This guide is written in February 2023, so the following steps might not work if the libraries have major updates.

1. Open the root project folder using VSCode.
2. Open a new terminal and type the following commands:
   ```
   npm install
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension esbenp.prettier-vscode
   ```
3. Adjust the VSCode formatting settings:
   Type `shift+command+P` on Mac to open the command palette. (replace `command` with `ctrl` on Windows) Open User Settings or Workspace Settings (type to search)
   Paste the following code into your JSON (remove the curly braces at the beginning and end of the following code if you already have something in the file).

   ```
   {
       "editor.formatOnPaste": false, // required
       "editor.formatOnType": false, // required
       "editor.formatOnSave": true, // optional
       "editor.formatOnSaveMode": "file", // required to format on save
       "editor.defaultFormatter": "esbenp.prettier-vscode",
       "[javascript]": {
           "editor.defaultFormatter": "dbaeumer.vscode-eslint"
       },
       "[typescript]": {
           "editor.defaultFormatter": "dbaeumer.vscode-eslint"
       },
       "[typescriptreact]": {
           "editor.defaultFormatter": "dbaeumer.vscode-eslint"
       },
       "editor.codeActionsOnSave": {
           "source.fixAll.eslint": true,
       },
       "eslint.enable": true,
       "eslint.validate": ["typescript", "json"],
   }
   ```

4. Restart VSCode. You should now be able to format the files by saving (command + S).

## Working on a new task

Always create a new git branch and work on that branch if you start a new task. When you finish working with the task, submit a pull request from that branch to the main branch and notify others to do code reviews and approve your pull request.

## Naming Conventions

Following good naming conventions can help you and others quickly navigate through the code base, which greatly boosts the coding efficiency.

### **_Naming Format_**

In this project, let's follow the following naming convention.

**For Files**

| Name Type        | Name Format           |
| ---------------- | --------------------- |
| directories      | sample_directory      |
| .tsx files       | SampleTsxFile.tsx     |
| .css/.scss files | sample_scss_file.scss |
| others           | other_files           |

**For Code**

| Name Type                                           | Name Format          |
| --------------------------------------------------- | -------------------- |
| module/class                                        | SampleClass          |
| function name                                       | functionName         |
| normal constants/variables (typically in functions) | normalVariables      |
| json/object attributes                              | jsonObjectAttributes |
| css class names                                     | css-class-name       |
| url                                                 | sample-url           |
| real (global or file-wise) constants/enums          | GLOBAL_CONSTANT      |

### **_Naming Logic_**

> "Good code should be understood by CS freshman students without comments." - Lin Guo, _The First Line of Code: Android Programming with Kotlin_

Here are four rules that we should follow when naming our objects/variables.

1. **Clear and specific** (`userFullName` instead of `userName`)
2. **Implicative** (`userInfo` should be an array or dictionary object instead of a single const/variable)
3. **Consistent** (if you use `userInfo` in one place, try your best to avoid using `personInfo` elsewhere)
4. **Brief** (use `userInfo` instead of `userInformation`)

Note: if the rules above conflict each other, former ones have higher priority.

Additional rules applicable for files and modules/classes:

- **Scope Clear** (use `DashboardMenu` instead of `Menu` when you are editing a component that is only used in the Dashboard scope)
- **Special Prefix** (use `RT` (or your own abbreviation of the project name) as prefix when you are editing a file that should be globally available, this should be uncommon except for the files in the root _./src_ folder)
- **No Redundant Postfix** (use `ProfileForm` instead of `ProfileFormFragment` when you are creating a file/module under a descriptive folder like "fragments", you don't need to further add postfix to the file.)

## Putting Files In Correct Places

Most global files needed are already created. It should be extremely uncommon when you need to create files directly under the _./src_ folder unless you are doing project reform or writing project configurations.

Instead of a project folder description table, I would like to provide a decision tree here to help you decide where to put a new file. Hopefully when you get proficient enough, you won't need this anymore.

1. Are you creating a file that contains a React component?

   A. Yes -> 4

   B. No -> 2

2. Which type of file will you create?

   A. pictures (.svg, .gif, .jpg, etc.) -> Answer I

   B. CSS/SCSS file -> 3

   C. .tsx/.jsx file but without React component -> 3

   D. project configuration files / settings -> Answer V

3. Are you creating this file as an index of other files or as a library API for other files?

   A. Yes -> Answer III

   B. No -> Answer II

4. For the component you are creating, can it be reused in other places?

   A. Yes -> 5

   B. No -> Go to the ./src/pages directory and follow Answer IV

5. Are you creating a component that can be separated into smaller components?

   A. Yes -> Go to the ./src/fragments directory and follow Answer IV

   B. No -> Go to the ./src/ui directory and follow Answer IV

**_Answer I_**:

Put inside one of the sub-directories of ./src/assets/img (e.g. if it is an icon beside an input field, put it inside ./src/assets/img/icon)

**_Answer II_**:

You are likely creating a file related to a React component. If you haven't create the .tsx or .jsx file, create that first following this decision tree.

If the subfield you are working on is large enough to have its own directory for this kind of file (e.g. ui/styles, pages/account_settings/state_slices), put it inside that directory. Or, if you think the folder is large enough to have such a directory but it doesn't have one yet, create one. Notice don't put the indexing or exporting files into the new sub directory.

Otherwise, put the file right beside the .tsx or .jsx file you are working on.

For instance, I am creating a new file called MembershipSubscriptionState.tsx, which is related to premium membership subscription. I will put this beside the MembershipSubscriptionForm.tsx, which is the React Component file for membership subscription. If the folder is large (contains a lot of components and supplemental files for each of the components), I will create a separate folder for all the state slices and reducers.

**_Answer III_**:

If the subfield you are working on is large enough to have its own directory for the files you are indexing for or exporting to, put your file outside such directory but still in the directory of your subfield.

Otherwise, just put the indexing or exporting file along with other files you are indexing.

**_Answer IV_**:

Find the category directory of the component you are working on and put the file there.

If you are creating a brand new category of features (e.g. new user registration), just create a new directory for this category and put the file there. Note: In big tech companies, this often means a small team being formed, so keep this in mind when you want a new directory.

**_Answer V_**:

Put the settings file to the most granular file directory that still contains the entire effective scope of this file.

> @copyright This project framework was written by [Yukun Song](https://github.com/Spark-RTG) in Feb, 2023. Feel free to use this template for any future projects.
