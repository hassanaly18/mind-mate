import React from 'react'

const Testimonials = () => {
  return (
    <section className='bg-blue-50 dark:bg-gray-900 py-20 px-4'>
        <h2 className='text-3xl font-bold text-center mb-12 text-blue-700 dark:text-blue-300'>
            What Users Say
        </h2>
        <div className='max-w-4xl mx-auto space-y-8'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
                <p className='italic text-gray-700 dark:text-gray-300'>
                    "Mindmate has been a game-changer for me. The AI reflections help me understand my emotions better, and the mood tracking feature is so easy to use. I feel more in control of my mental health than ever before!"
                </p>
                <p className='mt-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400'>
                    - Sarah J., MindMate User
                </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
                <p className='italic text-gray-700 dark:text-gray-300'>
                    "I love tracking my mood with MindMate. The insights I get from my journal entries are incredibly helpful. It's like having a personal therapist in my pocket!"
                </p>
                <p className='mt-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400'>
                    - John D., MindMate User
                </p>
            </div>
        </div>
    </section>
  )
}

export default Testimonials