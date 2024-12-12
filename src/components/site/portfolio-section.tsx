import React from 'react'
import PortfolioSlider from './portfolio-slider';



const portfolios = [
    {
      quote:
        "Nostrud tempor sunt fugiat. Dolor in sint dolore labore non occaecat adipisicing Lorem labore ullamco enim excepteur. In fugiat Lorem sit velit id veniam esse eiusmod non ea voluptate cupidatat reprehenderit ullamco dolore. Mollit laborum occaecat aliquip.",
      name: "Rose Roberson",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=1",
      portfolioImage: "/images/site/landing3.png"
    },
    {
      quote:
        "Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation. Culpa consectetur dolor pariatur commodo aliqua amet tempor nisi enim deserunt elit cillum.",
      name: "Chace Rodgers",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=10",
      portfolioImage: "/images/site/landing1.png"
    },
    {
      quote:
        "Id duis velit enim officia ad nisi incididunt magna ex dolor minim deserunt dolor.",
      name: "Cornelius Sheppard",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=9",
      portfolioImage: "/images/site/landing2.png"
    },
    {
      quote:
        "Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
      name: "Chace Rodgers",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=7",
      portfolioImage: "/images/site/landing5.png"
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
      name: "Cornelius Sheppard",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=8",
      portfolioImage: "/images/site/landing6.png"
    },
    {
      quote:
        "Consectetur voluptate pariatur dolore laboris. Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
      name: "Chace Rodgers",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=2",
      portfolioImage: "/images/site/landing7.png"
    },
    {
      quote:
        "Id duis velit enim officia ad nisi incididunt magna ex dolor minim deserunt dolor.",
      name: "Cornelius Sheppard",
      role: "CEO at Company",
      imgSrc: "https://i.pravatar.cc/120?img=3",
      portfolioImage: "/images/site/landing8.png"
    },
  ];

const PortfolioSection = () => {
  return (
    <main className="flex min-h-[300px] flex-col items-center justify-between px-5">
      <div className="container">
        <PortfolioSlider portfolios={portfolios} />
      </div>
    </main>
  )
}

export default PortfolioSection