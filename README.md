# Sign Language Translator Frontend

<div align="center">

<img width="30.9%" alt="SLT-frontend: Sign Language Translator Frontend logo" src="https://github.com/sign-language-translator/slt-frontend/blob/784d68a419e9c65c88129534b31dfbdd8270d456/public/logo512.png" />

A **web GUI** of the [`sign-language-translator`](https://github.com/sign-language-translator/sign-language-translator) python package<br/>and a tool to create [`sign-language-datasets`](https://github.com/sign-language-translator/sign-language-datasets)<br/>made with React.

<br/>

[![Web Demo](https://img.shields.io/badge/%F0%9F%8C%90%20Website-slt%E2%80%93ai.vercel.app-mediumpurple)](https://slt-ai.vercel.app/)<br/>
[![GitHub Repo stars](https://img.shields.io/github/stars/sign-language-translator/slt-frontend?logo=github)](https://github.com/sign-language-translator/slt-frontend/stargazers)
[![Deployment](https://img.shields.io/github/deployments/mdsrqbl/slt-frontend/production?label=vercel&logo=vercel&logoColor=white)](https://github.com/mdsrqbl/slt-frontend/deployments)

| **Support Us** ❤️ | [![PayPal](https://img.shields.io/badge/PayPal-00457C?logo=paypal&logoColor=white)](https://www.paypal.com/donate/?hosted_button_id=7SNGNSKUQXQW2) |
| - | - |

</div>

---

1. [Sign Language Translator Frontend](#sign-language-translator-frontend)
   1. [Pages and Features](#pages-and-features)
      1. [1. Translator](#1-translator)
      2. [2. Customize](#2-customize)
         1. [2.1 Sign Dictionary Annotation](#21-sign-dictionary-annotation)
         2. [2.2 Sign Clip Extraction](#22-sign-clip-extraction)
         3. [2.3 Synthetic Sentences](#23-synthetic-sentences)
      3. [3. Learn](#3-learn)
         1. [3.1 Walkthrough](#31-walkthrough)
         2. [3.2 Courses](#32-courses)
      4. [4. Documentation](#4-documentation)
   2. [Local Setup](#local-setup)
   3. [Directory Tree](#directory-tree)
   4. [License and citation](#license-and-citation)
   5. [ToDo / Contribution](#todo--contribution)

## Pages and Features

### 1. Translator

Translate bidirectionally between various text and sign languages using a variety of AI models.

| ![translator](https://github.com/user-attachments/assets/1e1ad62f-6486-422d-b44a-94df315a6195) | ![slt-frontend-demo](https://github.com/user-attachments/assets/a863e8b5-ff42-4a90-b9ee-a0cdb73fdaad) |
| :-: | :-: |
| Design | Current |

### 2. Customize

Annotate sign language datasets and finetune AI models.

#### 2.1 Sign Dictionary Annotation

Label video clips of individual words/signs with text gloss & text translation in various spoken languages and export the data as a mapping JSON.

| ![dictionary](https://github.com/user-attachments/assets/542e9755-6073-413c-98b8-5097ca19a739) | ![label](https://github.com/user-attachments/assets/8a033b45-732d-44bf-8e35-3df99ef24e22)<br/>![sen](https://github.com/user-attachments/assets/749defe5-966d-40e7-9e5d-08e9be707573) |
| :-: | :-: |
| Design | Current |

#### 2.2 Sign Clip Extraction

Specify sections of a long video which correspond to individual sentence, phrase or word, label them with text and export the data as mp4 clips a mapping JSON.

| | ![cllip-extractor](https://github.com/user-attachments/assets/37ffbddf-1711-4555-800f-9d5bdae4aacd) |
| :-: | :-: |
| Design | Current |

#### 2.3 Synthetic Sentences

Arrange sign dictionary videos into sequences and label them with equivalent spoken language texts.

| | ![parallel corpus](https://github.com/user-attachments/assets/e521f09b-6365-45e7-ae22-b5ae1feae809) |
| :-: | :-: |
| Design | Current |

### 3. Learn

Train yourself to use this tool or teach hearing-impaired students quality lessons.

#### 3.1 Walkthrough

Start a step by step walkthrough on which components to click or watch a video tutorial.

#### 3.2 Courses

Interactive lessons in sign language videos, text & audio.

### 4. Documentation

Preview of the python library's documentation & research papers.

## Local Setup

This react project was created using [Vite](https://dev.to/manojspace/migrating-from-create-react-app-to-vite-a-step-by-step-guide-2cab). To run this project locally, follow these steps:

1. Clone and install the project

    ```bash
    git clone https://github.com/sign-language-translator/slt-frontend.git
    cd slt-frontend
    npm install
    ```

2. Start the development server

    ```bash
    npm run start
    ```

    Open http://localhost:3000/ to view it in the browser.

3. Run tests

    ```bash
    npm run test
    ```

4. Build app for production

    ```bash
    npm run build
    ```

## Directory Tree

One line summary of each module.

<details open>
<summary><b><code>SLT-Frontend</code></b><!-- (click to expand)--></summary>
<pre>
├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/LICENSE">LICENSE</a>
├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/README.md">README.md</a>
├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/index.html">index.html</a>
├── <b>public</b>
│   └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/public/">*</a>
└── <b>src</b>
    ├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/App.jsx">App.jsx</a>  <sub><sup>routes</sup></sub>
    ├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/index.js">main.jsx</a>
    ├── <b>components</b>
    │   ├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/components/index.jsx">index.jsx</a>  <sub><sup>export all components</sup></sub>
    │   ├── <b>Avatar</b>
    │   │   └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/components/Avatar/index.jsx">index.jsx</a>  <sub><sup>three.js canvas with animated humanoid performing signs</sup></sub>
    │   │
    │   └── <b>TextArea</b>
    │       └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/components/TextArea/index.jsx">index.jsx</a>  <sub><sup>write multilingual text with mic, virtual keyboad & speaker. tag supported & ambiguous tokens. Get synonyms & translation suggestions.</sup></sub>
    │
    ├── <b>pages</b>
    │   ├── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/pages/index.jsx">index.jsx</a>  <sub><sup>export all pages</sup></sub>
    │   ├── <b>Landing</b>
    │   │   └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/pages/Landing/index.jsx">index.jsx</a>  <sub><sup>Welcome Page</sup></sub>
    │   │
    │   └── <b>Translator</b>
    │       └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/pages/Translator/index.jsx">index.jsx</a>  <sub><sup>Bidirectional translation between signs & text</sup></sub>
    │
    └── <b>utils</b>
        └── <a href="https://github.com/sign-language-translator/slt-frontend/blob/main/src/utils/index.jsx">index.jsx</a>  <sub><sup>helpers</sup></sub>
</pre>
</details>

## License and citation

```bibtex
@software{slt2024frontend,
  author       = {Mudassar Iqbal},
  title        = {Frontend for Sign Language Translator: Python Library and AI Framework},
  year         = {2024},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/sign-language-translator/slt-frontend}},
}
```

This project is licensed under the [Apache 2.0 License](https://github.com/sign-language-translator/slt-frontend/blob/main/LICENSE). You are permitted to use the project, create modified versions, or incorporate pieces of the code into your own work. Your product or research, whether commercial or non-commercial, must provide appropriate credit to the original author(s) by citing this repository.

## ToDo / Contribution

- Implement the features from the above GIFs
- Add `React Helmet` for SEO
- Add `React Router` for routing
- Add `React Redux` for state management
- Add `React i18next` for internationalization
- Add `React Testing Library` for testing
- Add `React Loadable` for code splitting
