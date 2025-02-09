<!-- Improved compatibility of back to top link: See: https://github.com/brettzky10/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brettzky10">
    <img src="public/images/potion.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Product Potion</h3>

  <p align="center">
    Build & manage multiple businesses from one dashboard.
    <br />
    <!-- <a href="https://github.com/brettzky10"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/brettzky10">View Demo</a>
    · -->
    <a href="https://github.com/brettzky10/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/brettzky10/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
<div>
    
</div>
This project was built with the intention of managing multiple stores from one dashboard. Each store has it's own subdomain that display products from that store, discounts, and the ability for their customer to pay and checkout using Stripe connect.

<br>

Features:
* Product inventory for each funnel.
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-5.PNG" alt="Logo"  height="300">

* Products added get vectorized, making them available for semantic search functionality. Intended use case is to search  multi languages and promote in multi languages.
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-6.PNG" alt="Logo"  height="300">


* Image tools for products (restricted by credits)
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-9.PNG" alt="Logo"  height="300">

* Multiple subdomains (restricted by subscription)
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-10.PNG" alt="Logo"  height="300">

* Stripe Connect for merchants to get paid.
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-11.PNG" alt="Logo"  height="300">


* Discount Creation - Create discounts for products (WIP)
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-7.PNG" alt="Logo"  height="300">
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-12.PNG" alt="Logo"  height="300">

* Toggle "Do Not Sleep" - Great for In-person
<img src="https://sftqhmhkavkfyaxtoqoe.supabase.co/storage/v1/object/public/site-images/launch-potion-13.PNG" alt="Logo"  height="300">

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

Current state:
  <br>In-Person:
  - A merchant needing a searchable site of their products using a tablet at the front of their brick & mortar store.
    
  - A vender at a local market needing a way for customers to search and pay for products listed outside of the items they brought with them that day.

Future:
<br>Online:
  - A connection point for webhooks from make.com, zapier, ifttt. Extend flows that post, share, and promote your products, leading customers back to a custom sales funnel.







<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With


* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)&nbsp;




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

_Let's get you started with Launch Potion._
To get a local copy up and running follow these simple steps.

### Prerequisites

- Relies on Vercel multi-site (*.launchpotion.com) and vercel.json for cron jobs.
- Relies Supabase's vector database functionality and auth. 

### Installation



1. Clone the repo
   ```sh
   git clone https://github.com/brettzky10/product-potion.git
   ```

3. Install NPM packages
   ```sh
   npm install
   ```
3. Deploy to Vercel [https://example.vercel.app](https://vercel.com)
4. Enter your API keys into `.env` and into Vercel matching example .env
5. Setup Supabase Auth, and Social sign-in using callback:
   ```sh
   example.vercel.app/auth/callback
   ```
7. Setup Prisma
    ```sh
   npx prisma generate
   npx prisma db push
   ```
8. Launch
    ```sh
   npm run dev
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->


<!-- ROADMAP -->
## Roadmap

- [x] Add Stripe Connect
- [x] Add /billing for Stripe Connect
- [x] Add invoice screen
- [ ] Add discounts
  - [x] Add products to discount
  - [x] Add discount to template
  - [ ] Add discount to Stripe Connect
- [ ] Add cron-job
- [ ] Add Additional Templates
- [ ] Fix product drawer categories to Prisma categories.
- [ ] Fix template slider categories to Prisma categories.
- [ ] Add Vapi search functionality to template.
- [ ] Discounts for Stripe checkout
- [ ] Multi-language Support
    - [ ] Hindi
    - [ ] Spanish
    - [ ] Chinese
    - [ ] French
- [ ] Add semantic search
- [ ] Add webhook cron jobs service to Prisma for automations to Make.com/Vapi



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<!-- <a href="https://github.com/brettzky10/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=brettzky10" alt="contrib.rocks image" />
</a> -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

<!-- Distributed under the Unlicense License. See `LICENSE.txt` for more information. -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<!-- Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com
 -->
Project Link: [https://github.com/brettzky10/product-potion](https://github.com/brettzky10/product-potion)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I've included a few of some helpful resources when building this

* [Choose an Open Source License](https://choosealicense.com)
* [Web Prodigies](https://github.com/webprodigies)
* [Shadcn](https://ui.shadcn.com/docs/installation/next)
* [Web Dev Simplified](https://github.com/WebDevSimplified/next-js-ecommerce-mvp-discount-codes)




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/brettzky10.svg?style=for-the-badge
[contributors-url]: https://github.com/brettzky10/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/brettzky10.svg?style=for-the-badge
[forks-url]: https://github.com/brettzky10/network/members
[stars-shield]: https://img.shields.io/github/stars/brettzky10.svg?style=for-the-badge
[stars-url]: https://github.com/brettzky10/stargazers
[issues-shield]: https://img.shields.io/github/issues/brettzky10.svg?style=for-the-badge
[issues-url]: https://github.com/brettzky10/issues
[license-shield]: https://img.shields.io/github/license/brettzky10.svg?style=for-the-badge
[license-url]: https://github.com/brettzky10/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: public/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 