import { prisma } from "@/lib/prisma"
import styles from "../blog.module.css"
import { formatDateToDDMMYYYY } from "@/utils/DateTimeString"
// import Image from "next/image"

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
        where: { slug: slug},
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
        return (
            <main>
                <h1>No Post Found</h1>
            </main>
        )
    }

    return (
        <main>
            <h1 className="text-[1.75rem] text-left max-w-[720px] mx-2.5 sm:mx-auto">{post.title}</h1>
            <p className="text-left max-w-[720px] mx-2.5 sm:mx-auto">{formatDateToDDMMYYYY(post.createdAt)}</p>
            <hr className="text-[1.75rem] text-left max-w-[720px] mx-auto" />
            <article>
                <div className={styles.blog_article} dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </main>
    )
}

export default PostPage