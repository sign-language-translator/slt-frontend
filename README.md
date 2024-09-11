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
      1. [Translator](#translator)
      2. [Customize](#customize)
         1. [Sign Dictionary Annotation](#sign-dictionary-annotation)
         2. [Sign Clip Extraction](#sign-clip-extraction)
      3. [Synthetic Sentences](#synthetic-sentences)
      4. [Learn](#learn)
         1. [Walkthrough](#walkthrough)
         2. [Courses](#courses)
      5. [Documentation](#documentation)
   2. [Local Setup](#local-setup)
   3. [License and citation](#license-and-citation)
   4. [ToDo / Contribution](#todo--contribution)

## Pages and Features

### Translator

Translate bidirectionally between various text and sign languages using a variety of AI models.

| ![translator](https://github.com/user-attachments/assets/7f62acfc-af12-4d76-8268-eea3e288a178) | ![slt-frontend-demo](https://github.com/user-attachments/assets/a863e8b5-ff42-4a90-b9ee-a0cdb73fdaad) |
| - | - |

### Customize

Annotate sign language datasets and finetune AI models.

#### Sign Dictionary Annotation

Label video clips of individual words/signs with text gloss & text translation in various spoken languages and export the data as a mapping JSON. 

![dictionary](https://github.com/user-attachments/assets/542e9755-6073-413c-98b8-5097ca19a739)

#### Sign Clip Extraction

Specify sections of a long video which correspond to individual sentence, phrase or word, label them with text and export the data as mp4 clips a mapping JSON.

![cllip-extractor](https://github.com/user-attachments/assets/37ffbddf-1711-4555-800f-9d5bdae4aacd)

### Synthetic Sentences

Arrange sign dictionary videos into sequences and label them with equivalent spoken language texts.

![parallel corpus](https://github.com/user-attachments/assets/e521f09b-6365-45e7-ae22-b5ae1feae809)

### Learn

Train yourself to use this tool or teach hearing-impaired students quality lessons.

#### Walkthrough

Start a step by step walkthrough on which components to click or watch a video tutorial.

#### Courses

Interactive lessons in sign language videos, text & audio.

### Documentation

Preview of the python library's documentation & research papers.

## Local Setup

1. Clone and install the project

```bash
git clone https://github.com/sign-language-translator/slt-frontend.git
cd slt-frontend
npm install
```

2. Start the development server

```bash
npm start
```

Open http://localhost:3000 to view it in the browser.

3. Run tests

```bash
npm test
```

4. Build app for production

```bash
npm run build
```

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
