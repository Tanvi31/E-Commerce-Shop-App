import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (
    <>
      <Header/>
      <main className='w-10/12 mx-auto min-h-screen'>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout