import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import one from '../../public/one.jpg'
import two from '../../public/two.jpg';
import three from '../../public/three.jpg';
import four from '../../public/four.jpg';
import six from '../../public/six.jpg'

import Image from 'next/image'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const slidecontent=[
    {img:one},
    {img:two},
    {img:six},
    {img:four}
  ]

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({delay:3000,stopOnInteraction:false})])

  return (
    <section className="embla">
      <div className="embla__viewport"  ref={emblaRef}>
        <div className="embla__container">
          {slidecontent.map((item) => (
            <div className="embla__slide">
                {console.log(item)} 
                <div className="embla__slide__inner">
                <Image src={item.img} alt="bg" layout="fill" objectFit="cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel

