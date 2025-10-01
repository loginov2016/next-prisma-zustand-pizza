/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { TStory } from '@/services/stories';
import ReactStories from 'react-insta-stories';
import React, { useEffect } from 'react';
import { Container } from '../ui';
import { X } from 'lucide-react';

interface IStoriesProps {
    className?: string;
}

export const Stories: React.FC<IStoriesProps> = ({ className }) => {
    const [stories, setStories] = React.useState<TStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<TStory>();


    const onOpenStory = (story: TStory) => {
        setSelectedStory(story);
       
        if (story.storyItems.length > 0) {
            setOpen(true);
        }
    }

    useEffect(() => {
        async function getStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        getStories();
    }, []);

    return (
    <>
        <Container className={cn('flex items-center justify-between gap-2 mt-10', className)}>
            {
                stories.length === 0 && (
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                    ))
                )
            }

            {
                stories.map( (story) => (
                        <img 
                            key={story.id} 
                            src={story.previewImageUrl} 
                            className="rounded-md cursor-pointer"
                            width={200}
                            height={250}
                            onClick={() => onOpenStory(story)}
                            alt={String(story.id)}
                        />
                    ) 
                )
            }

            {
                open && (
                    <div 
                        className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-30" 
                        onClick={() => setOpen(false)} 
                    >
                        <div 
                            className="relative"
                            style={{width: 520}}    
                        >
                            <button
                                className="absolute -right-10 -top-5 z-30"
                                onClick={() => setOpen(false)}
                            >
                                <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.storyItems.map(selectedStoryItem => (
                                            { url: selectedStoryItem.sourceUrl }
                                        )
                                    ) || []
                                }
                                defaultInterval={3000}
                                width={520}
                                height={800}
                            />
                        </div>
                    </div>
                )
            }
        </Container>
    </>
    );
}

