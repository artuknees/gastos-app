import dynamic from 'next/dynamic'

const DynamicNavBar = dynamic(() => import('../global/NavBar'), {
  ssr: false
})

const DyNavbar = () => {
  return (
    <DynamicNavBar />
  )
}

export default DyNavbar