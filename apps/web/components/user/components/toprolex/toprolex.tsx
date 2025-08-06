
import React from 'react'

function toprole() {
  return (
        <>
        <div className="max-w-4xl w-full h-20 top-0 flex justify-center space-x-1">
          <div>
            <div className="bg-black w-9 border-3 border-white h-9 rounded-full flex items-center justify-center text-auth-color-bg-white">
              1
            </div>
            <div>
              <h3 className="text-auth-color-bg-white">Role</h3>
            </div>
          </div>
          <div className=" w-45 h-10 flex mt-4 justify-center">
            <hr className=" bg-auth-color-bg-white w-full h-[2px]" />
          </div>
          <div>
            <div className="bg-[#C3BABA] w-9 border-3 border-white h-9 rounded-full text-center text-xl font-semibold text-auth-color-bg-white">
              2
            </div>
            <div>
              <h3 className="text-auth-color-bg-white">information</h3>
            </div>
          </div>
        </div> 
    </>
  )
}

export default toprole