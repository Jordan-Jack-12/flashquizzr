import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { formatDateToDDMMYYYY } from '@/utils/DateTimeString'

const BlogPage = async () => {

    const postListFeatured = await prisma.post.findMany({
        where: {
            featured: true
        },
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            featured: true,
            coverImage: true,
            tags: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const recentSixPost = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            featured: true,
            coverImage: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 6
    })

    const recentTenPost = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            featured: true,
            coverImage: true,
            description: true,
            tags: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    })

    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            slug: true,
            name: true,
        }
    })

    if (!postListFeatured || !recentSixPost || !recentTenPost) {
        return (
            <main className='md:max-w-7xl mx-auto'>
                <h1 className='text-3xl text-center font-bold'>Blog</h1>
                <div className='text-center p-5 text-2xl text-stone-600'>
                    No Blog Post
                </div>
            </main>
        )
    }

    return (
        <main className='md:max-w-7xl mx-auto'>
            <h1 className='text-3xl text-center font-bold mb-6'>Blog</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 px-2.5'>
                {postListFeatured.length > 0 && postListFeatured.map((item, index) => {
                    return (
                        <Link href={`/blog/${item.slug}`} key={item.id} className={`w-full min-h-56 flex flex-col justify-end items-start p-4 button_gradient rounded-md ${index === 0 ? 'sm:row-span-2' : ''
                            }`}>
                            <p className='px-2 py-1 bg-orange-500 rounded-lg'>{item.tags[0].name}</p>
                            <h2 className='text-2xl font-bold'>{item.title}</h2>
                            <p className='flex gap-1 items-center'><Calendar size={16} /> {formatDateToDDMMYYYY(item.createdAt)}</p>
                        </Link>
                    )
                })}


            </div>
            <div className='bg-orange-700/20 py-2.5 m-2.5'><p className='text-center'>Recent from Flashquizzr</p></div>
            <div className='grid grid-cols-2 gap-2 px-2.5'>
                {recentSixPost.length > 0 && recentSixPost.map((item) => {
                    return (
                        <Link href={`/blog/${item.slug}`} key={item.id} className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-md bg-stone-800'>
                            <div className='w-full min-h-32 button_gradient'>
                                fd
                            </div>
                            <div>
                                <h2 className='font-semibold'>{item.title}</h2>
                                <p className='flex gap-1 items-center'><Calendar size={16} /> {formatDateToDDMMYYYY(item.createdAt)}</p>
                            </div>
                        </Link>
                    )
                })}

            </div>
            {/* Lower Part */}
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                <div className='lg:col-span-2'>
                    <div className='bg-orange-700/20 py-2.5 m-2.5'><p className='text-center'>Recent Posts</p></div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 p-2.5 gap-2.5'>
                        {recentTenPost.length > 0 && recentTenPost.map((item) => {
                            return (
                                <div key={item.id} className='grid grid-cols-1 lg:grid-cols-2 p-2.5 gap-2.5 bg-stone-8700 rounded-md'>
                            <div className='w-full min-h-48 button_gradient'>

                            </div>
                            <div>
                                <span className='px-2 py-1 bg-orange-500/15 rounded-lg'>{item.tags[0].name}</span>
                                <h2 className='text-2xl'>{item.title}</h2>
                                <div><p className='flex gap-1 items-center'><Calendar size={16} /> {formatDateToDDMMYYYY(item.createdAt)}</p></div>
                                <p className='line-clamp-2'>{item.description}</p>
                                <Link href={"/blog/" + item.slug}>READ MORE</Link>
                            </div>
                        </div>
                            )
                        })}
                        


                    </div>
                </div>
                <div>
                    <div className='bg-orange-700/20 py-2.5 m-2.5'><p className='text-center'>Tags</p></div>
                    <div className='flex flex-wrap gap-3 mx-2.5'>
                        {!tags && <p>No Tags Found</p>}
                        {tags.length > 0 && tags.map((item) => {
                            return (
                                <Link key={item.id} href={`/blog/tag/${item.slug}`} className='px-2 py-1 bg-orange-500/15 rounded-lg'>{item.name}</Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BlogPage