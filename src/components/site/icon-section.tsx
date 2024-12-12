import {
    BookOpenIcon,
    Camera,
    ChevronRightIcon,
    Image,
    MessagesSquareIcon,
    Sparkles,
    ThumbsUpIcon,
  } from "lucide-react";
import { AnimatedButton } from "../ui/animated-button-right";
  
  export default function IconSection() {
    return (
      <>
        {/* Icon Blocks */}
        <div className="container py-24 lg:py-32">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Craft Professional Product Photos
              </h2>
              <p className="mt-3 text-muted-foreground">
              We help people craft the perfect product photos and descriptions using our drag and drop tools.
              </p>
              <p className="mt-5">
                  
                <a
                  className="inline-flex items-center"
                  href="/sign-up"
                >
                  <AnimatedButton variant="linkHover2" className='dark:text-white text-black'>
                  Start Now
                </AnimatedButton>
                </a>
              </p>
            </div>
            {/* End Col */}

            


            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <a
                  href={"/"}
                  className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-teal-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                  <span className="absolute z-10 flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-gradient-to-tr from-teal-700/70 via-primary to-primary text-primary-foreground group-hover:text-white group-hover:border-black group-hover:rotate-12 transition-transform duration-300">
                      <Camera className="flex-shrink-0 w-5 h-5" />
                    </span>
              <div className="ms-14 sm:ms-20 group-hover:text-white relative z-10 duration-300">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Take a Photo of Your Product
                  </h3>
                  <p className="mt-1 text-muted-foreground group-hover:text-slate-300">
                    Snap a photo with your phone of the product.
                  </p>
                </div>
              </a>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <a
                  href={"/"}
                  className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-teal-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                  <span className="absolute z-10 flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-gradient-to-tr from-teal-700/70 via-primary to-primary text-primary-foreground group-hover:text-white group-hover:border-black group-hover:rotate-12 transition-transform duration-300">
                      <Sparkles className="flex-shrink-0 w-5 h-5" />
                    </span>
              <div className="ms-14 sm:ms-20 group-hover:text-white relative z-10 duration-300">
                  <h3 className="text-base sm:text-lg font-semibold">
                  Rehancify your images
                  </h3>
                  <p className="mt-1 text-muted-foreground group-hover:text-slate-300">
                  Use our tools to create product images that look like they were shot by a professional at a fraction of the cost.
                  </p>
                </div>
              </a>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <a
                  href={"/"}
                  className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-teal-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                  <span className="absolute z-10 flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-gradient-to-tr from-teal-700/70 via-primary to-primary text-primary-foreground group-hover:text-white group-hover:border-black group-hover:rotate-12 transition-transform duration-300">
                      <BookOpenIcon className="flex-shrink-0 w-5 h-5" />
                    </span>
              <div className="ms-14 sm:ms-20 group-hover:text-white relative z-10 duration-300">
                  <h3 className="text-base sm:text-lg font-semibold">
                  Add a Description
                  </h3>
                  <p className="mt-1 text-muted-foreground group-hover:text-slate-300">
                  Let our AI add the perfect description of your product.
                  </p>
                </div>
              </a>
                {/* <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-gradient-to-tr from-teal-700/70 via-primary to-primary text-primary-foreground">
                  <ThumbsUpIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Simple and affordable
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Make your products look like they were shot by a professional at a fraction of the cost.
                  </p>
                </div> */}
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Icon Blocks */}
      </>
    );
  }
  