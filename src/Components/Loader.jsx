import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const ColorCircleLoader = () => {
  return (
    <>
      <div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0'>
        <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>

      </div>

    </>
  )
}

export { ColorCircleLoader }
