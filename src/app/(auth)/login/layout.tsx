
import GradientText from '@/components/global/gradient-text'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {

  return (
    <div className="max-h-screen h-screen flex w-full justify-center bg-black">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6 bg-black">
        <Image
          src="/images/potion-white.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '10%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-screen max-w-4000px overflow-hidden relative bg-iron  flex-col pt-10 pl-24 gap-3 bg-themeDarkGray">
        <GradientText className=" md:text-4xl font-bold">
          Get More Traffic.
        </GradientText>
        <p className="text-cream md:text-sm mb-10">
          We&apos;ll set you up with store clerk that draws customers attention.{' '}
          <br />
          While allowing you, the owner, to add products, discounts and more...{' '}
          <br />
          all on your very own storefront page!
        </p>
        <Image
          src="/images/site/launch-potion-ui-laptop-2.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  )
}

export default Layout