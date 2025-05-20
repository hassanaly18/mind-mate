import React from 'react'
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "MindMate has been a game-changer for me. The AI reflections help me understand my emotions better, and the mood tracking feature is so easy to use. I feel more in control of my mental health than ever before!",
      author: "Sarah J., MindMate User",
      delay: 0.2
    },
    {
      quote: "I love tracking my mood with MindMate. The insights I get from my journal entries are incredibly helpful. It's like having a personal therapist in my pocket!",
      author: "John D., MindMate User",
      delay: 0.4
    },
    {
      quote: "As someone who struggles with anxiety, having a safe space to journal and receive thoughtful reflections has made a significant difference in my daily life.",
      author: "Alex M., MindMate User",
      delay: 0.6
    }
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950/30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 inline-block">
            What Users Say
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: testimonial.delay, duration: 0.8 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 dark:text-gray-300 mb-6">
                "{testimonial.quote}"
              </p>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <span>Join Thousands of Happy Users</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// const Testimonials = () => {
//   return (
//     <section className='bg-blue-50 dark:bg-gray-900 py-20 px-4'>
//         <h2 className='text-3xl font-bold text-center mb-12 text-blue-700 dark:text-blue-300'>
//             What Users Say
//         </h2>
//         <div className='max-w-4xl mx-auto space-y-8'>
//             <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
//                 <p className='italic text-gray-700 dark:text-gray-300'>
//                     "Mindmate has been a game-changer for me. The AI reflections help me understand my emotions better, and the mood tracking feature is so easy to use. I feel more in control of my mental health than ever before!"
//                 </p>
//                 <p className='mt-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400'>
//                     - Sarah J., MindMate User
//                 </p>
//             </div>
//             <div  className=' bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
//                 <p className='italic text-gray-700 dark:text-gray-300'>
//                     "I love tracking my mood with MindMate. The insights I get from my journal entries are incredibly helpful. It's like having a personal therapist in my pocket!"
//                 </p>
//                 <p className='mt-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400'>
//                     - John D., MindMate User
//                 </p>
//             </div>
//         </div>
//     </section>
//   )
// }

export default Testimonials