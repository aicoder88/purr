import React from 'react'

const SectionHeader = ({text}:{text:string}) => {
  return (
     <div className="inline-block px-4 py-1 bg-gradient-to-t from-[#3ba4fd] to-[#3ba4fd]/40 border-[#3ba4fd] border-[1px]  rounded-full text-white font-medium text-sm mb-2">
              {text}
        </div>
  )
}

export default SectionHeader