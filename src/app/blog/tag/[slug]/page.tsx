import { prisma } from '@/lib/prisma'
import { formatDateToDDMMYYYY } from '@/utils/DateTimeString'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type postType = {
        slug: string;
        id: string;
        createdAt: Date;
        title: string;
        description: string | null;
        coverImage: string | null;
        featured: boolean;
    }


const TagPage = async ({ params }: { params: Promise<({ slug: string })> }) => {
    const { slug } = await params

    const posts = await prisma.tag.findUnique({
        where: { slug: slug },
        include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    createdAt: true,
                    featured: true,
                    coverImage: true,
                    description: true,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10
            }
        }
    })

    if (!posts) {
        return <h2 className="text-[1.75rem] text-left max-w-[720px] mx-2.5 sm:text-center sm:mx-auto">No Post Found</h2>
    }

    return (
        <main className='md:max-w-5xl mx-auto'>
            <h3 className="text-[1.75rem] text-left max-w-[720px] mx-2.5 sm:text-center sm:mx-auto">Posts for {posts.name}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 p-2.5 gap-2.5'>
                        {posts.posts.length > 0 && posts.posts.map((item: postType) => {
                            return (
                                <div key={item.id} className='grid grid-cols-1 lg:grid-cols-2 p-2.5 gap-2.5 bg-stone-800 rounded-md'>
                            <div className='w-full min-h-48 button_gradient'>

                            </div>
                            <div>
                                <span>Study</span>
                                <h2 className='text-2xl'>{item.title}</h2>
                                <div><p className='flex gap-1 items-center'><Calendar size={16} /> {formatDateToDDMMYYYY(item.createdAt)}</p></div>
                                <p>{item.description}</p>
                                <Link href={"/blog/" + item.slug}>READ MORE</Link>
                            </div>
                        </div>
                            )
                        })}
                    </div>
        </main>
    )
}

export default TagPage