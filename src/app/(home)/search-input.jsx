'use client';
export default function SearchInput() {
  return (
    <div className='flex items-center space-x-2'>
      <input
        type='text'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // onSearch();
          }
        }}
        placeholder='Search documents...'
        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        type='button'
        // onClick={onSearch}
        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Search
      </button>
    </div>
  );
}
