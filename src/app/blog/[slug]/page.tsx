/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma"
import { formatDateToDDMMYYYY } from "@/utils/DateTimeString"
import { notFound } from "next/navigation"
import rehypeFormat from 'rehype-format'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

export async function generateStaticParams() {
    const post_slug = await prisma.post.findMany({
        select: {
            slug: true
        }
    })

    return post_slug
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params

    const post = await prisma.post.findUnique({
        where: { slug: slug },
        select: {
            title: true,
            description: true
        }
    })

    if (!post) return { title: "FlashQuizzr Blog", description: "Make FlashCards and Study More" }

    return {
        title: post.title,
        description: post.description,
    }
}

export const revalidate = 86400;

const PostPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params

    const post = await prisma.post.findUnique({
        where: { slug: slug },
        include: {
            tags: true
        }
    })

    if (!post) {
        notFound();
    }

    const content = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeFormat)
        .use(rehypeSanitize)
        .use(rehypeStringify) // Convert AST into serialized HTML
        .process(post.content)

    return (
        <main>
            <h1 className="text-[1.75rem] text-left font-bold max-w-[720px] mx-2.5 sm:mx-auto">{post.title}</h1>
            <p className="text-left text-stone-400 max-w-[720px] mx-2.5 sm:mx-auto">Published: {formatDateToDDMMYYYY(post.createdAt)}</p>
            <hr className="border-t-1 border-solid border-stone-800 max-w-[720px] my-[2rem] mx-auto" />
            <img src={"https://imagesuggest.com/wp-content/uploads/2021/06/6.-Example-of-using-aspect-ratio-of-16-9-blog-post-image-size.jpg"} className="max-w-[720px] mx-auto" alt={post.slug} />
            <article>
                <div className='content max-w-[720px] mx-auto my-0' dangerouslySetInnerHTML={{ __html: String(content) }} />
            </article>
        </main>
    )
}

export default PostPage