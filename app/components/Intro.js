import React from 'react';

const IntroSection = () => {
  return (
    <section className="px-4 overflow-x-auto">
      <div className="max-w-2xl my-16 mx-auto">
        <h2 className="text-left text-[3.75rem] font-bold gradient mb-4">What worked for 5 clients won't work for 500</h2>
        <p className='text-[20px] mb-4'>You have accounts, invoices, projects and processes scattered across different tools. Things get lost and the client experience suffers.</p>
        <p className='text-[20px] mb-4'>Your agency needs <span className="highlight text-[20px]">a proper system</span>. Something to stay organized, something to grow with.</p>
        <p className='text-[20px] mb-4'>This is the reason we built SPP – the one platform that keeps everything in sync and helps you <span className="highlight text-[20px]">scale your agency</span>.</p>
      </div>
    </section>
  );
};

export default IntroSection;