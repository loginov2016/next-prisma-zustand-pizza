import { Container, PizzaImage, PizzaOptions, SelectingForm, Title } from '@/components/shared';
import { pizzaSizes } from '@/constants/pizza';
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation';

import React from 'react'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({ 
    where: { 
      id: Number(id) 
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              productVariations: true,
            }
          },
        }
      },
      productVariations: true,
    }
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <SelectingForm product={product} />
    </Container>
  )
}

/* 

<div className="flex flex-1">
        <PizzaImage 
          name={product.name}
          imageUrl={product.imageUrl}
          size={30}
        />
        <div className="w-[490px] bg-[#f8f7f6] p-7">
          <Title text={product.name} size='md' className='font-extrabold mb-1' />
          <PizzaOptions 
            items={pizzaSizes}
            value='2'
          />
          <p className="text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia quis eius vel expedita, necessitatibus illum inventore pariatur impedit quidem porro perspiciatis enim, explicabo cupiditate nisi, laborum vitae! Fugiat, quo numquam.
            Fuga illo nemo odit! Facere possimus dolor, accusantium voluptatum, a dolorem cupiditate suscipit molestias dicta omnis quos laborum et minima recusandae accusamus eum dolores, libero veritatis nemo repellat voluptatem eos.
          </p>
        </div>
      </div>

*/
