"use client";

import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import DeckListItem from './DeckListItem';
import { toast } from 'sonner';

type PropsType = {
  decks: {id:string, name: string}[]
}

const DeckListsWrapper = ({ decks } : PropsType) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-deck/${id}`, {
        method: 'DELETE'
      })

      if (response.status !== 200) {
        toast.error("something went wrong")
        return
      }

      router.refresh();
      toast.success('Deck Deleted');

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  return (
    <>
      {decks.map((deck) => {
        return <DeckListItem key={deck.id} id={deck.id} content={deck.name} active={pathname.split("/").includes(deck.id) ? true : false} onDelete={handleDelete}/>
      })}
    </>
  )
}

export default DeckListsWrapper