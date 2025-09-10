import { ChooseProductModal } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client'
import { notFound, useParams } from 'next/navigation';
import React, { use } from 'react'

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
  //const paramValues = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      productVariations: true,
    }
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />
  
}
