import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types/types'

async function getPosts() {
	let posts: Post[] = []

	const paths = import.meta.glob('/src/content/go-web/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			posts.push(post)
		}
	}

	posts = posts.sort((first, second) =>
     first.indexVal - second.indexVal
	)

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
