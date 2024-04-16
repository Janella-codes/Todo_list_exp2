export default function Page({ params }: {
    params: { id: string } 
}) {
    return (
        <>
        <h1>Blog Post</h1>
        <p>{params.id}</p>
    </>
    )
}

