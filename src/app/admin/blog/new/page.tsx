import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPostPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Create New Post</h1>
            <BlogForm />
        </div>
    );
}
