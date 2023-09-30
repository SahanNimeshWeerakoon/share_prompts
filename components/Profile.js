import PromptCard from '@/components/PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className='w-full'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{name} Profile</span>
            </h1>
            <p className='desc text-left'>{ desc }</p>
            <div className='mt-10 prompt_layout'>
                {data.map(itm => (
                    <PromptCard
                        key={itm._id}
                        post={itm}
                        handleEdit={(id) => { handleEdit && handleEdit(itm._id)}}
                        handleDelete={() => { handleDelete && handleDelete(itm._id) }}
                    />
                ))}
            </div>
        </section>
    )
}

export default Profile